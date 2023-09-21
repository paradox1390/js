// Create arr method
// Create obj with property from and to
// Create function createArr that reads obj properties and
// Creates new sorted arr with range from and to
// Assign this arr as obj property
// Create 3 solutions Solution 1 without bind, call or apply
// Solution 2 with bind Solution 3 with call or apply

const obj = {
  from: 1,
  to: 10,
  createArr() {
    this.arr = [];
    for (let i = this.from; i <= this.to; i++) {
      this.arr.push(i);
    }
  },
};

// Solution 2 and 3
function createArr() {
  this.arr = [];
  for (let i = this.from; i <= this.to; i++) {
    this.arr.push(i);
  }
}
obj.createArr();

// call
createArr.call(obj);

// bind
const createArrBind = createArr.bind(obj);
createArrBind();

// Calculator

const calculator = {
  result: 0,
  sum(num) {
    this.result += num;
    return this;
  },
  sub(num) {
    this.result -= num;
    return this;
  },
  mul(num) {
    this.result *= num;
    return this;
  },
  div(num) {
    this.result /= num;
    return this;
  },
};

// Constructor Function
// Create a constructor function that creates car obj
// Obj should have properties model, color, age, speed, gasTank and
// started Obj should have methods startEngine, drive, stop, speedUp, slowDown, addGas This methods should be chainable
// startEngine method checks if car has gas (you can create another method for checking gas)
// If gas is not empty set property started to true
// drive method should do smth only if property started is true and gas is not 0
// if started true increase speed to 30
// stop method sets property started to false and speed to 0
// speedUp method increases speed by arg. Max speed is 200
// Each speedUp method decreases gas by 5. Max gas is 20 If gas is empty stop car
// gas cannot be less then 0
// If started is false stop car
// speedUp(5) adds 5 to speed
// slowDown works like speedUp but decreases speed. Min speed is 0
// addGas method adds gas to car by arg
// addGas(5) adds 5 to gas

function Car(model, color, age, gasTank) {
  this.model = model;
  this.color = color;
  this.age = age;
  this.speed = 0;
  this.gasTank = gasTank <= 20 ? gasTank : 20;
  this.started = false;
  this.isFullGas = function () {
    return this.gasTank > 0 ? true : false;
  };
  this.startEngine = function () {
    if (this.isFullGas()) this.started = true;
    return this;
  };
  this.drive = function () {
    if (this.started && this.isFullGas()) this.speed = 30;
    return this;
  };
  this.stop = function () {
    this.started = false;
    this.speed = 0;
    return this;
  };
  this.speedUp = function (num) {
    this.speed = this.speed + num <= 200 ? this.speed + num : 200;
    this.gasTank = this.gasTank - 5 > 0 ? this.gasTank - 5 : 0;
    if (!this.isFullGas()) {
      this.stop();
    }
    return this;
  };

  this.slowDown = function (num) {
    this.speed = this.speed - num >= 0 ? this.speed - num : 0;
    this.gasTank = this.gasTank - 5 > 0 ? this.gasTank - 5 : 0;
    if (!this.isFullGas()) {
      this.stop();
    }
    return this;
  };

  this.addGas = function (num) {
    this.gasTank = this.gasTank + num <= 20 ? this.gasTank + num : 20;
    return this;
  };
}

// Я трохи з покером переборщив
// Poker
function checkFlush() {
  let isFlesh = false;
  if (this.players[0].combination === undefined) {
    this.getWinner();
  }
  for (let i = 0; i < this.players.length; i++) {
    if (this.players[i].combination.flush.cards.length !== 0) {
      isFlesh = true;
      break;
    }
  }

  return isFlesh;
}
function checkSequence() {
  let isStraight = false;
  if (this.players[0].combination === undefined) {
    this.getWinner();
  }
  for (let i = 0; i < this.players.length; i++) {
    if (this.players[i].combination.straight.cards.length !== 0) {
      isStraight = true;
      break;
    }
  }

  return isStraight;
}

function Poker(names) {
  const cardNames = [
    { nameCard: 2, cardValue: 2 },
    { nameCard: 3, cardValue: 3 },
    { nameCard: 4, cardValue: 4 },
    { nameCard: 5, cardValue: 5 },
    { nameCard: 6, cardValue: 6 },
    { nameCard: 7, cardValue: 7 },
    { nameCard: 8, cardValue: 8 },
    { nameCard: 9, cardValue: 9 },
    { nameCard: 10, cardValue: 10 },
    { nameCard: "J", cardValue: 11 },
    { nameCard: "Q", cardValue: 12 },
    { nameCard: "K", cardValue: 13 },
    { nameCard: "A", cardValue: 14 },
  ];
  const cardSuits = ["♠", "♦", "♥", "♣"];
  const deck = [];
  const players = [];
  // arr players
  names.forEach((element) => {
    players.push({ name: element, handCards: [] });
  });

  // deck cards
  for (let i = 0; i < cardSuits.length; i++) {
    for (let k = 0; k < cardNames.length; k++) {
      const { nameCard, cardValue } = cardNames[k];
      const card = {
        nameCard: nameCard,
        cardValue: cardValue,
        suit: cardSuits[i],
      };
      deck.push(card);
    }
  }

  this.distribution = function () {
    // shuffle deck
    const shuffleDeck = [];
    for (let i = 52; i >= 1; i--) {
      const random = Math.floor(Math.random() * i);
      shuffleDeck.push(this.deck[random]);
      this.deck.splice(random, 1);
    }

    // card distribution
    for (let i = 0; i < 5; i++) {
      for (let k = 0; k < this.players.length; k++) {
        this.players[k].handCards.push(shuffleDeck.pop());
      }
    }
    return this;
  };

  this.getWinner = function () {
    if (this.players[0].combination === undefined) {
      this.distribution();
    }

    // function combination count
    function countCard(handCards) {
      const sortedHandCards = handCards.sort(
        (a, b) => a.cardValue - b.cardValue
      );
      const combination = {
        highCard: { cards: [...sortedHandCards] },
        pair: { cards: [], restCard: [] },
        twoPair: { cards: [[], []], restCard: [] },
        three: { cards: [], restCard: [] },
        straight: { cards: [] },
        flush: { cards: [] },
        fullHouse: { cards: [[], []] },
        quads: { cards: [], restCard: [] },
        straightFlush: { cards: [] },
        royalFlush: { cards: [] },
      };
      const cardValueCount = [];
      const cardSuitCount = [];
      const cardValueQueue = [];
      cardValueCount.push(sortedHandCards[0]);
      cardSuitCount.push(sortedHandCards[0]);
      cardValueQueue.push(sortedHandCards[0]);
      for (let i = 1; i < sortedHandCards.length; i++) {
        if (
          cardValueCount[cardValueCount.length - 1].cardValue ===
          sortedHandCards[i].cardValue
        ) {
          cardValueCount.push(sortedHandCards[i]);
        } else {
          cardValueCount.length === 2 && combination.pair.cards.length === 0
            ? combination.pair.cards.push(...cardValueCount)
            : "";
          cardValueCount.length = 0;
          cardValueCount.push(sortedHandCards[i]);
        }

        // last pair
        if (i > 3 && cardValueCount.length === 2) {
          combination.pair.cards.push(...cardValueCount);
        }

        // twopair
        if (cardValueCount.length === 2) {
          combination.twoPair.cards[0].length === 0
            ? combination.twoPair.cards[0].push(...cardValueCount)
            : combination.twoPair.cards[1].push(...cardValueCount);
        }

        // three
        if (cardValueCount.length === 3) {
          combination.three.cards.push(...cardValueCount);
        }
        //quads
        if (cardValueCount.length === 4) {
          combination.quads.cards.push(...cardValueCount);
        }
        // for flush
        if (cardSuitCount.length === i) {
          cardSuitCount[i - 1].suit === sortedHandCards[i].suit
            ? cardSuitCount.push(sortedHandCards[i])
            : (cardSuitCount.length = 0);
        }
        // for straight
        if (cardValueQueue.length === i) {
          cardValueQueue[i - 1].cardValue - sortedHandCards[i].cardValue === -1
            ? cardValueQueue.push(sortedHandCards[i])
            : (cardValueQueue.length = 0);
        }
      }
      // for straight
      if (cardValueQueue.length === 5) {
        combination.straight.cards.push(...cardValueQueue);
      }
      // for flush
      if (cardSuitCount.length === 5) {
        combination.flush.cards.push(...cardSuitCount);
      }
      // for full house
      if (
        combination.three.cards.length > 0 &&
        combination.pair.cards.length > 0
      ) {
        combination.fullHouse.cards[0].push(...combination.three.cards);
        combination.fullHouse.cards[1].push(...combination.pair.cards);
      }
      // for straight flush
      if (cardSuitCount.length === 5 && cardValueQueue.length === 5) {
        combination.straightFlush.cards.push(...cardValueQueue);
      }

      //Royal flush
      if (
        cardSuitCount.length === 5 &&
        cardValueQueue.length === 5 &&
        cardValueQueue[0].cardValue === 10
      ) {
        combination.royalFlush.cards.push(...cardValueQueue);
      }

      // rest card
      // pair
      if (combination.pair.cards.length !== 0) {
        combination.pair.restCard.push(
          ...combination.highCard.cards.filter((card) => {
            return !combination.pair.cards.includes(card);
          })
        );
      }

      // two pair
      if (combination.twoPair.cards[1].length !== 0) {
        combination.twoPair.restCard.push(
          ...combination.highCard.cards.filter((card) => {
            return ![
              ...combination.twoPair.cards[0],
              ...combination.twoPair.cards[1],
            ].includes(card);
          })
        );
      } else {
        combination.twoPair.cards[0].length = 0;
      }

      // three
      if (combination.three.cards.length !== 0) {
        combination.three.restCard.push(
          ...combination.highCard.cards.filter((card) => {
            return !combination.three.cards.includes(card);
          })
        );
      }
      //quads
      if (combination.quads.cards.length !== 0) {
        combination.quads.restCard.push(
          ...combination.highCard.cards.filter((card) => {
            return !combination.quads.cards.includes(card);
          })
        );
      }

      return combination;
    }

    // function winer
    function winner(players) {
      const winnerPlayer = [];
      let winnerCombination = ``;
      // hight cards
      const tempPlayers = [...players];

      let indexLastCards = 4;
      const winnerHightCards = (players, index) => {
        const playerMaxCard = players.reduce((acc, player) => {
          if (acc.length === 0) {
            acc.push(player);
          } else if (
            acc[0].combination.highCard.cards[index].cardValue <
            player.combination.highCard.cards[index].cardValue
          ) {
            acc.length = 0;
            acc.push(player);
          } else if (
            acc[0].combination.highCard.cards[index].cardValue ===
            player.combination.highCard.cards[index].cardValue
          ) {
            acc.push(player);
          }

          return acc;
        }, []);

        if (index === 0 || playerMaxCard.length === 1) {
          return playerMaxCard;
        } else {
          index--;
          return winnerHightCards(playerMaxCard, index);
        }
      };

      const winnerPairCards = (players) => {
        const winnerPlayerPairCard = players.reduce((acc, player) => {
          if (acc.length === 0) {
            acc.push(player);
          } else if (
            acc[0].combination.pair.cards[0].cardValue <
            player.combination.pair.cards[0].cardValue
          ) {
            acc.length = 0;
            acc.push(player);
          } else if (
            acc[0].combination.pair.cards[0].cardValue ===
            player.combination.pair.cards[0].cardValue
          ) {
            acc.push(player);
          }
          return acc;
        }, []);
        return winnerPlayerPairCard;
      };
      const winnerTwoPairCards = (players) => {
        const winnerPlayerTwoPairCard = players.reduce((acc, player) => {
          if (acc.length === 0) {
            acc.push(player);
          } else if (
            acc[0].combination.twoPair.cards[1][0].cardValue <
            player.combination.twoPair.cards[1][0].cardValue
          ) {
            acc.length = 0;
            acc.push(player);
          } else if (
            acc[0].combination.twoPair.cards[1][0].cardValue ===
            player.combination.twoPair.cards[1][0].cardValue
          ) {
            acc.push(player);
          }

          return acc;
        }, []);

        if (winnerPlayerTwoPairCard.length > 1) {
          return winnerPlayerTwoPairCard.reduce((acc, player) => {
            if (acc.length === 0) {
              acc.push(player);
            } else if (
              acc[0].combination.twoPair.cards[0][0].cardValue <
              player.combination.twoPair.cards[0][0].cardValue
            ) {
              acc.length = 0;
              acc.push(player);
            } else if (
              acc[0].combination.twoPair.cards[0][0].cardValue ===
              player.combination.twoPair.cards[0][0].cardValue
            ) {
              acc.push(player);
            }
            return acc;
          }, []);
        } else {
          return winnerPlayerTwoPairCard;
        }
      };

      const winnerThreeCards = (players) => {
        const winnerPlayer = players.reduce((acc, player) => {
          if (acc.length === 0) {
            acc.push(player);
          } else if (
            acc[0].combination.three.cards[0].cardValue <
            player.combination.three.cards[0].cardValue
          ) {
            acc.length = 0;
            acc.push(player);
          } else if (
            acc[0].combination.three.cards[0].cardValue ===
            player.combination.three.cards[0].cardValue
          ) {
            acc.push(player);
          }
          return acc;
        }, []);

        return winnerPlayer;
      };

      function winnerStraightCards(players) {
        const playerWinStraight = players.reduce((acc, player) => {
          if (acc.length === 0) {
            acc.push(player);
          } else if (
            acc[0].combination.straight.cards[4].cardValue <
            player.combination.straight.cards[4].cardValue
          ) {
            acc.length = 0;
            acc.push(player);
          } else if (
            acc[0].combination.straight.cards[4].cardValue ===
            player.combination.straight.cards[4].cardValue
          ) {
            acc.push(player);
          }
          return acc;
        }, []);
        return playerWinStraight;
      }

      function winnerFlushCards(players) {
        let flushIndex = 4;
        const winner = (players, index) => {
          const playerStrongFlushCard = players.reduce((acc, player) => {
            if (acc.length === 0) {
              acc.push(player);
            } else if (
              acc[0].combination.flush.cards[index].cardValue <
              player.combination.flush.cards[index].cardValue
            ) {
              acc.length = 0;
              acc.push(player);
            } else if (
              acc[0].combination.flush.cards[index].cardValue ===
              player.combination.flush.cards[index].cardValue
            ) {
              acc.push(player);
            }
            return acc;
          }, []);

          if (index === 0 || playerStrongFlushCard.length === 1) {
            return playerStrongFlushCard;
          } else {
            index--;
            return winner(playerStrongFlushCard, index);
          }
        };

        return winner(players, flushIndex);
      }

      function winnerFullhouseCards(players) {
        const winnerFullhouse = players.reduce((acc, player) => {
          if (acc.length === 0) {
            acc.push(player);
          } else if (
            acc[0].combination.fullHouse.cards[0][0].cardValue <
            player.combination.fullHouse.cards[0][0].cardValue
          ) {
            acc.length = 0;
            acc.push(player);
          } else if (
            acc[0].combination.fullHouse.cards[0][0].cardValue ===
            player.combination.fullHouse.cards[0][0].cardValue
          ) {
            acc.push(player);
          }
          return acc;
        }, []);

        if (winnerFullhouse.length > 1) {
          return winnerFullhouse.reduce((acc, player) => {
            if (acc.length === 0) {
              acc.push(player);
            } else if (
              acc[0].combination.fullHouse.cards[1][0].cardValue <
              player.combination.fullHouse.cards[1][0].cardValue
            ) {
              acc.length = 0;
              acc.push(player);
            } else if (
              acc[0].combination.fullHouse.cards[1][0].cardValue ===
              player.combination.fullHouse.cards[1][0].cardValue
            ) {
              acc.push(player);
            }
            return acc;
          }, []);
        } else {
          return winnerFullhouse;
        }
      }
      function winnerQuadsCards(players) {
        const winnerQuadsPlayer = players.reduce((acc, player) => {
          if (acc.length === 0) {
            acc.push(player);
          } else if (
            acc[0].combination.quads.cards[0].cardValue <
            player.combination.quads.cards[0].cardValue
          ) {
            console.log("if less");
            acc.length = 0;
            acc.push(player);
          } else if (
            acc[0].combination.quads.cards[0].cardValue ===
            player.combination.quads.cards[0].cardValue
          ) {
            acc.push(player);
          }
          return acc;
        }, []);
        return winnerQuadsPlayer;
      }

      function winnerStraightFlush(players) {
        const winnerStraightFlushPlayer = players.reduce((acc, player) => {
          if (acc.length === 0) {
            acc.push(player);
          } else if (
            acc[0].combination.straightFlush.cards[0].cardValue <
            player.combination.straightFlush.cards[0].cardValue
          ) {
            acc.length = 0;
            acc.push(player);
          } else if (
            acc[0].combination.straightFlush.cards[0].cardValue ===
            player.combination.straightFlush.cards[0].cardValue
          ) {
            acc.push(player);
          }
          return acc;
        }, []);

        return winnerStraightFlushPlayer;
      }

      winnerPlayer.push(...winnerHightCards(tempPlayers, indexLastCards));
      winnerCombination = "highCard";

      // filter pair
      const playerPairFilter = tempPlayers.filter((player) => {
        if (player.combination.pair.cards.length !== 0) return player;
      });
      if (playerPairFilter.length !== 0) {
        winnerPlayer.length = 0;
        winnerPlayer.push(...winnerPairCards(playerPairFilter));
        winnerCombination = "pair";
      }

      // filter two pair
      const playerTwoFilter = tempPlayers.filter((player) => {
        if (
          player.combination.twoPair.cards[0].length !== 0 &&
          player.combination.twoPair.cards[1].length !== 0
        ) {
          return player;
        }
      });
      if (playerTwoFilter.length !== 0) {
        winnerPlayer.length = 0;
        winnerPlayer.push(...winnerTwoPairCards(playerTwoFilter));
        winnerCombination = "twoPair";
      }

      // filter three cards
      const playerThreeCards = tempPlayers.filter((player) => {
        if (player.combination.three.cards.length !== 0) {
          return player;
        }
      });

      if (playerThreeCards.length !== 0) {
        winnerPlayer.length = 0;
        winnerPlayer.push(...winnerThreeCards(playerThreeCards));
        winnerCombination = "three";
      }

      //filter Straight
      const playerStraightCards = tempPlayers.filter((player) => {
        if (player.combination.straight.cards.length !== 0) {
          return player;
        }
      });
      if (playerStraightCards.length !== 0) {
        winnerPlayer.length = 0;
        winnerPlayer.push(...winnerStraightCards(playerStraightCards));
        winnerCombination = "straight";
      }

      // filter flush
      const playerFlushCards = tempPlayers.filter((player) => {
        if (player.combination.flush.cards.length !== 0) {
          return player;
        }
      });
      if (playerFlushCards.length !== 0) {
        winnerPlayer.length = 0;
        winnerPlayer.push(...winnerFlushCards(playerFlushCards));
        winnerCombination = "flush";
      }

      // filter full house
      const playerFullhouse = tempPlayers.filter((player) => {
        if (
          player.combination.fullHouse.cards[0].length !== 0 &&
          player.combination.fullHouse.cards[1].length !== 0
        ) {
          return player;
        }
      });
      if (playerFullhouse.length !== 0) {
        winnerPlayer.length = 0;
        winnerPlayer.push(...winnerFullhouseCards(playerFullhouse));
        winnerCombination = "fullHouse";
      }

      // filter quads
      const playerQuads = tempPlayers.filter((player) => {
        if (player.combination.quads.cards.length !== 0) {
          return player;
        }
      });
      if (playerQuads.length !== 0) {
        winnerPlayer.length = 0;
        winnerPlayer.push(...winnerQuadsCards(playerQuads));
        winnerCombination = "quads";
      }

      // filter straight flush
      const playerStraightFlush = tempPlayers.filter((player) => {
        if (player.combination.straightFlush.cards.length !== 0) {
          return player;
        }
      });
      if (playerStraightFlush.length !== 0) {
        winnerPlayer.length = 0;
        winnerPlayer.push(...winnerStraightFlush(playerStraightFlush));
        winnerCombination = "straightFlush";
      }

      // filter royal flush
      const playerRoyalFlush = tempPlayers.filter((player) => {
        if (player.combination.royalFlush.cards.length !== 0) {
          return player;
        }
      });
      if (playerRoyalFlush.length !== 0) {
        winnerPlayer.length = 0;
        winnerPlayer.push(...playerRoyalFlush);
        winnerCombination = "royalFlush";
      }
      return { winner: winnerPlayer, winCombination: winnerCombination };
    }
    this.players.forEach((player, index) => {
      this.players[index].combination = { ...countCard(player.handCards) };
    });
    this.winner = winner(this.players);
  };
  this.players = players;
  this.deck = deck;
}

const game = new Poker(["Name", "Name2", "Name3", "Name4", "Name5"]);
checkSequence.call(game);
checkFlush.call(game);
