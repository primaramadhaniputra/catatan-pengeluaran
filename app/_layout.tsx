import {Stack} from "expo-router";
import "react-native-reanimated";

import {initDB} from "@/db";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {useEffect} from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    initDB();
  }, []);

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen
        name="modal"
        options={{presentation: "modal", title: "Modal"}}
      />
      <Stack.Screen name="expense" options={{headerShown: false}} />
      <Stack.Screen name="history-detail" options={{headerShown: false}} />
    </Stack>
    // <StatusBar style="auto" />
    // </ThemeProvider>
  );
}
