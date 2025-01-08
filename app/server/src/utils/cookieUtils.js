export function setCookie(res, name, value, options = {}) {
  res.cookie(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure cookies are only set in production over HTTPS
    sameSite: "Strict", // Prevent CSRF
    ...options, // Override with additional options like maxAge
  });
}
