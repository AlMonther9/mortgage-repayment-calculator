const defaultText = document.getElementById("default-text");
const calculationsContainer = document.getElementById("calculations-container");

document.querySelectorAll(".mortgage-type").forEach((input) => {
  input.addEventListener("change", function () {
    document.querySelectorAll(".radio-inputs").forEach((div) => {
      div.classList.remove("selected");
    });
    if (this.checked) {
      this.parentElement.classList.add("selected");
    }
  });
});
// Function to change styles
const changeStyles = (elementClass, elementId) => {
  document.getElementsByClassName(elementClass)[0].style.backgroundColor = "yellow";
  const element = document.getElementById(elementId);
  if (element) {
    element.style.backgroundColor = "yellow";
  }
};

// Function to reset styles
const resetStyles = (elementClass, elementId) => {
  document.getElementsByClassName(elementClass)[0].style.backgroundColor = "";
  const element = document.getElementById(elementId);
  if (element) {
    element.style.backgroundColor = "";
  }
};

// Function to toggle styles
const toggleStyles = (elementClass, elementId) => {
  if (document.getElementsByClassName(elementClass)[0].style.backgroundColor !== "yellow") {
    changeStyles(elementClass, elementId);
  } else {
    resetStyles(elementClass, elementId);
  }
};

// Adding event listeners
document.getElementById("mortgage-amount-main").addEventListener("click", () => {
  toggleStyles("amount", "amount");
});

document.getElementById("mortgage-term-main").addEventListener("click", () => {
  toggleStyles("years", "years");
});

document.getElementById("interest-rate-main").addEventListener("click", () => {
  toggleStyles("persentage", "persentage");
});
document.getElementById("calculate-btn").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("mortgage-amount").value);
  const term = parseFloat(document.getElementById("mortgage-term").value);
  const rate = parseFloat(document.getElementById("interest-rate").value) / 100;
  const mortgageType = document.querySelector(
    'input[name="mortgage-type"]:checked'
  );

  console.log(
    `amount: ${amount}, term: ${term}, rate: ${rate}, mortgageType: ${
      mortgageType ? mortgageType.value : "none"
    }`
  );

  let isValid = true;
  document.querySelectorAll(".form-flex").forEach((el) => {
    el.classList.remove("error");
  });

  if (isNaN(amount) || amount <= 0) {
    document.getElementById("amount-alert").style.display = "block";
    document.getElementById("mortgage-amount-main").classList.add("error");
    document.getElementById("mortgage-amount-main").style.border =
      "1px solid red";
    document.getElementsByClassName("amount")[0].style.backgroundColor = "red";
    document.getElementsByClassName("amount")[0].style.color = "white";

    document.getElementById("amount").style.backgroundColor = "red";

    isValid = false;
  } else {
    document.getElementById("amount-alert").style.display = "none";
  }

  if (isNaN(term) || term <= 0) {
    document.getElementById("term-alert").style.display = "block";
    document.getElementById("mortgage-term-main").classList.add("error");
    document.getElementById("mortgage-term-main").style.border =
      "1px solid red";
    document.getElementsByClassName("years")[0].style.backgroundColor = "red";
    document.getElementById("years").style.backgroundColor = "red";

    isValid = false;
  } else {
    document.getElementById("term-alert").style.display = "none";
  }

  if (isNaN(rate) || rate <= 0) {
    document.getElementById("rate-alert").style.display = "block";
    document.getElementById("interest-rate-main").style.border =
      "1px solid red";
    document.getElementsByClassName("persentage")[0].style.backgroundColor =
      "red";
    document.getElementById("persentage").style.backgroundColor = "red";

    document.getElementById("interest-rate-main").classList.add("error");
    isValid = false;
  } else {
    document.getElementById("rate-alert").style.display = "none";
  }

  if (!mortgageType) {
    document.getElementById("type-alert").style.display = "block";
    document.querySelectorAll(".radio-inputs").forEach((el) => {
      el.classList.add("error");
    });
    isValid = false;
  } else {
    document.getElementById("type-alert").style.display = "none";
    document.querySelectorAll(".radio-inputs").forEach((el) => {
      el.classList.remove("error");
    });
  }

  if (isValid) {
    let monthlyPayment = 0;
    let totalRepayment = 0;
    document.getElementsByClassName(
      "calculations-container"
    )[0].style.textAlign = "left";
    if (mortgageType.value === "repayment") {
      const monthlyRate = rate / 12;
      const n = term * 12;
      monthlyPayment =
        (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
      totalRepayment = monthlyPayment * n;
    } else if (mortgageType.value === "interest-only") {
      monthlyPayment = (amount * rate) / 12;
      totalRepayment = monthlyPayment * term * 12;
    }

    document.getElementById("result").innerText = `£${monthlyPayment.toFixed(
      2
    )}`;
    document.getElementById(
      "term-result"
    ).innerText = `£${totalRepayment.toFixed(2)}`;
    document.getElementById("default-text").hidden = true;
    document.getElementById("calculations-container").hidden = false;
  } else {
    document.getElementById("result").innerText = "";
    document.getElementById("term-result").innerText = "";
  }
});

document.getElementById("clear-btn").addEventListener("click", () => {
  document.getElementById("mortgage-form").reset();
  document.getElementById("result").innerText = "";
  document.getElementById("term-result").innerText = "";
  document.querySelectorAll(".form-alert").forEach((alert) => {
    alert.style.display = "none";
  });

  document.getElementById("default-text").hidden = false;
  document.getElementById("calculations-container").hidden = true;

  document.querySelectorAll(".radio-inputs").forEach((div) => {
    div.classList.remove("selected");
  });

  document.querySelectorAll(".form-flex").forEach((el) => {
    el.classList.remove("error");
  });
});

document.querySelectorAll(".form-alert").forEach((alert) => {
  alert.style.display = "none";
});