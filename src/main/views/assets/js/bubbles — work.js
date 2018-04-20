"use strict";

(function showShit() {
    // Define a blank array for the effect positions. This will be populated based on width of the title.
    let bArray = [];

    // Define a size array, this will be used to vary bubble sizes
    const sArray = [130, 100, 90, 61];

    let animationFrameId = null;
    let donutsSelector = document.getElementsByClassName("donuts")[0];


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
            let oldBottomNum = +(oldBottomStr.slice(0, oldBottomStr.length - 2));

            if (oldBottomNum >= window.innerHeight) {
                individualDonutsSelector[i].style.bottom = '0px';
            }

            individualDonutsSelector[i].style.bottom = oldBottomNum + 0.5 + 'px';
        }
    }

    // setInterval function used to create new bubble every 250 milliseconds
    setInterval(function () {

        // Get a random size, defined as variable so it can be used for both width and height
        let size = randomValue(sArray);

        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.donuts').append('<div class="individual-donut" ' +
            'style="left: ' + randomValue(bArray) + 'px; ' +
            'width: ' + size + 'px; ' +
            'height:' + size + 'px;"></div>');

        (function animation() {
            redrawIndividualDonut(); // перерисовываем кадр
            animationFrameId = window.requestAnimationFrame(animation);
        })();

    }, 250);
})();

// jQuery(document).ready(function ($) {
//
//     // Define a blank array for the effect positions. This will be populated based on width of the title.
//     var bArray = [];
//
//     // Define a size array, this will be used to vary bubble sizes
//     var sArray = [150, 110, 90, 61];
//
//     // Push the header width values to bArray
//     for (var i = 0; i < $('.donuts').width(); i++) {
//         bArray.push(i);
//     }
//
//     // Function to select random array element
//     // Used within the setInterval a few times
//     function randomValue(arr) {
//         return arr[Math.floor(Math.random() * arr.length)];
//     }
//
//     // setInterval function used to create new bubble every 350 milliseconds
//     setInterval(function () {
//
//         // Get a random size, defined as variable so it can be used for both width and height
//         var size = randomValue(sArray);
//         // New bubble appeneded to div with it's size and left position being set inline
//         // Left value is set through getting a random value from bArray
//         $('.donuts').append('<div class="individual-donut" ' +
//             'style="left: ' + randomValue(bArray) + 'px; ' +
//             'width: ' + size + 'px; ' +
//             'height:' + size + 'px;"></div>');
//
//         // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
//         // Callback function used to remove finsihed animations from the page
//         $('.individual-donut').animate({
//             'bottom': '110%' //,
//             // 'opacity': '-=0.7'
//         }, 5000, function () {
//             $(this).remove()
//         });
//
//
//     }, 250);
// });