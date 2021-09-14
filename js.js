window.addEventListener('DOMContentLoaded', function(){


    let info = document.querySelector('.info-header'),
        headerTab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');


        function hideTabs(a){

        for(let i = a; i < tabContent.length; i++){

            tabContent[i].classList.add('hide');
            tabContent[i].classList.remove('show');
            console.log(tabContent[i]);
        };
         
        };


        hideTabs(1);

        function showTabs(b){
            if(tabContent[b].classList.contains('hide')){

                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            };
        };

        info.addEventListener('click', function(e){

            let target = e.target;

            if(target && target.classList.contains('info-header-tab')){

                for(let i = 0; i < headerTab.length; i++){

                     if(target == headerTab[i]){

                       hideTabs(0);
                       showTabs(i);
                       break;

                     }
                }
            }
        });


//end Tabs

// timer

let endDate = '2021-08-20';

function getTimeRemaining(endDate){

    t = Date.parse(endDate) - Date.parse(new Date()),
    seconds = Math.floor((t /1000) % 60),
    minutes = Math.floor((t /1000 /60) % 60),
    hours = Math.floor((t / (1000 * 60 * 60)));


        return {
         'total' : t,
         'hours' : hours,
         'minutes' : minutes,
         'seconds' : seconds
        }

}


function setClock(id, endDate){

    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),

        
        
        timeInterval = setInterval(updateClock, 1000);

        function updateClock(){


            let t = getTimeRemaining(endDate);

            if(t.seconds < 10){

                 seconds.textContent = '0' + t.seconds;

            } else {

                seconds.textContent = t.seconds;


            }
            if(t.minutes < 10){

                minutes.textContent = '0' + t.minutes;

           } else {

            minutes.textContent = t.minutes;

           }
            hours.textContent = t.hours;
            
           

            if(t.total < 0){
            

                clearInterval(timeInterval);

            }



        };
};


setClock('timer',endDate);

// modal

let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

    more.addEventListener('click', function(){

        overlay.style.display = 'block';
        this.classList.add = 'more-splash';
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function(){

     overlay.style.display = 'none';
     more.classList.remove = 'more-splash';
     document.body.style.overflow = '';

    });
 
//Form

   let message = {

    loading : 'test Загрузка... ',
    success : 'test Спасибо! Скоро мы с вами свяжемся',
    failure : ' test Что то пошло не так'

   }


   let form = document.querySelector('.main-form'),
       input = form.getElementsByTagName('input'),
       statusMessage = document.createElement('div');

       statusMessage.classList.add('status');


       form.addEventListener('submit', function(e){
         
        e.preventDefault();
        
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.getResponseHeader('Content-Type', 'aplication/json');

        let formData = new FormData(form);

        let obj = {

        }

        formData.forEach(function(value, key){

            obj[key] = value;

        });

        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function(){

            if(request.readyState < 4){

                statusMessage.innerHTML = message.loading;
                

            } else if(request.readyState = 4 && request.status == 200){

                statusMessage.innerHTML = message.success;
                console.log(statusMessage.success);
            } else {

                statusMessage.innerHTML = message.failure;

            }


            for(let i = 0; i < input.length; i++){

                input[i].value = '';
            }

        });


       });


//form Footer

let footerForm = document.getElementById('form'),
    footerFormInput = footerForm.getElementsByTagName('input');

footerForm.addEventListener('submit', function(e){

    e.preventDefault();

    let request = new XMLHttpRequest();

    request.open('POST', 'server.php');
    request.getResponseHeader('Content-Type', 'application/json', 'charset=utf-8');

    let formData = new FormData(footerForm);

    let obj = {};

    formData.forEach(function(value, key){

       obj[key] = value;

    });

    let json = JSON.stringify(obj);
    request.send(json);


});


//Slider

let sliderIndex = 1,
    sliderItems = document.querySelectorAll('.slider-item '),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dots = document.querySelectorAll('.dot'),
    dotsWrap = document.querySelector('.slider-dots');

    showSlides()
    function showSlides(n){

        if(n > sliderItems.length){       
            sliderIndex = 1;
        }

        if(n < 1){
            sliderIndex = sliderItems.length;
        }

        sliderItems.forEach((item)=> item.style.display = 'none');
        dots.forEach((item)=> item.classList.remove('dot-active'));

        sliderItems[sliderIndex - 1].style.display = 'block';
        dots[sliderIndex - 1].classList.add('dot-active');


    };

    function plusSlide(n){
       
        showSlides(sliderIndex += n)

    }

    function currentClide(n){

       showSlides(sliderIndex = n)
    }  

    prev.addEventListener('click', function(){

        plusSlide(-1)


    });
    next.addEventListener('click', function(){

        plusSlide(1)


    });

    dotsWrap.addEventListener('click', function(e){
      
        let target = e.target;

        for(let i = 0; i < dots.length + 1; i++){

            if(target == dots[i-1] && target.classList.contains('dot')){

                currentClide(i)
            }
        }
   

    });

//calc

let personsValue = document.querySelectorAll('.counter-block-input')[0],
    daysValue = document.querySelectorAll('.counter-block-input')[1],
    options = document.querySelector('#select'),
    totalValue = document.getElementById('total'),
    persons = 0,
    days = 0,
    total = 0;

    totalValue.textContent = 0;

    personsValue.addEventListener('input', function(){

        if(daysValue.value != ''){

            persons = +personsValue.value;
            total = (persons + days) * 4000
            totalValue.textContent = total;
        }

    });

    daysValue.addEventListener('input', function(){

        if(personsValue.value != ''){

            days = +daysValue.value;
            total = (persons + days) * 4000
            totalValue.textContent = total;

        }

    });

    options.addEventListener('change', function() {
        if (days.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

    

});