
let money;
let timeData;

function start() {
    money = +prompt("Ваш бюджет на месяц?", "");
    timeData = prompt("Введите дату в формате 'YYYY-MM-DD.'");
    while(isNaN(money) || money === '' || money === null){
        money = +prompt("Ваш бюджет на месяц?", "");
    }
}

// start();

let appData = {
    budget: money,
    timeData: timeData,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function() {
        for (i = 1; i < 3; i++){
            let mandatoryExpence = prompt("Введите обязательную статью расходов в этом месяце (" + i + ")", "");
            let neededMoney = prompt("Во сколько обойдется?");
            
            if (typeof(mandatoryExpence) === 'string' && 
            mandatoryExpence !== null &&
            neededMoney !== null &&
            mandatoryExpence.length < 100
            ){
                console.log("done");
                appData.expenses[mandatoryExpence] = neededMoney;
                
            } else {
                console.log("again");
                i--;
            }
        }
    },
    detectDayBudget: function(){
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert("Ежедневный бюдежет: " + appData.moneyPerDay);
    },
    detectLevel: function(){
        if (appData.moneyPerDay < 100){
            console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay  < 2000){
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay  < 2000){
            console.log("Высокий уровень достатка");
        } else {
            console.log("Произошла ошибка");
        }
    },
    checkSavings: function(){
        if (appData.savings){
            let save = +prompt("Какова сумма накоплений?");
            let percent = +prompt("Под какой процент?");
    
            let monthIncome = save / 12 / percent / 100;
            appData.monthIncome = monthIncome;
            alert("Доход по депозиту составляет " + appData.monthIncome + " в месяц.");
        }
    },
    chooseOptExpenses: function(){
        for(let i = 1; i < 4; i++){
            let optionalExpence = prompt("Статья необязательных расходов? (" + i + ")");
            appData.optionalExpenses[i] = optionalExpence;
        }
    },
    chooseIncome: function(){
        let items = askQuestionWithCorrectAnswer(() => prompt("Что принесет дополнительный доход? (через запятую)"));
        appData.income = items.split(", ");
        let item = askQuestionWithCorrectAnswer(() => prompt("Может быть что-то еще?"));
        appData.income.push(item);
        appData.income.sort();

        let incomeList = "Способы доп. заработка: ";
        appData.income.forEach((element, index) => {
            incomeList += (index + 1) + ") " + element + "; ";
        });
        alert(incomeList);
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

console.log("Наша программа включает в себя данные: ");
for (let item in appData){
    console.log(item + " : " + appData[item]);
}
