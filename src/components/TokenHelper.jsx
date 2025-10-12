class TokenHelper {
  setToken(payload) {
    // Ensure token is stored as raw string (no quotes)
    if (payload) {
      localStorage.setItem("token", payload.replace(/^"|"$/g, ""));
    }
  }

  getToken() {
    const token = localStorage.getItem("token");
    return token ? token.replace(/^"|"$/g, "") : null;
  }

  getHeader() {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`, // ✅ standard way
      },
    };
  }

  setUserInfo(payload) {
    localStorage.setItem("user_info", JSON.stringify(payload));
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("user_info"));
  }

  setLogoutInfo() {
    localStorage.clear();
  }
}

export default new TokenHelper();
