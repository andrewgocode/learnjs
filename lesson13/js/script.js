/*jshint esversion: 6 */

window.addEventListener('DOMContentLoaded', () => {
  

  let infoHeader = document.querySelector('.info-header');
  let infoHeaderTabs = document.querySelectorAll('.info-header-tab');
  let infoTabContent = document.querySelectorAll('.info-tabcontent');

  let hideContent = (n) => {
    for (let i = n; i < infoTabContent.length; i++){
        infoTabContent[i].classList.add('hide');
        infoTabContent[i].classList.remove('show');
    }
  };
  hideContent(1);

  let showContent = (n) => {
        infoTabContent[n].classList.add('show');
        infoTabContent[n].classList.remove('hide');
  };

  infoHeader.addEventListener('click', (e) => {      
    if (e.target && e.target.matches('.info-header-tab')){
        for (let i = 0; i < infoHeaderTabs.length; i++){
            if (infoHeaderTabs[i] === e.target){
                hideContent(0);
                showContent(i);
            }
        }
    }
  });

  let deadLine = '2021-03-01';
  let getTimeRemaining = (endDate) => {
      let timeInMsRem = Date.parse(endDate) - Date.parse(new Date());

      let secondsRem = Math.floor((timeInMsRem / 1000) % 60);
      let minutesRem = Math.floor((timeInMsRem / 1000 / 60) % 60);
      let hoursRem = Math.floor((timeInMsRem / 1000 / 60 / 60) % 24);
      let daysRem = Math.floor(timeInMsRem / 1000 / 60 / 60 / 24);

      return {
        'ms': timeInMsRem,
        'seconds': secondsRem,
        'minutes': minutesRem,
        'hours': hoursRem,
        'days': daysRem
      };
  };

  let setTimer = (idParent, endDate) => {
    let parentElement = document.getElementById(idParent);
    let secondsElement = parentElement.querySelector('.seconds');
    let minutesElement = parentElement.querySelector('.minutes');
    let hoursElement = parentElement.querySelector('.hours');
    let daysElement = parentElement.querySelector('.days');
    
    let updateTimer = () => {
      let nowRemaining = getTimeRemaining(endDate);
      secondsElement.textContent = nowRemaining.seconds > 9 ? nowRemaining.seconds : '0' + nowRemaining.seconds;
      minutesElement.textContent = nowRemaining.minutes > 9 ? nowRemaining.minutes : '0' + nowRemaining.minutes;
      hoursElement.textContent = nowRemaining.hours > 19? nowRemaining.hours : '0' + nowRemaining.hours;
      daysElement.textContent = nowRemaining.days;

      if (nowRemaining.ms <= 0){
        clearInterval(timeInterval);
        secondsElement.textContent = '0';
        minutesElement.textContent = '0';
        hoursElement.textContent = '0';
        daysElement.textContent = '0';
      }
    };
    let timeInterval = setInterval(updateTimer, 1000);
  };

  setTimer('timer', deadLine);

  //modal

  let more = document.querySelector(".more");
  let overlay = document.querySelector(".overlay");
  let close = document.querySelector(".popup-close");

  more.addEventListener("click", function() {
    console.log('modal open');
    
    overlay.style.display = "block";    
    this.classList.add("more-splash");
    document.body.style.overflow = "hidden";
  });

  close.addEventListener("click", () =>{
    overlay.style.display = "none";
    more.classList.remove("more-splash");
    document.body.style.overflow = "";
  });

  let descBtns = document.querySelectorAll(".description-btn");
  descBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      overlay.style.display = "block";
    });
  });

  //Modal Form

  let message = {
    empty: '',
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failuar: 'Что-то пошло не так'
  };

  let form = document.querySelector('.main-form');
  let input = form.getElementsByTagName('input');
  let statusMessage = document.createElement('div');
  statusMessage.classList.add('status');

  form.addEventListener('submit', (e) => {
    console.log(form);
    
    e.preventDefault();
    form.appendChild(statusMessage);
    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    // request.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('content-type', 'application/json; charset=utf-8');
    
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((k,v) => {
      obj[k] = v;
    });
    let json = JSON.stringify(obj);
    request.send(json);

    request.addEventListener('readystatechange', () => {
      if (request.readyState < 4){
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status === 200){        
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failuar;
      }
    });

    console.log(input);
    
    for (let i = 0; i < input.length; i++){
      input[i].value = "";
    }
  });

  //Contact Form

  let contactForm = document.getElementById("form");
  let contactInputs = contactForm.getElementsByTagName('input');
  contactForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    let contactRequest = new XMLHttpRequest();
    contactRequest.open("POST", "server.php");
    contactRequest.setRequestHeader("content-type", "application/json; charset=utf-8");

    let contactFormData = new FormData(contactForm);

    console.log("contactInputs[0]",contactInputs[0].value);
    console.log("contactForm",contactForm);
    console.log("contactFormData", contactFormData);
    
    let contactObj = {};
    contactFormData.forEach((k,v) => {
      contactObj[k]=v;
    });
    let contactJson = JSON.stringify(contactObj);

    contactRequest.send(contactJson);
    contactRequest.addEventListener('load', () => {
        console.log(`contact sent with status ${contactRequest.status}`);
    });

    for (let i = 0; i < contactInputs.length; i++){
      contactInputs[i].value = '';
    }
  });
});


