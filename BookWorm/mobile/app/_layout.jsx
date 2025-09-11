// app/_layout.jsx
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // micro-delay so navigation runs AFTER the router is mounted (fixes iOS)
    const t = setTimeout(() => {
      router.replace("/(auth)/login"); // ← use the exact file path in your app folder
    }, 0);

    return () => clearTimeout(t);
  }, [router]);

  // IMPORTANT: render the Slot (navigator) on FIRST render
  return <Slot />;
}
