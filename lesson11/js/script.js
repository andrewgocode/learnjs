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
    overlay.style.display = "block";
    this.classList.addList.add("more-splash");
    document.body.style.overflow = "hidden";
  });

  close.addEventListener("click", function(){
    overlay.style.display = "none";
    more.classList.addList.remove("more-splash");
    document.body.style.overflow = "";
  });

  let descBtns = document.querySelectorAll(".description-btn");
  descBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      overlay.style.display = "block";
    });
  });

});

