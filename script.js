'use strict';






/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


let array = ['a', 'b', 'c', 'd', 'e'];

console.log(array.slice(2));

// the last is not outputted
console.log(array.slice(2, 5));

//-1 gets the last 
console.log(array.slice(-1));

//starts at 2 and ommits and excludes the last two
console.log(array.slice(1, -2));



// for loop

const cash = [120, 44, -90, -36, 789, 655];
/*
for (const cashOutput of cash) {
  if (cashOutput > 0) {
    console.log(`You have ${cashOutput} dollars in your account`);
  } else {
    console.log(`You have withdrawn ${Math.abs(cashOutput)} dollars`)
  }
};
*/

// forEach
//you can't breakout, goes through all. If you must break somewhere in a loop youmust use the for of loop. But other than that it is up to you which loop you wqant to use

cash.forEach((displayCash, index, cash) => {
  displayCash > 0 ? console.log(`${index}: You have ${displayCash} dollars in your account`) : console.log(`${index}: You have withdrawn ${Math.abs(displayCash)} dollars`);

})

/*

// slice doesn't mutate the array - doesn't change the original
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// you can create a shallow copy by using the slice with no arguments and also by the spread operator - up to you
// the only time you want to use the slice is to chain mutiple methods together
console.log(arr.slice());
console.log([...arr]);

//SPLICE - it mutates the array - it changes the original. This is why we use it. We want to delete a few elements etc
console.log(arr.splice(-1));
console.log(arr.splice(1, 2)); // start at 1 and remove 2 elements

console.log(arr); // now only a, d remain

//Reverse - it mutated the origianal array

const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

//concat - concat 2 arrays - up to you which you want to use
const letters = arr.concat(arr2); //doesn't mutate
console.log(letters);
console.log([...arr, ...arr2]); //same result - doesn't mutate

//Join - seperates and adds a seperator that you specify between each element
console.log(letters.join('  🍇 '));


*/

//Maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (countryMoney, value, map) {
  console.log(countryMoney, value, map);
});

//Sets
// the _  is a throw away variable (placeholder or unnessary)
const currenciesUnique = new Set(['USD', 'EUR', 'CDA', 'USD']);
console.log(currenciesUnique);

currenciesUnique.forEach((value, _, map) => {
  console.log(value, _, map);
});
