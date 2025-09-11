// /constant/api.js
import axios from "axios";

const BASE_URL = "https://bookworm-app-y7mx.onrender.com"; // no trailing slash is fine
// const HEALTH = "/health"; // optional - better to call a health endpoint if you have one

export const isServerOnline = async () => {
  try {
    console.log("isServerOnline: starting request to", BASE_URL);
    const res = await fetch(BASE_URL);
    console.log("isServerOnline: status", res.status);
    // Return only payload so RN UI doesn't try to render an axios object
    return res.data;
  } catch (err) {
    // Better logs to know why axios failed
    console.log("isServerOnline: ERROR message:", err.message);

    if (err.response) {
      // Server responded with non-2xx -- we got a response
      console.log("isServerOnline: err.response.status:", err.response.status);
      console.log("isServerOnline: err.response.data:", err.response.data);
    } else if (err.request) {
      // Request was made but no response received
      console.log("isServerOnline: err.request (no response) ->", err.request);
    } else {
      // Something else happened
      console.log("isServerOnline: unexpected error ->", err);
    }

    // Throw so the caller can handle it (do not return the raw axios error object)
    throw err;
  }
};
