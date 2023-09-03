// Reverse str
/**Return reverse string
 * @param {string} str
 * @returns {string}
 */
const reverse = (str) => {
  let res = ``;
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
};

// Count words
/**
 * Return count words in string
 * @param {string} str
 * @returns {number}
 */
const countWords = (str) => {
  return str.trim().split(" ").length;
};

// Clear whitespace
/**
 * Return string without space symbols but \n \t \r still stay
 * @param {string} str
 * @returns {string}
 */
const clearWhiteSpace = (str) => {
  return str.replace(/ +/g, "");
};

//Max length
/**
 * return a cut string + ... method slice
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
const cutStr = (str, maxLength) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

/**
 * return a cut string + ... method regexp
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
const cutStr2 = (str, maxLength) => {
  return str.length > maxLength
    ? str.match(new RegExp(`\.\{${maxLength}\}`)) + "..."
    : str;
};

// Palindrome
/**
 * Return true or false if string is palindrome. Used method comparison string with reverce string.
 * @param {string} str
 * @returns {boolean}
 */
const palindrome = (str) => {
  return str.toLowerCase() === reverse(str).toLowerCase();
};

/**
 * Return true or false if string is palindrome. Used method character-by-character comparison
 * @param {string} str
 * @returns {boolean}
 */
const palindrome2 = (str) => {
  const maxPosition = str.length - 1;
  let isPalindrome = true;
  for (let i = 0; i <= Math.floor(maxPosition / 2); i++) {
    isPalindrome = str[i] === str[maxPosition - i];
    if (!isPalindrome) break;
  }
  return isPalindrome;
};
