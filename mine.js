
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
  
  console.log(myForm.elements.name.value);
  console.log(myForm.elements.phone.value);
  console.log(myForm.elements.change.checked);
  console.log(myForm.elements.payCard.checked);
  console.log(myForm.elements.call.checked);
})



