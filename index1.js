"use strict";
const account1 = {
  owner: "Saran Chowdary",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2022-12-28T21:31:17.178Z",
    "2022-12-29T07:42:02.383Z",
    "2022-10-14T09:15:04.904Z",
    "2022-10-01T10:17:24.185Z",
    "2022-10-12T14:11:59.604Z",
    "2022-10-06T17:01:17.194Z",
    "2022-10-09T23:36:17.929Z",
    "2022-10-10T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Rahul Chedella",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-12-28T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-29T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

let username = document.querySelector("#user_name");
let pin = document.querySelector("#pin");
let loginbtn = document.querySelector(".login__btn");

let container = document.querySelector(".container");
let containerMovements = document.querySelector(".container_movements");
let welcomelabel = document.querySelector(".welcome");

let depositbutton = document.querySelector(".deposit_button");
let depositamount = document.querySelector("#deposit_amount");

let transferto = document.querySelector("#transfer_to");
let transferamount = document.querySelector("#transfer_amount");
let transferbtn = document.querySelector(".transfer__btn");

let loanamount = document.querySelector("#loan_amount");
let loanbtn = document.querySelector(".loan__btn");

let confirmuser = document.querySelector("#confirm_user");
let confirmpin = document.querySelector("#confirm_pin");
let closebtn = document.querySelector(".close__btn");

let btnsort = document.querySelector(".sort");
let span = document.querySelector(".tilak");
let labelin = document.querySelector("#span1");
let labelout = document.querySelector("#span2");
let labelinterest = document.querySelector("#span3");
let labelBalance = document.querySelector(".p2");
let main = document.querySelector(".main");
let labeldate = document.querySelector(".p3");
let labeltime = document.querySelector(".nio");
let accounts = [account1, account2];
accounts.forEach(function (val) {
  let x = val.owner.split(" ");

  let newest = x.map(function (val) {
    return val[0].toLowerCase();
  });
  val.user = newest.join("");
});
// displaying movements
let sorted;
let display = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  let mov = sort
    ? acc.movements.slice().sort(function (a, b) {
        if (a - b > 0) {
          return 1;
        } else if (a - b < 0) {
          return -1;
        } else {
          return 0;
        }
      })
    : acc.movements;
  mov.forEach(function (key, i) {
    let p = new Date(acc.movementsDates[i]);
    let q = p.getTime();
    let r = Date.now();
    let s = Math.floor(Math.abs((q - r) / (1000 * 60 * 60 * 24)));

    let t = `${p.getDate()}`.padStart(2, "0");

    let u = `${p.getMonth() + 1}`.padStart(2, "0");
    let v = p.getFullYear();
    let w;

    if (s === 0) {
      w = "today";
    } else if (s === 1) {
      w = "yesterday";
    } else {
      let obj = {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
      };
      w = new Intl.DateTimeFormat(acc.locale, obj).format(
        new Date(acc.movementsDates[i])
      );
    }
    let html = `<div class="${key < 0 ? "withdraw" : "deposit"}">
                            <div class="type">${i + 1} ${
      key < 0 ? "withdraw" : "deposit"
    }</div>
                            <div class="date">${w}</div>
                            <div class="amount">${key.toFixed(2)}$</div>
                          </div>`;
    containerMovements.insertAdjacentHTML("beforeend", html);
  });
};

// sum in function
let anabella;
let semaphore;
let add = function (acc) {
  let sum = 0;
  acc.movements.forEach(function (val) {
    if (val > 0) {
      sum += val;
    }
  });
  labelin.textContent = `${sum.toFixed(2)}$`;
  anabella = labelin.textContent;
};
// out function
let out = function (acc) {
  let sum = 0;
  let x = acc.movements.filter(function (val) {
    return val < 0;
  });
  let y = x.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  sum = y;
  labelout.textContent = `${sum.toFixed(2)}$`;
  semaphore = labelout.textContent;
};
// interest function
let finance = function (acc) {
  let sum = 0;
  let x = acc.movements.filter(function (val) {
    return val > 0;
  });
  let y = x.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  let z = (y * acc.interestRate) / 100;
  labelinterest.textContent = `${z.toFixed(2)}$`;
  let p = Number(labelin.textContent.slice(0, -1)).toFixed(2);
  console.log(p);
  let t = Number(labelout.textContent.slice(0, -1)).toFixed(2);
  console.log(t);
  let resulting = `${(+p + +t).toFixed(2)}$`;
  console.log(resulting, typeof resulting);
  labelBalance.textContent = resulting;
};
// timer
let n = 200;
let timer = function () {
  if (n >= 0) {
    console.log(n);
    let min = (Math.trunc(n / 60) + "").padStart(2, "0");
    let sec = ((n % 60) + "").padStart(2, "0");
    let doherity = `${min}:${sec}`;
    labeltime.textContent = `you will be logged out in ${doherity}`;
  } else {
    main.style.opacity = 0;
    welcomelabel.textContent = "Login to get started";
  }
  n = n - 1;
};
// logging in
let original;
let messi;
let check;
let intervals;
loginbtn.addEventListener("click", function (e) {
  e.preventDefault();
  let x = username.value;
  let z = pin.value;
  let y = accounts.find(function (val) {
    return val.user === x && val.pin === +z;
  });
  username.textContent="";
  pin.textContent="";
  console.log(x, z, y);
  if (y) {
    // implementing timer
    if (intervals) {
      clearInterval(intervals);
      n = 200;
    }
    timer();
    intervals = setInterval(timer, 1000);

    let q = new Date();
    let obj = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    let g = new Intl.DateTimeFormat(y.locale, obj).format(q);
    labeldate.textContent = `As of ${g}`;
    original = y;
    messi = y.movements.slice();
    username.value = pin.value = "";
    username.focus();
    welcomelabel.textContent = `welcome ${y.owner}`;
    display(y);
    add(y);
    out(y);
    finance(y);
    main.style.opacity = 100;
  } else {
    welcomelabel.textContent = "please check your credintials";
  }
});
//deposit button
depositbutton.addEventListener("click", function (e) {
  e.preventDefault();
  if (intervals) {
    clearInterval(intervals);
    n = 200;
  }
  timer();
  intervals = setInterval(timer, 1000);
  let amount = +depositamount.value;
  original.movements.push(amount);
  
  let p = new Date();
  original.movementsDates.push(p.toISOString());
  depositamount.value="";
  console.log(depositamount.value);
  display(original);
  add(original);
  out(original);
  finance(original);
  
});
//  tranfer button
transferbtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (intervals) {
    clearInterval(intervals);
    n = 200;
  }
  timer();
  intervals = setInterval(timer, 1000);
  let x = +transferamount.value;
  let y = transferto.value;
  let k = +labelBalance.textContent.slice(0, -1);
  let z = accounts.find(function (val) {
    return val.user == y;
  });
  transferamount.value="";
  transferto.value="";
  console.log(x, y, z);
  if (z) {
    if (x <= k) {
      let p = new Date();
      z.movementsDates.push(p.toISOString());
      z.movements.push(x);
      original.movementsDates.push(p.toISOString());
      original.movements.push(-x);
      console.log(original);
      display(original);
      add(original);
      out(original);
      finance(original);
      
    } else if (x > k) {
      alert("insufficient balance");
      transferamount.value="";
      transferto.value="";
    } else {
      alert("please check the value");
      transferamount.value="";
      transferto.value="";
    }
  } else {
    alert("please check the credintials");
    transferamount.value="";
    transferto.value="";
  }
  transferto.value="";
  transferamount.value="";
  
});
// loan button
loanbtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (intervals) {
    clearInterval(intervals);
    n = 200;
  }
  timer();
  intervals = setInterval(timer, 1000);
  let x = +loanamount.value;
  let y = original.movements.some(function (val) {
    return val > x * 0.3;
  });

  if (x > 0 && y) {
    let p = new Date();
    original.movementsDates.push(p.toISOString());
    original.movements.push(x);
    display(original);
    add(original);
    out(original);
    finance(original);
    loanamount.value = "";
  } else {
    alert("you are not eligible for loan");
  }
  loanamount.textContent="";
});
// close account option
closebtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (intervals) {
    clearInterval(intervals);
    n = 200;
  }
  let x = confirmuser.value;
  let y = +confirmpin.value;
  if (original.user === x && original.pin === y) {
    alert("are you sure to delete your account");
    confirmpin.value = confirmuser.value = "";
    welcomelabel.textContent = "log in to get started";
    main.style.opacity = 0;
  }
});
sorted = false;
btnsort.addEventListener("click", function (e) {
  e.preventDefault();
  display(original, !sorted);
  sorted = !sorted;
});
