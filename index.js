// Filter arr
// Crazy ternary :) I did optional last argument
/**
 *Return arr with values that are in range from 'from' param and to 'to' param
 * @param {Array} arr
 * @param {*} from
 * @param {*} to
 * @returns {Array | -1}
 */
const filterRange = (arr, from, to) => {
  return Array.isArray(arr)
    ? arr.filter((item) => {
        return from <= item && item <= to;
      })
    : -1;
};

// Sort arr
/**
 * Sort arr from least to biggest
 * @param {Array<number>} arr
 * @returns {Array<number>}
 */
const sortArrNum = (arr) => {
  return Array.isArray(arr)
    ? arr.sort((a, b) => {
        return a - b;
      })
    : -1;
};

// Sort arr str
/**
 *Sort arr of strings from shortest to longest
 * @param {Array<string>} arr
 * @returns {Array<string> | -1}
 */
const sortArrStr = (arr) => {
  return Array.isArray(arr)
    ? arr.sort((a, b) => {
        return a.length === b.length ? (a > b ? 1 : -1) : a.length - b.length;
      })
    : -1;
};

// Calculate average age of users older then 17 and younger then 55
/**
 * Return average age of users older then 17 and younger then 55
 * @param {Array} arr
 * @returns {number}
 */
const averageAge = (arr) => {
  let count = 0;
  return Array.isArray(arr)
    ? arr.reduce((acc, item) => {
        if (17 < item.age && item.age < 55) {
          count++;
          acc += item.age;
        }
        return acc;
      }, 0) / count
    : -1;
};

// Sort arr by name
/**
 *Return sorted array of objects by name, if 2 elements have same name sort by age
 * @param {Array} arr
 * @returns {Array}
 */
const sortUsers = (arr) => {
  return Array.isArray(arr)
    ? arr.sort((a, b) => {
        return a.name !== b.name ? (a.name > b.name ? 1 : -1) : a.age - b.age;
      })
    : -1;
};

// Find min and max
/**
 *Find min and max age in array of objects and return obj {min, max}
 * @param {Array<object>} arr
 * @returns {object}
 */
const minMaxAge = (arr) => {
  return Array.isArray(arr)
    ? arr.reduce(
        (acc, item) => {
          if (acc.min > item.age) acc.min = item.age;
          if (acc.max < item.age) acc.max = item.age;
          return acc;
        },
        { min: Infinity, max: -Infinity }
      )
    : -1;
};

// Save only unique values
/**
 *Return unique strings from arr to uniqueArr
 * @param {Array<String>} arr
 * @returns {Array<String>}
 */
const unique = (arr) => {
  return Array.isArray(arr)
    ? arr.reduce((acc, item) => {
        let regexp = new RegExp(item, "i");
        if (
          !acc.some((el) => {
            return regexp.test(el);
          })
        ) {
          acc.push(item);
        }
        return acc;
      }, [])
    : -1;
};

// Find the Longest Consecutive Sequence
/**
 *Return Longest Consecutive Sequence number in array, sequences can be to bigest or to smalest number and difference threshold between numbers
 * @param {Array<number>} arr
 * @returns {Array<number>}
 */
const findLongestConsecutive = (arr) => {
  let result = [];
  let tempArr = [arr[0], arr[1]];
  let trend = arr[0] - arr[1];
  for (let i = 2; i <= arr.length - 1; i++) {
    if (trend === arr[i - 1] - arr[i]) {
      tempArr.push(arr[i]);
      if (tempArr.length > result.length) {
        result = [];
        result = [...tempArr];
      }
    } else {
      trend = arr[i - 1] - arr[i];
      tempArr = [arr[i - 1], arr[i]];
    }
  }
  return result;
};
