'use strict';

// TODO подписаться на события изменения экрана
// стопить анимацию в эти моменты
// рассчитывать количество отображаемых пончиков в зависимости от высоты экрана

(window.onload = function animateDonats() {
  // Define a blank array for the effect positions. This will be populated based on width of the title.
  let bArray = [];

  // Define a size array, this will be used to vary bubble sizes
  const sArray = [130, 100, 80, 61];

  let donutsSelector = document.getElementsByClassName('donuts')[0];
  // let animationFrameCreationDonuts = null;
  let setTimeoutCreationDonuts = null;
  // let animationFrameMovingDonuts = null;


  for (let i = 0; i < donutsSelector.offsetWidth - Math.max.apply(null, sArray); i += 10) {
    bArray.push(i);
  }

  // Function to select random array element
  // Used within the setInterval a few times
  function randomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function redrawIndividualDonut() {
    let individualDonutsSelector = document.getElementsByClassName('individual-donut');

    for (let i = 0; i < individualDonutsSelector.length; i++) {
      let oldBottomStr = individualDonutsSelector[i].style.bottom.valueOf();
      let oldBottomNum = parseFloat(oldBottomStr);

      if (individualDonutsSelector[i] != undefined) {
        individualDonutsSelector[i].style.bottom = oldBottomNum + 1.5 + 'px';

        if (oldBottomNum > window.innerHeight) {
          // if bubble go over display move it for bottom of the screen
          individualDonutsSelector[i].style.bottom = 0 + 'px';
          // move bubble for new place
          individualDonutsSelector[i].style.left = randomValue(bArray);
          // individualDonutsSelector[i].remove();
          // individualDonutsSelector[i].parentNode.removeChild(individualDonutsSelector[i]);
        }
      }
    }
  }

  setTimeoutCreationDonuts = setInterval(function () {
    // Get a random size, defined as variable so it can be used for both width and height
    let size = randomValue(sArray);

    // New bubble appeneded to div with it's size and left position being set inline
    // Left value is set through getting a random value from bArray
    let individual_donut = document.createElement('div');
    individual_donut.className = 'individual-donut';
    individual_donut.setAttribute('style',
      'left: ' + randomValue(bArray) + 'px; ' +
      'bottom: ' + -150 + 'px; ' +
      'width: ' + size + 'px; ' +
      'height: ' + size + 'px;');
    donutsSelector.appendChild(individual_donut);

    let individualDonutsSelector = document.getElementsByClassName('individual-donut');
    if (individualDonutsSelector.length >= 20) {
      window.clearInterval(setTimeoutCreationDonuts);
    }
  }, 550);

  // (function createDonuts() {
  //   // Get a random size, defined as variable so it can be used for both width and height
  //   let size = randomValue(sArray);

  // let individual_donut = document.createElement('div');
  // individual_donut.className = 'individual-donut';
  // individual_donut.setAttribute('style',
  //   'left: ' + randomValue(bArray) + 'px; ' +
  //   'bottom: ' + 0 + 'px; ' +
  //   'width: ' + size + 'px; ' +
  //   'height: ' + size + 'px;');
  // donutsSelector.appendChild(individual_donut);

  //   animationFrameCreationDonuts = window.requestAnimationFrame(createDonuts);
  // })();

  (function animation() {
    redrawIndividualDonut(); // перерисовываем кадр
    window.requestAnimationFrame(animation);
    // animationFrameMovingDonuts = window.requestAnimationFrame(animation);
  })();
});
