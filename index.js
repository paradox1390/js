//Quadratic equation

/**
 *Finding the roots of a quadratic equation of the following type ax2 + bx + c = 0 by the Discriminant method
 * @param {number} a first agrument
 * @param {number} b second agrument
 * @param {number} c third agrument
 * @returns {{x1:number, x2:number}|{string}} returns object with roots equation or string if roots don't exist
 */
const quadratic = (a, b, c) => {
  let D = b ** 2 - 4 * a * c;
  let result = {};
  if (D < 0) {
    result = "no solution to the equation";
  } else if (D === 0) {
    result.x1 = result.x2 = -((b / 2) * a);
  } else {
    result.x1 = +((-b - Math.sqrt(D)) / (2 * a)).toFixed(2);
    result.x2 = +((-b + Math.sqrt(D)) / (2 * a)).toFixed(2);
  }
  return result;
};

console.log(quadratic(2, 6, 1));
console.log(quadratic(6, 1, 6));
console.log(quadratic(2, 4, 2));

//Factorial

/**
 *Returns the factorial of a number
 * @param {number} num
 * @returns {number}
 */
const factorial = (num) => {
  let res = 1;
  for (let i = 1; i <= num; i++) {
    res *= i;
  }
  return res;
};

console.log(factorial(5));

//Calculator

/**
 * Return sum all items in array. Addition begin from 1 item in Array.
 * @param {[number]} arr
 * @returns {Number}
 */
const addition = (arr) => {
  let res = arr[0];
  for (let i = 1; i <= arr.length - 1; i++) {
    res += arr[i];
  }
  return res;
};

/**
 * Return res subtraction all items in array. Subtraction begin from 1 item in Array.
 * @param {[number]} arr
 * @returns {Number}
 */
const subtraction = (arr) => {
  let res = arr[0];
  for (let i = 1; i <= arr.length - 1; i++) {
    res -= arr[i];
  }
  return res;
};

/**
 * Return res multiplication all items in array. Multiplication begin from 1 item in Array.
 * @param {[number]} arr
 * @returns {Number}
 */
const multiplication = (arr) => {
  let res = arr[0];
  for (let i = 1; i <= arr.length - 1; i++) {
    res *= arr[i];
  }
  return res;
};

/**
 * Return res division all items in array. Division begin from 1 item in Array.
 * @param {[number]} arr
 * @returns {Number}
 */
const division = (arr) => {
  let res = arr[0];
  for (let i = 1; i <= arr.length - 1; i++) {
    res /= arr[i];
  }
  return res;
};

/**
 * Returns result one of math function
 * @function calculate Calculate 4 functions addition, subtraction, multiplication, division
 * @param {function([number])} callback
 * @param  {...number} rest unlimited number of arguments
 * @returns {number} return result type number
 */
const calculate = (callback, ...rest) => {
  let res = callback(rest);
  return res;
};

console.log(calculate(addition, 1, 1, 1, 1));
console.log(calculate(subtraction, 20, 10, 5));
console.log(calculate(multiplication, 2, 10, 2));
console.log(calculate(division, 20, 10, 2));

//Fibonacci
/**
 * Return the number of Fibonacci
 * @param {number} num
 * @returns {[number]|string} Return array fibonacci numbers or error
 */
const fibonacci = (num) => {
  let res = [];
  if (num <= 0) {
    res = `Error: function argument must be biggest then zero`;
  } else if (typeof num !== "number") {
    res = `Error: function argument must be number`;
  }
  let prev = 0;
  let next = 1;
  res.push(prev);
  res.push(next);
  console.log(prev);
  console.log(next);
  for (let i = 2; i <= num; i++) {
    let temp = next;
    next += prev;
    prev = temp;
    console.log(next);
    res.push(next);
  }
  return res;
};

// pyramid

/**
 * Draw triagle, triagle height is the function argument.
 * @param {number} num
 * @returns {string}
 */
const printPyramid = (num) => {
  let star = "*";
  let hash = "#";
  let leftSide = num;
  let rightSide = 1;
  let res = ``;
  for (let i = 1; i <= num; i++) {
    let str = ``;
    for (let i = 1; i <= num; i++) {
      if (i < leftSide) {
        str += hash;
      } else {
        str += star;
      }
    }
    for (let i = 1; i <= num - 1; i++) {
      if (i < rightSide) {
        str += star;
      } else {
        str += hash;
      }
    }
    res += `${str}\n`;
    leftSide--;
    rightSide++;
  }
  return res;
};

console.log(printPyramid(5));
