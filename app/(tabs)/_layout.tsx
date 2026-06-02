// ============================================================
// 📱 底部 Tab 导航布局
// ============================================================
import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { Colors, FontSize } from '@/constants/theme';

/** emoji 图标组件（作为 Tab Icon） */
function TabEmoji({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>
      {emoji}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.bgPrimary },
        headerTitleStyle: {
          color: Colors.textPrimary,
          fontWeight: '600',
          fontSize: FontSize.section,
        },
        tabBarActiveTintColor: Colors.accentPrimary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          headerTitle: '🔥 烧什么菜',
          tabBarIcon: ({ focused }) => <TabEmoji emoji="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: '收藏',
          headerTitle: '❤️ 我的收藏',
          tabBarIcon: ({ focused }) => <TabEmoji emoji="❤️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '历史',
          headerTitle: '🕐 历史记录',
          tabBarIcon: ({ focused }) => <TabEmoji emoji="🕐" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="fridge"
        options={{
          title: '冰箱',
          headerTitle: '🧊 我的冰箱',
          tabBarIcon: ({ focused }) => <TabEmoji emoji="🧊" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.bgWhite,
    borderTopColor: Colors.borderLight,
    height: 56,
    paddingBottom: 4,
  },
  tabLabel: {
    fontSize: FontSize.caption,
    fontWeight: '500',
  },
});
