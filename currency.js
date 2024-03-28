let api = "https://v6.exchangerate-api.com/v6/b7a600aaac78c760fa3fd000/latest/USD";
let fromCurrencyDropDown = document.getElementById("from-currency");
let toCurrencyDropdown = document.getElementById("to-currency");
let op = document.getElementById("op");

 function populateCurrencyDropdowns() {
    let CurrencyArr = ["AED", "EUR", "LKR", "PKR", "USD","INR"];
    CurrencyArr.forEach((currency) => {
        let option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrencyDropDown.appendChild(option1);

        let option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrencyDropdown.appendChild(option2);
    });
}

populateCurrencyDropdowns();

function convertCurrency() {
    fetch(api)
        .then((response) => response.json())
        .then((data) => {
            let fromCurrency = fromCurrencyDropDown.value;
            let toCurrency = toCurrencyDropdown.value;

            let fromCurrentRate = data.conversion_rates[fromCurrency];
            let toCurrentRate = data.conversion_rates[toCurrency];

            let amount = document.getElementById("amount").value;
            if (amount != "") {
                let convertedAmount = (amount / fromCurrentRate) * toCurrentRate;

                op.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            } else {
                alert("Enter an amount");
            }
        })
        .catch(error => console.log(error));
}

function clearVal() {
    document.getElementById("amount").value = "";
    op.innerHTML = "";
}