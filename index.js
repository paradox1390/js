// Random Resolve
const randomResolve = () => {
  // your code
  return new Promise((resolve, reject) => {
    const randomNum = Math.floor(Math.random() * 5) + 1;
    const randomTime = Math.floor(Math.random() * 5000) + 1;
    setTimeout(() => {
      randomNum % 2 === 0
        ? resolve(`number is even => ${randomNum}`)
        : reject(`number is odd  => ${randomNum}`);
    }, randomTime);
  });
};

randomResolve()
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

// Promise API
const createPromiseArr = (n) => {
  const promiseAll = [];
  for (let i = 0; i < n; i++) {
    promiseAll.push(randomResolve());
  }
  return Promise.all(promiseAll);
};

const promiseAll = createPromiseArr(5);
promiseAll
  .then((data) => {
    console.log(data);
    console.log("🥳 Yasss");
  })
  .catch((err) => {
    console.log(err);
    console.log("🫠🫡 ok");
  });

const createPromiseArrRace = (n) => {
  const promiseAll = [];
  for (let i = 0; i < n; i++) {
    promiseAll.push(randomResolve());
  }
  return Promise.race(promiseAll);
};

const promiseRace = createPromiseArrRace(5);
promiseRace
  .then((data) => {
    console.log(data);
    console.log("🥳 Yasss");
  })
  .catch((err) => {
    console.log(err);
    console.log("🫠🫡 ok");
  });

// Async/Await
const printResponse = async (n) => {
  const promiseArr = [];
  for (let i = 0; i < n; i++) {
    promiseArr.push(randomResolve());
  }
  try {
    const res = await Promise.race(promiseArr);
    console.log(res);
  } catch (err) {
    console.log("🫠🫡 ok");
  }
};

printResponse(5);

// Casino (optional)
// Create a function that resolves a promise
// Promise should be resolved after random seconds
// Return values {value: 1, color: 'black'},
// {value: 2, color: 'red'}, {value: 0, color: 'green'}
// Odd number is black, even number is red

// Create a function casino that receives arr of your stakes
// Stake values can be red, black, even, odd, number(0, 1, 2...)
// If one of your stakes is fulfilled print '💵'
// If all of your stakes are rejected print '🫣'
// * Feel free to updated stakes type
// Example from string red => {value: 'red', color: true}

const casinoBall = () => {
  const casinoStack = [];
  for (let i = 0; i < 37; i++) {
    const randomTime = Math.floor(Math.random() * 5000) + 1;
    const promiseBet = new Promise((resolve) => {
      setTimeout(() => {
        const bet = {};
        bet.value = i;
        if (i === 0) {
          bet.color = "green";
        } else {
          i % 2 === 0 ? (bet.color = "red") : (bet.color = "black");
        }
        resolve(bet);
      }, randomTime);
    });
    casinoStack.push(promiseBet);
  }
  return casinoStack;
};

const joyCasino = async (...args) => {
  let res = "";
  const all = await Promise.race(casinoBall());
  const arrToObj = args.reduce((obj, item) => {
    obj[item] = item;
    return obj;
  }, {});
  const pair = all.value % 2 === 0 ? "even" : "odd";
  if (arrToObj[all.color] || arrToObj[all.value] || arrToObj[pair]) {
    res = "💵";
  } else {
    res = "🫣";
  }
  return res;
};

joyCasino("red", 1, 3, "even").then((result) => {
  console.log(result);
});
