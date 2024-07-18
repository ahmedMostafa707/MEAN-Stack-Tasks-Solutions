let operation = false;

function addToValues(value) {
  if (operation) {
    document.form.result.value = "";
    operation = false;
  }
  document.form.result.value += value;
}

function addToOperations(value) {
  operation = true;
  document.form.display.value =
    evaluate(document.form.display.value + document.form.result.value) + value;
}

function calculateResult(value) {
  const expression = document.form.display.value + document.form.result.value;
  document.form.display.value += document.form.result.value + value;
  document.form.result.value = evaluate(expression);
}

function clearExpression() {
  document.form.display.value = "";
  document.form.result.value = "";
}

function evaluate(expression) {
  if (expression.includes("+")) {
    let num1 = +expression.slice(0, expression.indexOf("+"));
    let num2 = +expression.slice(expression.indexOf("+") + 1);
    return num1 + num2;
  } else if (expression.includes("-")) {
    let num1 = +expression.slice(0, expression.indexOf("-"));
    let num2 = +expression.slice(expression.indexOf("-") + 1);
    return num1 - num2;
  } else if (expression.includes("*")) {
    let num1 = +expression.slice(0, expression.indexOf("*"));
    let num2 = +expression.slice(expression.indexOf("*") + 1);
    return num1 * num2;
  } else if (expression.includes("/")) {
    let num1 = +expression.slice(0, expression.indexOf("/"));
    let num2 = +expression.slice(expression.indexOf("/") + 1);
    return num1 / num2;
  } else if (expression.includes("=")) {
    let num1 = +expression.slice(0, expression.indexOf("/"));
    let num2 = +expression.slice(expression.indexOf("/") + 1);
    return num1 / num2;
  } else {
    return +expression;
  }
}

let buttons = document.querySelectorAll("#btn");
let clickSound = document.getElementById('click-sound');

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.add("clicked");
    clickSound.currentTime = 0;
    clickSound.play();
    
    setTimeout(function () {
      button.classList.remove("clicked");
    }, 100);
  });
});
