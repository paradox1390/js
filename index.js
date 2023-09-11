// Pythagorean theorem
const pythagorean = (a, b) => {
  return Math.sqrt(a ** 2 + b ** 2);
};

// Show number in money format
// +- sign should be present
// Separate thousands with
const formatMoney = (num) => {
  const strNum = Math.abs(num.toFixed(2)).toString();
  return (num < 0 ? "- " : "+ ") + strNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format number in spaces
// +- sign should be present
// Separate thousands with spaces
const formatNumber = (num) => {
  const strNum = Math.abs(num.toFixed(3)).toString();
  return (num < 0 ? "- " : "+ ") + strNum.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Write a password generator with length n

const generatePassword = (num) => {
  const symbols =
    "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz";
  let pass = "";
  for (let i = 0; i < num; i++) {
    pass += symbols[Math.floor(Math.random() * symbols.length)];
  }

  return pass;
};

// Calculate percentage with n numbers after dot

const calc = (firstNum, secondNum, precision) => {
  return +((secondNum * 100) / firstNum).toFixed(precision);
};

// Get integer part of number and decimal

const splitNumber = (num) => {
  const arrNum = num.toString().split(".");
  return { int: +arrNum[0], decimal: +arrNum[1] || 0 };
};

// Check if prime

const isPrime = (num) => {
  let isPrime = true;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }
  return isPrime;
};

// Check if number is Armstrong Number
const isArmstrong = (num) => {
  const arrNum = num.toString().split("");
  return (
    num ===
    arrNum.reduce((acc, item) => {
      return (acc += item ** 3);
    }, 0)
  );
};
