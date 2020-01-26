//1
let menuItems = document.querySelectorAll(".menu-item");
let menuItem1 = menuItems[1];
let menuItem2 = menuItems[2];
let menuItem3 = menuItems[3];
let menu = document.querySelector(".menu");

menu.replaceChild(menuItem2, menuItem1);
menu.insertBefore(menuItem1, menuItem3);

//2
document.body.style.backgroundImage = 'url("img/apple_true.jpg")';

//3
let title = document.getElementById("title");
title.innerText = "Мы продаем только подлинную технику Apple";

//4
let adv = document.querySelector(".column .adv");
// adv.remove();

let advParent = document.querySelectorAll(".column")[1];
advParent.removeChild(adv);

//5
let userResponse = prompt("Ваше отношение к технике apple");
document.getElementById("prompt").innerText = userResponse;