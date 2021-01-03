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

// start adding your code the app starting here
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
   </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//notes - calculate total and print the balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

//notes calcDisplaySummary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    //in
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  //out
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  // interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//notes- create user function with
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase() //returns a string to can use split
      .split(' ') //returns an array so can use map next
      .map(name => name[0]) //returns an array so join can be used
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

const upDateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display Balance
  calcDisplayBalance(acc);
  //Display Summary
  calcDisplaySummary(acc);
};
// console.log(createUsernames('stevie ray vaughn'));

/*
const username = user
  .toLowerCase()//returns a string to can use split
  .split(' ')//returns an array so can use map next
  .map(name => name[0])//returns an array so join can be used
  .join('');

console.log(username);
*/
//notes - Event Handlers
let currentAccount; //define outside the function because we will need it later
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // get pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('login');
    //display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //update UI
    upDateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // clear inputs
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('Transfer Valid');
    //doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //update UI
    upDateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //clear fields
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);

    //delete account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// tutorial array practice, will comment out all to start te app

/*

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

*/

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

/*
cash.forEach((displayCash, index, cash) => {
  displayCash > 0
    ? console.log(`${index}: You have ${displayCash} dollars in your account`)
    : console.log(
        `${index}: You have withdrawn ${Math.abs(displayCash)} dollars`
      );
});
*/
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

/*
//Maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//Using forEach
// value, key/index, whole Map object
// same as the 3 paramters when looping an array-current element of the array,index, the entire array
currencies.forEach(function (value, key, map) {
  // console.log(value, key, map);
  console.log(`${key} ${value} ${map}`);
});

*/

/*
//Sets
// the _  is a throw away variable (placeholder or unnessary)
const currenciesUnique = new Set(['USD', 'EUR', 'CDA', 'USD']);
console.log(currenciesUnique);

// a set doesn't have a key only value, you should omit the second argument.JS kept the parameters the same for sets and arrays.Use an _ as a throw away variables as convention
currenciesUnique.forEach((value, _, map) => {
  console.log(value, _, map);
});
*/

//notes coding challenge
/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1); //stars from zero and splices 1
  dogsJuliaCorrected.splice(-2); //starts from end and splices 2
  // console.log(dogsJuliaCorrected);

  const dogs = dogsJuliaCorrected.concat(dogsKate);
  // console.log(dogs);
  //loop
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(
        `Dog number ${i + 1} is an 🐕 adult and is ${dog} years old.`
      );
    } else {
      console.log(`Dog number ${i + 1} is a 🐩 puppy.`);
    }
  });
};

checkDogs([3, 5, 2, 7, 12], [4, 1, 15, 8, 3]);
checkDogs([1, 6, 3, 12, 2], [1, 4, 15, 23, 3]);

*/
//lectures - map 147
//notes - convert EU to US dollars. store the new array into a variable
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurtoUSD = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurtoUSD;
// });
*/
//notes - change to an arrow function
/*
const movementsUSD = movements.map(mov => mov * eurtoUSD);
console.log(movements);
console.log(movementsUSD);
*/
//notes - more practice with map. Map also has acsess to the current index and the whole array - like forEach
/*
const movementsDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${mov}`;
  }
});

console.log(movementsDescriptions);
*/

//notes simplfy the if to ternary operator - can omit the arr(don't need to return the whole array for this example)
/*
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`

  // if (mov > 0) {
  //   return `Movement ${i + 1}: You deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1}: You withdrew ${mov}`;
  // }
);

console.log(movementsDescriptions);
*/
//lectures - filter method 149
//notes - returns a boolean for the condition and oly display the values that are true
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);
//notes- using a forOf loop to do the same thing

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// const withdrawal = movements.filter(function (withdrew) {
//   return withdrew < 0;
// });
// console.log(withdrawal);

//notes as an arrow function

const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);
*/
//lectures - reduce method
//notes - to boild down all elements to in an array to one value.
//notes - along with acc,cur,i,arr  it has a second parameter (the initial value of the acc, which here we set to 0)want start adding at 0
/*
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i} ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

//notes - arrow function

const balance2 = movements.reduce((acc, cur, i, arr) => acc + cur, 0);
console.log(balance2);

//notes - for loop
let balance3 = 0;
for (const mov2 of movements) {
  balance3 += mov2;
}
console.log(balance3);
*/

//notes - other uses for the reduce method - maximum value there are msny others like string, object etc
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
*/
//lectures - coding challenge 151
/*
const dogAgeHumanYears = function (ages) {
  //map
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  //filter
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges, adults);
  // get avg reduce
  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  console.log(average);
  return average;
};

const avg1 = dogAgeHumanYears([5, 2, 4, 1, 15, 8, 3]);
const avg2 = dogAgeHumanYears([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1);
console.log(avg2);
*/
//lectures 152 chaining
//notes PIPELINE - you cam chain as long as the method returns an array. The reduce only returns a value so you can't chain after it.
//notes can be hard to debug, if you want to debug expand the arrow and call the third parmeter ARR this will display what is ging on at that step of the pipeline
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSD = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
*/
//lectures  coding <challenge 3 #153
/*
const dogAgeHumanYears2 = function (ages) {
  //map
  const humanAges2 = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr);
};

const avg3 = dogAgeHumanYears([5, 2, 4, 1, 15, 8, 3]);
const avg4 = dogAgeHumanYears([16, 6, 10, 5, 6, 1, 4]);

console.log(dogAgeHumanYears);

console.log(avg3);
console.log(avg4);
*/
// lectures - find method
/*
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
