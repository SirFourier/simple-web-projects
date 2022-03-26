// calculator logic

// update the value displayed on the screen element
updateScreen = (string) => {
  document.getElementById("screen").innerHTML = string;
};

// current stored calculation
let calculation = "";

// is there a current operation stored?
let operation = false;

// calculation logic
calculate = () => {
  // calculate and return result
  return String(eval(calculation));
};

// handle clear button
document.getElementById("clear").addEventListener("click", () => {
  calculation = "";
  updateScreen("0");
});

// handle numbered buttons and decimal point
const number_ids = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
number_ids.forEach((id) => {
  document.getElementById(id).addEventListener("click", () => {
    calculation += id;
    updateScreen(calculation);
  });
});

// handle operation buttons
const operation_ids = ["/", "*", "-", "+"];
operation_ids.forEach((id) => {
  document.getElementById(id).addEventListener("click", () => {
    if (!operation) {
      calculation += id;
      updateScreen(calculation);
      operation = true;
    }
  });
});

// handle equals button
document.getElementById("=").addEventListener("click", () => {
  calculation = calculate();
  updateScreen(calculation);
  operation = false;
});
