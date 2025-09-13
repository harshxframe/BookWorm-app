import { create } from "zustand";
import { loginAPI } from "../constant/api.js";
import { safeFetchWithRetry } from "../utils/safeFetchWithRetry";

export const useAuthStore = create((set) => ({
  isLoading: false,
  token: null,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      console.log("Process started in main thread (register)");
      console.log("register URL:", loginAPI.toString());

      const response = await safeFetchWithRetry(loginAPI.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }, { retries: 4, backoff: 700, timeout: 9000 });

      console.log("status:", response.status, "ct:", response.headers.get("content-type"));
      const raw = await response.text();
      console.log("raw response:", raw.slice(0, 1200));

      let resJson;
      try { resJson = JSON.parse(raw); } catch (e) {
        set({ isLoading: false });
        return { status: "NOT_DONE", error: "Server returned non-JSON", raw };
      }

      set({ isLoading: false });

      if (response.ok) {
        set({ token: resJson.token || null });
        return { status: "DONE", data: resJson };
      } else {
        return { status: "NOT_DONE", error: resJson };
      }
    } catch (e) {
      console.error("register network error:", e);
      set({ isLoading: false });
      return { status: "NOT_DONE", error: String(e) };
    }
  }
}));
