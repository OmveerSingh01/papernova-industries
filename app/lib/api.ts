export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const isBrowser =
    typeof window !== "undefined";

  async function refreshAccessToken() {
    if (!isBrowser) {
      return false;
    }

    const refreshToken =
      localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return false;
    }

    try {
      const response = await fetch(
        "/api/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken,
          }),
        }
      );

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      if (!data.accessToken) {
        return false;
      }

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      if (data.refreshToken) {
        localStorage.setItem(
          "refreshToken",
          data.refreshToken
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Token refresh failed:",
        error
      );

      return false;
    }
  }

  function getAccessToken() {
    if (!isBrowser) {
      return null;
    }

    return localStorage.getItem("accessToken");
  }

  function isTokenExpired(
    token: string
  ): boolean {
    try {
      const parts = token.split(".");

      if (parts.length !== 3) {
        return true;
      }

      const payload = JSON.parse(
        atob(
          parts[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );

      if (!payload.exp) {
        return true;
      }

      const currentTime =
        Math.floor(Date.now() / 1000);

      // Refresh 30 seconds before expiry
      return (
        payload.exp <= currentTime + 30
      );
    } catch {
      return true;
    }
  }

  async function makeRequest(
    token: string | null
  ) {
    const headers = new Headers(
      options.headers
    );

    if (
      !(options.body instanceof FormData)
    ) {
      headers.set(
        "Content-Type",
        "application/json"
      );
    }

    if (token) {
      headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }

    return fetch(endpoint, {
      ...options,
      headers,
    });
  }

  let token = getAccessToken();

  /*
   * Check the access token before making
   * the request.
   *
   * If it is expired or about to expire,
   * refresh it first.
   */
  if (
    token &&
    isTokenExpired(token)
  ) {
    const refreshed =
      await refreshAccessToken();

    if (refreshed) {
      token = getAccessToken();
    }
  }

  let response = await makeRequest(token);

  /*
   * If the server still rejects the request,
   * try refreshing once.
   *
   * This handles the situation where the
   * token expires between our check and the
   * actual API request.
   */
  if (
    response.status === 401 &&
    isBrowser
  ) {
    const refreshed =
      await refreshAccessToken();

    if (refreshed) {
      token = getAccessToken();

      response = await makeRequest(
        token
      );
    }
  }

  let data: any;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Server returned an invalid response."
    );
  }

  if (!response.ok) {
    /*
     * If refresh also failed, clear the
     * authentication tokens.
     */
    if (
      response.status === 401 &&
      isBrowser
    ) {
      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );
    }

    throw new Error(
      data?.message ||
        "Something went wrong."
    );
  }

  return data as T;
}