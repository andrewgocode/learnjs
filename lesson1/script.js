// 2
let money = prompt("Ваш бюджет на месяц?", "");
let timeData = prompt("Введите дату в формате 'YYYY-MM-DD.'");

// 3
let appData = {
    money: money,
    timeData: timeData,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

// 4
for (let i = 1; i < 3; i++){
    let mandatoryExpence = prompt("Введите обязательную статью расходов в этом месяце (" + i + ")", "");
    let neededMoney = prompt("Во сколько обойдется?");
    appData.expenses[mandatoryExpence] = neededMoney;
}

// 5
alert("Бюджет на 1 день: " + money / 30);

console.log(appData);





