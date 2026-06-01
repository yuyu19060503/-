// ============================================================
// 🗄️ 全局状态管理 — React Context + useReducer + AsyncStorage
// ============================================================
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import type { Ingredient, Recipe, FilterPreferences } from '@/types';
import {
  loadFavorites,
  loadHistory,
  loadFridge,
  loadPreferences,
  saveFavorites,
  saveHistory,
  saveFridge,
  savePreferences,
} from './storage';

// ---- State ----
export interface AppState {
  selectedIngredients: Ingredient[];
  preferences: FilterPreferences;
  currentRecipe: Recipe | null;
  excludeNames: string[];
  isLoading: boolean;
  favorites: Recipe[];
  history: Recipe[];
  fridge: Ingredient[];
  isLoaded: boolean;
}

const initialState: AppState = {
  selectedIngredients: [],
  preferences: { cuisine: null, difficulty: null, timeRange: '不限' },
  currentRecipe: null,
  excludeNames: [],
  isLoading: false,
  favorites: [],
  history: [],
  fridge: [],
  isLoaded: false,
};

// ---- Helpers ----
let recipeCounter = 0;
function generateRecipeId(): string {
  recipeCounter += 1;
  return `recipe-${Date.now()}-${recipeCounter}`;
}

// ---- Actions ----
type Action =
  | { type: 'TOGGLE_INGREDIENT'; ingredient: Ingredient }
  | { type: 'CLEAR_INGREDIENTS' }
  | { type: 'SET_PREFERENCES'; preferences: FilterPreferences }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_CURRENT_RECIPE'; recipe: Recipe }
  | { type: 'ADD_EXCLUDE_NAME'; name: string }
  | { type: 'RESET_RECOMMEND' }
  | { type: 'ADD_FAVORITE'; recipe: Recipe }
  | { type: 'REMOVE_FAVORITE'; recipeId: string }
  | { type: 'ADD_HISTORY'; recipe: Recipe }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'SET_FRIDGE'; ingredients: Ingredient[] }
  | { type: 'ADD_TO_FRIDGE'; ingredient: Ingredient }
  | { type: 'REMOVE_FROM_FRIDGE'; ingredientId: string }
  | {
      type: 'LOAD_PERSISTED';
      favorites: Recipe[];
      history: Recipe[];
      fridge: Ingredient[];
      preferences: FilterPreferences | null;
    };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_INGREDIENT': {
      const exists = state.selectedIngredients.find(
        (i) => i.id === action.ingredient.id
      );
      return {
        ...state,
        selectedIngredients: exists
          ? state.selectedIngredients.filter((i) => i.id !== action.ingredient.id)
          : [...state.selectedIngredients, action.ingredient],
      };
    }
    case 'CLEAR_INGREDIENTS':
      return { ...state, selectedIngredients: [] };
    case 'SET_PREFERENCES':
      return { ...state, preferences: action.preferences };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_CURRENT_RECIPE': {
      const recipe = { ...action.recipe, id: action.recipe.id || generateRecipeId() };
      return { ...state, currentRecipe: recipe };
    }
    case 'ADD_EXCLUDE_NAME':
      return { ...state, excludeNames: [...state.excludeNames, action.name] };
    case 'RESET_RECOMMEND':
      return { ...state, currentRecipe: null, excludeNames: [], isLoading: false };
    case 'ADD_FAVORITE': {
      // 去重（同名的只保留一个）
      if (state.favorites.some((f) => f.name === action.recipe.name)) {
        return state;
      }
      return { ...state, favorites: [action.recipe, ...state.favorites] };
    }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((r) => r.id !== action.recipeId),
      };
    case 'ADD_HISTORY': {
      // 去重 + 限 50 条
      const filtered = state.history.filter((h) => h.name !== action.recipe.name);
      return {
        ...state,
        history: [action.recipe, ...filtered].slice(0, 50),
      };
    }
    case 'CLEAR_HISTORY':
      return { ...state, history: [] };
    case 'SET_FRIDGE':
      return { ...state, fridge: action.ingredients };
    case 'ADD_TO_FRIDGE':
      if (state.fridge.some((i) => i.id === action.ingredient.id)) return state;
      return { ...state, fridge: [...state.fridge, action.ingredient] };
    case 'REMOVE_FROM_FRIDGE':
      return {
        ...state,
        fridge: state.fridge.filter((i) => i.id !== action.ingredientId),
      };
    case 'LOAD_PERSISTED':
      return {
        ...state,
        favorites: action.favorites,
        history: action.history,
        fridge: action.fridge,
        preferences: action.preferences ?? state.preferences,
        isLoaded: true,
      };
    default:
      return state;
  }
}

// ---- Context ----
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const prevRef = useRef({ fav: 0, hist: 0, fridge: 0, prefs: '' });

  // 启动时加载持久化数据
  useEffect(() => {
    (async () => {
      const [favs, hist, fridge, prefs] = await Promise.all([
        loadFavorites(),
        loadHistory(),
        loadFridge(),
        loadPreferences(),
      ]);
      dispatch({
        type: 'LOAD_PERSISTED',
        favorites: favs,
        history: hist,
        fridge,
        preferences: prefs,
      });
    })();
  }, []);

  // 数据变化时自动保存（防抖：用 ref 比较避免重复写入）
  useEffect(() => {
    if (!state.isLoaded) return;

    const fLen = state.favorites.length;
    const hLen = state.history.length;
    const frLen = state.fridge.length;
    const pStr = JSON.stringify(state.preferences);

    if (
      fLen !== prevRef.current.fav ||
      hLen !== prevRef.current.hist ||
      frLen !== prevRef.current.fridge ||
      pStr !== prevRef.current.prefs
    ) {
      prevRef.current = { fav: fLen, hist: hLen, fridge: frLen, prefs: pStr };
      saveFavorites(state.favorites);
      saveHistory(state.history);
      saveFridge(state.fridge);
      savePreferences(state.preferences);
    }
  }, [
    state.isLoaded,
    state.favorites,
    state.history,
    state.fridge,
    state.preferences,
  ]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
