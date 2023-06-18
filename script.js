function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

const DEFAULT_DISPLAY = "0";
const calcState = {
  currentVal: null,
  previousVal: null,
  lastButton: null,
}
let current = null;
let previous = null;

display(DEFAULT_DISPLAY);

function operate(a, b, op) {
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
const clearButton = $("#clear");
const operations = $$(".op");
const equalsSign = $(".eq");

clearButton.addEventListener("click", e => {
  previous = null;
  current = null;
  display(DEFAULT_DISPLAY);
});

operations.forEach(o => {
  o.addEventListener('click', e => {
    const op = e.target.dataset.op;
    if (previous) {
      console.log(operate(previous, current, op));
      const res = operate(previous, current, op);
      current = res.toString();
      display(current);
      previous = current;
      current = null;
    } else {
      previous = current;
      current = null;
    }
  })
});

numbers.forEach(n =>
  n.addEventListener("click", e => {
    let n = e.target.dataset.number;

    switch (n) {
      case ".":
        if (current && current.includes(".")) {
          return;
        }
        if (!current) {
          current = "0" + n;
          break;
        }
      case "00":
      case "0":
        if (!current) {
          return;
        }
        current += n;
        break;
      default:
        if (!current) {
          current = n;
          break;
        }
        current += n;
    }
    display(current);
  })
);
