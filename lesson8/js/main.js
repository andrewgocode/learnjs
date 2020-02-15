/*jshint esversion: 6 */

let buttonStart = document.getElementById("start");
let divValueClass = document.querySelectorAll("div[class*='value']")[0];
let inputExpense = document.querySelectorAll(".expenses-item");
let buttonExpense = document.querySelector('.expenses-item-btn');
let inputExpenseTotal = document.querySelector('.expenses-value');
let buttonTag = document.querySelectorAll("button:not(.start)");
let inputOptionalExpense = document.querySelectorAll(".optionalexpenses-item");
let buttonOptionalExpenses = document.querySelector('.optionalexpenses-btn');
let divOptionalExpenses = document.querySelector('.optionalexpenses-value');
let buttonBugetCount = document.querySelector('.count-budget-btn');
let divDayBudget = document.querySelector('.daybudget-value');
let divLevel = document.querySelector('.level-value');
let inputChooseIncome = document.querySelector('.choose-income');
let inputIncomeValue = document.querySelector('.income-value');

let inputProbableExpense = document.querySelector("#income");
let checkSavings = document.querySelector("#savings");
let inputSum = document.querySelector("#sum");
let inputPercent = document.querySelector("#percent");
let inputMonthsavings = document.querySelector('.monthsavings-value');
let inputYearsavings = document.querySelector('.yearsavings-value');

let inputYMD = document.querySelectorAll(".time-data input");


let money;
let timeData;

buttonStart.addEventListener('click', () => {
    timeData = prompt("Введите дату в формате 'YYYY-MM-DD.'");
    money = +prompt("Ваш бюджет на месяц?", "");
   
    while(isNaN(money) || money === '' || money === null){
        money = +prompt("Ваш бюджет на месяц?", "");
    }

    appData.budget = money;
    appData.timeData = timeData;
    divValueClass.textContent = money.toFixed(); 
    
    inputYMD[0].value = new Date(Date.parse(timeData)).getFullYear();
    inputYMD[1].value = new Date(Date.parse(timeData)).getMonth() + 1;
    inputYMD[2].value = new Date(Date.parse(timeData)).getDate();

    changeAbilityForAllButtonsExeptStart(false);
});

buttonExpense.addEventListener('click', () => {
    let sum = 0;

    for (i = 0; i < inputExpense.length; i++){
        let mandatoryExpense = inputExpense[i].value;
        let neededMoney = inputExpense[++i].value;
        
        if (typeof(mandatoryExpense) === 'string' && 
        mandatoryExpense !== null &&
        neededMoney !== null
        ){
            appData.expenses[mandatoryExpense] = neededMoney;
            sum += +neededMoney;
        } else {
            console.log("wrong inputs with index " + i);
        }
    }
    inputExpenseTotal.textContent = sum;    
});

buttonOptionalExpenses.addEventListener('click', () => {
    for(let i = 0; i < inputOptionalExpense.length; i++){
        let optionalExpence = inputOptionalExpense[i].value;
        appData.optionalExpenses[i] = optionalExpence;        
        divOptionalExpenses.textContent += appData.optionalExpenses[i] + ' ';
    }
});

buttonBugetCount.addEventListener('click', () => {
    if (appData.budget !== undefined){        
        let expensesSum = Object.values(appData.expenses).reduce( (a, b) => +a + (+b));

        appData.moneyPerDay = (appData.budget - expensesSum / 30).toFixed();
        divDayBudget.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100){
            divLevel.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay  < 2000){
            divLevel.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay >= 100){
            divLevel.textContent = "Высокий уровень достатка";
        } else {
            divLevel.textContent = "Произошла ошибка";
        }
    } else {
        divDayBudget.textContent  = "Произошла ошибка";
    }    
});

inputChooseIncome.addEventListener('input', () => {
    let items = inputChooseIncome.value;
    appData.income = items.split(", ");
    inputIncomeValue.textContent = appData.income ;
});

checkSavings.addEventListener('click', () => {
    appData.savings = !appData.savings;
});

let calcSavings = () => {
    console.log('calcSavings');
    
    if (appData.savings){
        let sum = +inputSum.value;
        let per = +inputPercent.value;

        appData.monthIncome = (sum / 12 / per / 100);
        appData.yearIncome = (sum / per / 100);

        inputMonthsavings.textContent = appData.monthIncome.toFixed(1);
        inputYearsavings.textContent = appData.yearIncome.toFixed(1);
    }
};

inputSum.addEventListener('input', calcSavings);
inputPercent.addEventListener('input', calcSavings);


let appData = {
    budget: money,
    timeData: timeData,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseIncome: function(){
        // let items = askQuestionWithCorrectAnswer(() => prompt("Что принесет дополнительный доход? (через запятую)"));
        // appData.income = items.split(", ");
        // let item = askQuestionWithCorrectAnswer(() => prompt("Может быть что-то еще?"));
        // appData.income.push(item);
        // appData.income.sort();

        // let incomeList = "Способы доп. заработка: ";
        // appData.income.forEach((element, index) => {
        //     incomeList += (index + 1) + ") " + element + "; ";
        // });
        // alert(incomeList);
    }
};

function askQuestionWithCorrectAnswer (questionFunc){
    while(true){
        let answer = questionFunc();
        if(answer !== null && answer !== '' && typeof(answer) === 'string' ) {
            return answer;
        }
    }
}

// appData.chooseIncome();
// console.log(appData.income);

// console.log("Наша программа включает в себя данные: ");
// for (let item in appData){
    // console.log(item + " : " + appData[item]);
// }

let changeAbilityForAllButtonsExeptStart = (disable = true) => {
    // buttonTag.forEach( (b) => b.disabled = disable );
};

document.addEventListener('DOMContentLoaded', changeAbilityForAllButtonsExeptStart);
