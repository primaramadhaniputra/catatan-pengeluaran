import {Tabs} from "expo-router";
import React from "react";

import {HapticTab} from "@/components/haptic-tab";
import {IconSymbol} from "@/components/ui/icon-symbol";
import {useColorScheme} from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({color}) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Riwayat",
          tabBarIcon: ({color}) => (
            <MaterialIcons size={28} name="history" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="note"
        options={{
          title: "Catatan",
          tabBarIcon: ({color}) => (
            <MaterialIcons size={28} name="list" color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
