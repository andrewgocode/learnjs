
let money = +prompt("Ваш бюджет на месяц?", "");
let timeData = prompt("Введите дату в формате 'YYYY-MM-DD.'");

let appData = {
    budget: money,
    timeData: timeData,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

let i = 1;
// while(i < 3){
// for (i = 1; i < 3;){
do{
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
    i++;
}while(i < 3);

appData.moneyPerDay = appData.budget / 30;

alert("Ежедневный бюдежет: " + appData.moneyPerDay);

if (appData.moneyPerDay < 100){
    console.log("Минимальный уровень достатка");
} else if (appData.moneyPerDay >= 100 && appData.moneyPerDay  < 2000){
    console.log("Средний уровень достатка");
} else if (appData.moneyPerDay >= 100 && appData.moneyPerDay  < 2000){
    console.log("Высокий уровень достатка");
} else {
    console.log("Произошла ошибка");
}


console.log(appData.moneyPerDay >= 2000);





