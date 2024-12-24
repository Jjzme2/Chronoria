/**
 * Utility functions for DOM manipulation
 */

/**
 * Get an element by its ID
 * @param {string} id - The ID of the element
 * @returns {HTMLElement|null} - The element with the specified ID, or null if not found
 */
export function getElementById(id) {
  return document.getElementById(id);
}

/**
 * Get all elements by their class name
 * @param {string} className - The class name of the elements
 * @returns {NodeList} - A NodeList of elements with the specified class name
 */
export function getAllElementsByClass(className) {
  return document.getElementsByClassName(className);
}

/**
 * Get all elements by their tag name
 * @param {string} tagName - The tag name of the elements
 * @returns {NodeList} - A NodeList of elements with the specified tag name
 */
export function getElementByTagName(tagName) {
  return document.getElementsByTagName(tagName);
}

/**
 * Get an element by its name attribute
 * @param {string} name - The name attribute of the element
 * @returns {NodeList} - A NodeList of elements with the specified name attribute
 */
export function getElementByName(name) {
  return document.getElementsByName(name);
}
