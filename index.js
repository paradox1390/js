class BankAccount {
  constructor(balance, name) {
    this.balance = balance;
    this.accountHolder = name;
  }
  getBalance() {
    return this.balance;
  }
  getName() {
    return this.accountHolder;
  }

  setBalance(balance) {
    if (balance >= 0) this.balance = balance;
  }

  setName(name) {
    if (name.length >= 0) this.accountHolder = name;
  }
}

// Encapsulation
class BankAccount2 {
  constructor(balance, name) {
    this._balance = balance;
    this._accountHolder = name;
  }
  get accountHolder() {
    return this._accountHolder;
  }
  get balance() {
    return this._balance;
  }

  set accountHolder(name) {
    if (name.length >= 0) this._accountHolder = name;
  }
  set balance(balance) {
    if (balance >= 0) this._balance = balance;
  }
}

// Inheritance and Polymorphism
// Create a basic class Animal that has name property and a getInfo() method.
// getInfo method should return info about animal
// Create sub objects, Mammal and Bird, that inherit the properties and methods of the Animal.
// They should receive info about where they live
// Mammal should have method run
// Bird should have method fly
// Create Dog from Mammal and add property breed
// Add method whoIsGoodDog, this method should return 'woof woof'
// Create Penguin from Bird and add property species
// Update method fly and print 'can't fly'
// Add method swim
// For each child class update getInfo method
// Use super for updating method
class Animal {
  constructor(name) {
    this.name = name;
  }

  getInfo() {
    return `name - ${this.name}`;
  }
}
console.log(new Animal("tett"));

class Mammal extends Animal {
  constructor(name) {
    super(name);
    this.live = "ground";
    super.getInfo = () => {
      return `name - ${this.name} \n ${this.run()}`;
    };
  }
  run() {
    return `I can ${this.run.name}`;
  }
}

class Bird extends Animal {
  constructor(name) {
    super(name);
    this.live = "sky";
    super.getInfo = () => {
      return `name - ${this.name} \n ${this.fly()}`;
    };
  }

  fly() {
    return `I can ${this.fly.name}`;
  }
}
class Dog extends Mammal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
    super.getInfo = () => {
      return `name - ${this.name} \n\r ${this.run()} on the ${
        this.live
      }\n\r It's ${this.breed} dog`;
    };
  }

  whoIsGoodDog() {
    return "woof woof";
  }
}

class Penguin extends Bird {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
    this.live = "water";
    super.getInfo = () => {
      return `name - ${
        this.name
      } \n\r ${this.fly()} bun ${this.swim()} because i live in the ${
        this.live
      } \n\r It's ${this.breed} penguin`;
    };
  }
  fly() {
    return `I can't ${this.fly.name}`;
  }
  swim() {
    return `I can ${this.swim.name}`;
  }
}

const dogi = new Dog("pesik", "common");
const peng = new Penguin("pegi", "king");

//OOP
// Create class Vehicle
// Initialize class with properties power, gasTank and mass in tones Calculate max speed by formula 0.84 * power / mass
// Create method getMaxSpeed that returns maxSpeed
// Calculate gas usage per km by formula Math.round(maxSpeed / power * 100)
// Create method getGasUsage that returns gasUsage Create method startEngine that sets property started to true Create method stopEngine that sets property started to false Create method drive. This method receives 2 arguments speed and distance in km
// You cannot drive if started is false
// You cannot set speed more then maxSpeed and less then 0
// Update gas property corresponding to gasUsage Formula to calculate gas level is distance * gasUsage / 100
// Create method addGas adds gas to car by arg
// Argument must be bigger then zero
// You cannot pour more gas then gasTank
// Create method printInfo that prints in console all available information

// Create class Car
// Car should inherit from Vehicle
// Initialize Car with additional properties type and maxPassengerCount
// Examples of type SEDAN, MINIVAN, SPORTS CAR...
// Update method printInfo that prints in console all available information

// Create class Bus
// Bus should inherit from Car Create method updatePassengers that receives argument passengers and updates passengerCount to that number
// passengerCount cannot be more then maxPassengerCount and less then 0
// Update method printInfo that prints in console all available information

class Vehicle {
  constructor(power, gasTank, mass) {
    this.power = power;
    this.gasTank = gasTank;
    this.mass = mass;

    this.started = false;
    this.gas = gasTank;
    this.coeficientSped = 0.84;
    this.maxSpeed = (this.coeficientSped * this.power) / this.mass;
    this.gasUsage = Math.round((this.maxSpeed / this.power) * 100);
  }

  speed = 0;
  driveDistance = 0;
  getMaxSpeed() {
    return this.maxSpeed;
  }
  getGasUsage() {
    return this.gasUsage;
  }

  startEngine() {
    this.started = true;
  }

  stopEngine() {
    this.stop = true;
  }

  drive(speed, distance) {
    debugger;
    if (this.started) {
      this.speed =
        speed <= 0 ? 0 : speed <= this.maxSpeed ? speed : this.maxSpeed;
      const gasUsed = (distance * this.gasUsage) / 100;
      if (this.gas >= gasUsed) {
        this.gas -= gasUsed;
        this.driveDistance += distance;
      } else {
        this.gas = 0;
        const difGas = gasUsed - this.gas;
        const difDist = difGas / this.gasUsage;
        const deltaDistance = distance - difDist;
        this.driveDistance += deltaDistance;
        console.log(
          `You have run out of fuel. You have driven ${deltaDistance} km out of ${distance} km`
        );
      }
    }
  }
  addGas(gas) {
    if (gas > 0) {
      this.gas = this.gas + gas >= this.gasTank ? this.gasTank : this.gas + gas;
    }
  }

  printInfo() {
    return {
      power: this.power,
      gasTank: this.gasTank,
      mass: this.mass,
      started: this.started,
      gas: this.gas,
      maxSpeed: this.maxSpeed,
      gasUsage: this.gasUsage,
      speed: this.speed,
      driveDistance: this.driveDistance,
    };
  }
}

class Car extends Vehicle {
  constructor(power, gasTank, mass, maxPassengerCount, type = "SEDAN") {
    super(power, gasTank, mass);
    this.type = type;
    this.maxPassengerCount = maxPassengerCount;
  }
  printInfo() {
    const res = super.printInfo();
    res.type = this.type;
    res.maxPassengerCount = this.maxPassengerCount;
    return res;
  }
}

const car = new Car(200, 100, 3, 4);

class Bus extends Car {
  constructor(power, gasTank, mass, maxPassengerCount, type = "BUS") {
    super(power, gasTank, mass);
    this.maxPassengerCount = maxPassengerCount;
  }
  passengerCount = 0;
  updatePassengerCount(num) {
    this.passengerCount =
      this.passengerCount + num >= this.maxPassengerCount
        ? this.maxPassengerCount
        : this.passengerCount + num;
  }

  printInfo() {
    const res = super.printInfo();
    res.type = this.type;
    res.maxPassengerCount = this.maxPassengerCount;
    res.passengerCount = this.passengerCount;
    return res;
  }
}
