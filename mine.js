
// menu acco

$(function() {

  var btn = $('.menu-acco__name');
  var activeClass = 'menu-acco__item--active';

  btn.click(function(event) {
    event.preventDefault();
    var parent = $(this).parent();

      if (parent.hasClass(activeClass)) {
        parent.removeClass(activeClass);
      }

      else {
        btn.parent().removeClass(activeClass);
        parent.addClass(activeClass);
      }

  });
});

// team acco

$(function () {

  var baton = $('.team-acco__name');
  var activeClass = 'team-acco__container--active';

  baton.click(function (event) {
    event.preventDefault();
    var parent = $(this).parent();

    if (parent.hasClass(activeClass)) {
      parent.removeClass(activeClass);
    }
    else {
      baton.parent().removeClass(activeClass);
      parent.addClass(activeClass);
    }

  });
});


// player

let video;
let durationControl;
let soundControl;
let intervalId;

// документ полностью загружен
$().ready(function () {
  video = document.getElementById("player");

  // вешаем обработчик события onclick на тег video
  video.addEventListener('click', playStop);

  // обработчики событий для кнопок play
  let playButtons = document.querySelectorAll(".play");
  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playStop);
  }

  // обработчик событий для кнопки динамик
  let micControl = document.getElementById("mic");
  micControl.addEventListener('click', soundOf)

  // обработчики событий для ползунка продолжительности видео
  durationControl = document.getElementById("durationLevel");
  durationControl.addEventListener('click', setVideoDuration);
  durationControl.addEventListener('onmousemove', setVideoDuration);
  durationControl.addEventListener('mousedown', stopInterval);
  durationControl.min = 0;
  durationControl.value = 0;

  // обработчики событий для ползунка громокости
  soundControl = document.getElementById("micLevel");
  soundControl.addEventListener('click', changeSoundVolume);
  soundControl.addEventListener('onmousemove', changeSoundVolume);

  // задаем максимальные и минимальные значения громокости
  soundControl.min = 0;
  soundControl.max = 5;
  // присваиваем ползунку максимальное значение
  soundControl.value = soundControl.max;

});

/*
 Воспроизведение видео
*/
function playStop() {
  // показывает или скрывает белую кнопку play
  $(".work__player_img").toggleClass("work__player_img--active");

  // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
  durationControl.max = video.duration;

  // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
  if (video.paused) {
    // запускаем видео
    video.play();
    intervalId = setInterval(updateDuration, 1)
    // video.webkitRequestFullScreen(); возможность открыть в полноэкранном режиме
  } else {
    // останавливаем видео
    video.pause();
    clearInterval(intervalId);
    // document.webkitExitFullscreen(); выйти из полноэкранного режима
  }
}

/*
    Управление звуком
*/
function soundOf() {
  /*
      Делаем проверку уровня громкости. 
      Если у нас нашего видео есть звук, то мы его выключаем. 
      Предварительно запомнив текущую позицию громкости в переменную soundLevel
  */
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 5;
  } else {
    /*
        Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
        Хранится в перменной soundLevel
    */
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
  }
}

function stopInterval() {
  clearInterval(intervalId);
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration() {
  video.currentTime = durationControl.value;
  intervalId = setInterval(updateDuration, 1000 / 66);
}

/*
    Управление звуком видео
*/
function changeSoundVolume() {
  /*
      Св-во volume может принимать значения от 0 до 1
      Делим на 10 для того что бы, была возможность более точной регулировки видео. 
  */
  video.volume = soundControl.value / 5;
}

/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration() {
  durationControl.value = video.currentTime;
}


// form

const myForm = document.querySelector('#form');
const send = document.querySelector('#btn');

send.addEventListener('click', event => {
  event.preventDefault();

  if (validateForm(myForm)) {
    const data = {
      name: myForm.elements.name.value,
      phone: myForm.elements.phone.value,
      email: myForm.elements.email.value,
      comment: myForm.elements.comment.value
    };

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', () => {
      if(xhr.response.status) {
        console.log('Ok');
      }
    }); 
 }

  if (myForm.elements.change.checked == true) {
    console.log('Нужна сдача!');
  }

  if (myForm.elements.payCard.checked == true) {
    console.log('Оплата по карте!');
  }

  if (myForm.elements.call.checked == true) {
    console.log('Оплата по карте!');
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }
  
  if (!validateField(form.elements.phone)) {
    valid = false;
  }
  
  if (!validateField(form.elements.email)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  if (!field.checkValidity()) {
    field.nextElementSibling.textContent = field.validationMessage;
    return field.checkValidity();
  }
}

/////// slider


/* const left = document.querySelector("#left");
const right = document.querySelector("#right");
const list = document.querySelector("#list");

const minRight = 0;
const maxRight = 3840;
const step = 960;
let currentRight = 0;

list.style.right = currentRight;

right.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentRight < maxRight) {
    currentRight += step;
    list.style.right = currentRight + "px";
  }
});

left.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentRight > minRight) {
    currentRight -= step;
    list.style.right = currentRight + "px";
  }
}); */


// slider

const left = document.querySelector("#left");
const right = document.querySelector("#right");

const items = document.querySelectorAll('#list .slider__item');
let i = 0;

right.addEventListener('click', function (e) {
  e.preventDefault();
  items[i].style.display = 'none';
  i++;

  if (i >= items.length) {
    i = 0;
  }

  items[i].style.display = 'flex';
});

left.addEventListener('click', function (e) {
  e.preventDefault();
  items[i].style.display = 'none';
  i--;

  if (i < 0) {
    i = items.length - 1;
  }

  items[i].style.display = 'flex';
});


//// drop

$(function () {

  var button = $('.slider__burger_img');
  var active = '.slider__burger_img--active';

  button.click(function (event) {
    event.preventDefault();
    var parent = $(this).parent();

    if (parent.hasClass(active)) {
      parent.removeClass(active);
    }

    else {
      button.parent().removeClass(active);
      parent.addClass(active);
    }

  });
});