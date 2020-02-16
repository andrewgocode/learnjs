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


});