// authUtils.js

// Function to decode JWT (if necessary)
export function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

// Function to check token expiration
export function isTokenExpired(token) {
  const decoded = decodeJwt(token);
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return decoded.exp < currentTime;
}

// Function to handle token refresh
export async function refreshAccessToken() {
  try {
    const response = await fetch('/api/user/refresh-token', {
      method: 'POST',
      credentials: 'include', // Send cookies with request
    });

    const data = await response.json();

    if (response.ok) {
      // Successfully refreshed the access token
      const newAccessToken = data.accessToken;
      // Store the new token in local storage or use it for subsequent requests
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } else {
      // Handle refresh token failure (e.g., expired refresh token)
      console.error('Refresh token failed:', data.error);
      window.location.href = '/login'; // Redirect to login if the refresh token fails
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/login'; // Redirect to login if error occurs
  }
}

// Function to handle API request with token refresh logic
export async function makeApiRequest(url, options = {}) {
  let accessToken = localStorage.getItem('accessToken');

  // Check if the access token is expired
  if (isTokenExpired(accessToken)) {
	console.log("Refreshing token.")
    accessToken = await refreshAccessToken(); // Refresh the token if expired
  }

  // Include the access token in the headers for the API request
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(url, {
    ...options,
    headers: headers,
  });

  // If the response status is 401 (Unauthorized), try to refresh the token
  if (response.status === 401) {
    accessToken = await refreshAccessToken();
    if (accessToken) {
      // Retry the request with the new access token
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      const retryResponse = await fetch(url, {
        ...options,
        headers: retryHeaders,
      });
      return retryResponse.json();
    } else {
      // If refresh token is also invalid, log the user out
      logout();
    }
  }

  return response.json();
}

// Function to log the user out
export function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = '/login';
}