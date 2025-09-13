// utils/safeFetchWithRetry.js
export async function safeFetchWithRetry(url, options = {}, { retries = 4, backoff = 700, timeout = 9000 } = {}) {
  const attempt = async (n, delay) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      if (n <= 0) throw err;
      console.warn(`safeFetch failed, retrying in ${delay}ms — attempts left: ${n}`, err?.message || err);
      await new Promise(r => setTimeout(r, delay));
      return attempt(n - 1, Math.round(delay * 1.8));
    }
  };
  return attempt(retries, backoff);
}
