import { capitalize } from '../utils/stringUtil.js';

describe('capitalize', () => {
  it('should capitalize the first letter of each word in a string', () => {
    const input = 'hello world';
    const expectedOutput = 'Hello world';
    expect(capitalize(input)).toBe(expectedOutput);
  });

  it('should handle empty strings correctly', () => {
    const input = '';
    const expectedOutput = '';
    expect(capitalize(input)).toBe(expectedOutput);
  });

  it('should handle strings with special characters correctly', () => {
    const input = 'hello-world';
    const expectedOutput = 'Hello-world';
    expect(capitalize(input)).toBe(expectedOutput);
  });
});
