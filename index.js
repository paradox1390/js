// Timeout
const printNumber = () => {
  let number = 1;
  const intervalId = setInterval(() => {
    console.log(number);
    if (number === 5) {
      clearInterval(intervalId);
    }
    number++;
  }, 1000);
};

// Timeout2;
let timeId;
let number = 1;
const printNumber2 = () => {
  console.log(number);
  number++;
  if (number > 5) {
    clearTimeout();
  } else {
    timeId = setTimeout(printNumber2, 1000);
  }
};

// Delayed loop

const delayedLoop = () => {
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
};

// Random
const getUserData = () => {
  return new Promise((resolve, reject) => {
    const num = Math.random();
    if (num >= 0.5) {
      resolve(num);
    } else {
      reject(new Error("404 not found"));
    }
  });
};

// Create a function getUserData
// getUserData receives id as a param
// getUserData should return promise
// Find user by id
// If no users found throw Error
// Add delay for 1 second

const users = [
  {
    id: 1,
    name: "Taras",
    age: 30,
    movies: [],
  },
  {
    id: 2,
    name: "Kate",
    age: 45,
    movies: ["Titanic", "Avatar"],
  },
];

const getUserData2 = (id) => {
  debugger;
  return new Promise((resolve, reject) => {
    const res = users.filter((item) => {
      return item.id === id;
    });
    if (res.length > 0) {
      setTimeout(() => {
        return resolve(res);
      }, 5000);
    } else {
      setTimeout(() => {
        return reject(new Error('"404 not found"'));
      }, 3000);
    }
  });
};

const promis = getUserData2(2);

promis
  .then((data) => {
    console.log(data);
  })
  .catch((er) => {
    console.log(er);
  });
