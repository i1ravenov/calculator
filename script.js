function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

const DEFAULT_DISPLAY = "0";

const calcState = {
  cur: null,
  prev: null,
  lastOp: null,
}

display(DEFAULT_DISPLAY);

function operate(a, b, op) {
  a = +a;
  b = +b;
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
}

function display(n) {
  const res = $(".calc-res");
  res.textContent = n;
}

const numbers = $$(".n");
const operations = $$(".op");
const equalsButton = $(".eq");
const clearButton = $("#clear");
const signButton = $("#sign");
const percentButton = $("#percent");

percentButton.addEventListener("click", e => {
  if (calcState.cur && calcState.prev) {
    const a = calcState.prev;
    const b = calcState.cur;
    let res;
    switch (calcState.lastOp) {
      case "+":
      case "-":
        res = operate(a, a / 100 * b, calcState.lastOp);
        break;
      case "*":
      case "/":
        res = operate(a, b / 100, calcState.lastOp);
        break;
    }
    calcState.prev = res;
    calcState.cur = null;
    display(res);
  }
});

signButton.addEventListener("click", e => {
  if (calcState.cur) {
    calcState.cur = (- +calcState.cur).toString();
    display(calcState.cur);
  }
});

equalsButton.addEventListener("click", e => {
  if (calcState.prev && calcState.cur) {
    calcState.cur = operate(calcState.prev, calcState.cur, calcState.lastOp);
    display(calcState.cur);
    calcState.prev = null;
    calcState.lastOp = null;
  }
});

clearButton.addEventListener("click", e => {
  calcState.prev = null;
  calcState.cur = null;
  calcState.lastOp = null;
  display(DEFAULT_DISPLAY);
});

operations.forEach(o => {
  o.addEventListener('click', e => {
    const op = e.target.dataset.op;
    if (!calcState.cur) {
      calcState.lastOp = op;
      return;
    }
    if (calcState.prev && calcState.cur) {
      const res = operate(calcState.prev, calcState.cur, calcState.lastOp);
      calcState.cur = res.toString();
      display(calcState.cur);
    }
    calcState.lastOp = op;
    calcState.prev = calcState.cur;
    calcState.cur = null;
  })
});

function isInitialState(state) {
  return !state.cur || state.cur === "0";
}

numbers.forEach(n =>
  n.addEventListener("click", e => {
    let n = e.target.dataset.number;

    switch (n) {
      case ".":
        if (calcState.cur && calcState.cur.includes(".")) {
          return;
        }
        if (isInitialState(calcState)) {
          calcState.cur = "0" + n;
          break;
        }
      case "00":
      case "0":
        if (isInitialState(calcState)) {
          calcState.cur = "0";
          break;
        }
        calcState.cur += n;
        break;
      default:
        if (isInitialState(calcState)) {
          calcState.cur = n;
          break;
        }
        calcState.cur += n;

    }
    display(calcState.cur);
  })
);
