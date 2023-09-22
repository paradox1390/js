const obj = {
  num: 1,
  result: null,
  sum(num) {
    return this.num + num;
  },
};

function sum(num) {
  return this.num + num;
}

// arrow func
function cachesDecorator(func) {
  const cache = {};

  return (num) => {
    if (cache[`${func}-${num}`]) {
      this.result = cache[`${func}-${num}`];
      return this.result;
    }
    this.result = func.call(this, num);
    cache[`${func}-${num}`] = this.result;
    return this.result;
  };
}
const decoratedSum = cachesDecorator.call(obj, sum);
decoratedSum(2);

const decoratedSum2 = cachesDecorator.call(obj, obj.sum);
decoratedSum2(3);

// func
function cachesDecorator2(func) {
  const cache = {};

  return function (num) {
    if (cache[`${func}-${num}`]) {
      this.result = cache[`${func}-${num}`];
      return this.result;
    }
    this.result = func.call(this, num);
    cache[`${func}-${num}`] = this.result;
    return this.result;
  };
}
const decoratedSum3 = cachesDecorator2.call(obj, obj.sum);
decoratedSum3.call(obj, 3);

// Factorial recursion
function factorial(initialNumber) {
  if (initialNumber === 1 || initialNumber === 0) {
    return 1;
  }
  return initialNumber * factorial(initialNumber - 1);
}

// Fibonacci recursion
// I writed this solution and then  I sershed it up on the Internet and
// was impressed by the simplicity of the solution.
function fib(num) {
  let prev = 1;
  let current = 1;
  let res = `${prev} ${current} `;
  if (num <= 1) {
    return res;
  }
  const nextNumber = (num) => {
    if (num === 1) {
      return;
    }
    const temp = prev + current;
    prev = current;
    current = temp;
    res += `${current} `;
    return nextNumber(num - 1);
  };
  nextNumber(num);
  return res;
}

// Deep Copy (optional)
const deepCopy = (obj) => {
  let res;
  if (Array.isArray(obj)) {
    res = [];
    for (let i = 0; i < obj.length; i++) {
      if (!(typeof obj[i] === "object") || obj[i] === null) {
        res.push(obj[i]);
      } else {
        res.push(deepCopy(obj[i]));
      }
    }
  }
  if (typeof obj === "object" && !Array.isArray(obj)) {
    const keys = Object.keys(obj);
    res = {};
    for (let i = 0; i < keys.length; i++) {
      if (!(typeof obj[keys[i]] === "object") || obj[keys[i]] === null) {
        res[keys[i]] = obj[keys[i]];
      } else [(res[keys[i]] = deepCopy(obj[keys[i]]))];
    }
  }
  return res;
};

//DOM (optional)
//
const render = (dom) => {
  let result = ``;
  let atributs = ``;
  if (dom.attrs) {
    let keys = Object.keys(dom.attrs);
    keys.forEach((atribut) => {
      atributs += ` ${atribut}="${dom.attrs[atribut]}"`;
    });
  }
  result += `<${dom.tagName}${atributs || ""}>\n`;

  if (dom.hasOwnProperty("children")) {
    dom.children.forEach((child) => {
      if (typeof child !== "object") {
        result += `${child}`;
      } else {
        result += render(child);
      }
    });
  }

  result += `<${dom.tagName}>\n`;
  return result;
};
