/**
 * String Utility Functions
 */

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export function capitalize(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to camel case.
 * @param {string} str - The string to convert.
 * @returns {string} - The camel case string.
 */
export function camelCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

/**
 * Converts a string to kebab case.
 * @param {string} str - The string to convert.
 * @returns {string} - The kebab case string.
 */
export function kebabCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str
    .replace(/\s+/g, '-')
    .toLowerCase();
}
