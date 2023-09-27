const university = {
  universityName: "Kharkiv National University",
  rector: "Tetyana Kaganovska",
};

const faculty = {
  facultyName: "School of Geology, Geography, Recreation and Tourism",
  dean: "Vilina Peresadko",
  groups: [],
  enlistStudent: function (name) {
    if (
      this.groups.length === 0 ||
      this.groups[this.groups.length - 1].length > 12
    ) {
      this.groups.push([]);
    }
    this.groups[this.groups.length - 1].push(name);
  },
};

Object.setPrototypeOf(faculty, university);
faculty.enlistStudent("Taras");

// Prototype constructor
// Create a basic Animal that has name property and a getInfo() method.
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

function Animal(name) {
  this.name = name;
}

Animal.prototype.getInfo = function () {
  return `Call this function in correct child instance`;
};

function Mammal(name) {
  Animal.call(this, name);
  this.live = "ground";
}

function Bird(name) {
  Animal.call(this, name);
  this.live = "sky";
}

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;

Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;

Mammal.prototype.getInfo = function () {
  const props = Object.entries(this);
  let res = ``;
  props.forEach(([key, value]) => {
    res += `${key} - ${value} \n`;
  });
  return res;
};

Mammal.prototype.run = function () {
  return `${this.name} - run on ${this.live}`;
};

Bird.prototype.getInfo = function () {
  const props = Object.entries(this);
  let res = ``;
  props.forEach(([key, value]) => {
    res += `${key} - ${value} \n`;
  });
  return res;
};

Bird.prototype.fly = function () {
  return `${this.name} - fly in the ${this.live}`;
};

function Dog(name, breed) {
  Mammal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Mammal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.whoIsGoodDog = function () {
  return "woof woof";
};

function Penguin(name, species) {
  Bird.call(this, name);
  this.live = "water";
  this.species = species;
}

Penguin.prototype = Object.create(Bird.prototype);
Penguin.prototype.constructor = Penguin;

Penguin.prototype.fly = function () {
  return "can't fly";
};

Penguin.prototype.swim = function () {
  return "Can swim";
};

const dogi = new Dog("Pesik", "Common");
const pegi = new Penguin("Large flipper", "King");
