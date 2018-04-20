"use strict";

(function animateDonats() {
    // Define a blank array for the effect positions. This will be populated based on width of the title.
    let bArray = [];

    // Define a size array, this will be used to vary bubble sizes
    const sArray = [130, 100, 80, 61];

    let donutsSelector = document.getElementsByClassName("donuts")[0];
    let animationFrameCreationDonuts = null;
    let animationFrameMovingDonuts = null;


    // Push the header width values to bArray
    for (let i = 0; i < donutsSelector.offsetWidth; i++) {
        bArray.push(i);
    }

    // Function to select random array element
    // Used within the setInterval a few times
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function redrawIndividualDonut() {
        let individualDonutsSelector = document.getElementsByClassName("individual-donut");

        for (let i = 0; i < individualDonutsSelector.length; i++) {
            let oldBottomStr = individualDonutsSelector[i].style.bottom.valueOf();
            //TODO переделать под parseFloat
            let oldBottomNum = +(oldBottomStr.slice(0, oldBottomStr.length - 2));
            // var oldBottomNum;
            // oldBottomNum = parseFloat(oldBottomStr);
            // console.log(oldBottomStr);
            // console.log(oldBottomNum);

            if (oldBottomNum >= window.innerHeight) {
                individualDonutsSelector[i].style.bottom = '0px';
            }

            individualDonutsSelector[i].style.bottom = oldBottomNum + 1.5 + 'px';
        }
    }

    setInterval(function () {
        // Get a random size, defined as variable so it can be used for both width and height
        let size = randomValue(sArray);

        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.donuts').append('<div class="individual-donut" ' +
            'style="left: ' + randomValue(bArray) + 'px; ' +
            'width: ' + size + 'px; ' +
            'height:' + size + 'px;"></div>');

        // animationFrameCreationDonuts = window.requestAnimationFrame(createDonuts);
    }, 550);

    (function animation() {
        redrawIndividualDonut(); // перерисовываем кадр
        animationFrameMovingDonuts = window.requestAnimationFrame(animation);
    })();
})();