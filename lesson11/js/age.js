let age = document.getElementById("age")
function showUser(surname, name) {
    console.log(this)
    alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

showUser.call(age, "Иванов", "Иван");
