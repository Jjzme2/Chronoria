import fs from 'fs/promises';
import path from 'path';

/**
 * Read a file and return its content
 * @param {string} filePath - The path to the file
 * @returns {Promise<string>} - The file content
 */
export async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    throw error;
  }
}

/**
 * Write content to a file
 * @param {string} filePath - The path to the file
 * @param {string} content - The content to write
 * @returns {Promise<void>}
 */
export async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
  } catch (error) {
    console.error(`Error writing to file at ${filePath}:`, error);
    throw error;
  }
}

/**
 * Delete a file
 * @param {string} filePath - The path to the file
 * @returns {Promise<void>}
 */
export async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Error deleting file at ${filePath}:`, error);
    throw error;
  }
}

export { readFile, writeFile, deleteFile };
