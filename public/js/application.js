'use strict';

import FormError from "./components/validation/validation.js";
import HttpModule from "./modules/http.js";

const httpModule = new HttpModule();

const application = document.getElementById('application');

const menuSection = document.getElementById('menu');
const playSection = document.getElementById('play');
const leaderBoardSection = document.getElementById('leaderboard');
const loginSection = document.getElementById('login');
const signupSection = document.getElementById('signup');
const aboutSection = document.getElementById('about');

const loginForm = document.getElementsByClassName('js-login-form')[0];
const signupForm = document.getElementsByClassName('js-signup-form')[0];

playSection.style.display = 'none';
leaderBoardSection.style.display = 'none';
loginSection.style.display = 'none';
signupSection.style.display = 'none';
aboutSection.style.display = 'none';


console.log(aboutSection.style.display + "awdadwa");

const sections = {
    menu: menuSection,
    play: playSection,
    leaderBoard: leaderBoardSection,
    login: loginSection,
    signup: signupSection,
    about: aboutSection
};


const openFunction = {
    play: startPlay(),

    //leaderBoard: openleaderBoard(),
    //change form function
    login: function () {
        const backButton = loginSection.getElementsByClassName('button-back')[0];
        backButton.addEventListener('click', getBack);

        loginForm.removeEventListener('submit', onSubmitLoginForm);
        loginForm.reset();
        loginForm.addEventListener('submit', onSubmitLoginForm);
    },

    signup: function () {
        const backButton = signupSection.getElementsByClassName('button-back')[0];
        backButton.addEventListener('click', getBack);

        signupForm.removeEventListener('submit', onSubmitSignupForm);
        signupForm.reset();
        signupForm.addEventListener('submit', onSubmitSignupForm);
    },

    about: openAbout()

};


function openSection(section) {
    Object.keys(sections).forEach(function (key) {
        //class changeSection
        if (key === section) {
            sections[key].style.display = 'block';
        } else {
            sections[key].style.display = 'none';
        }

    });
    if (openFunction[section]) {
        openFunction[section]();
    }

}

application.addEventListener('click', function (event) {
    const target = event.target;

    if (target.tagName.toLowerCase() !== 'button') {
        return;
    }

    event.preventDefault();

    const section = target.getAttribute('data-section');
    console.info('Open section', section);
    openSection(section);

});



function getBack(event) {
    event.preventDefault();
    //В будущем данная функция будет больше и сложнее, но пока так
    openSection('menu');

}

function startPlay() {
    const backButton = playSection.getElementsByClassName('button-back')[0];
    const leaderBoardButton = playSection.getElementsByClassName('button-leaderBoard')[0];

    backButton.addEventListener('click', getBack);
    //leaderBoardButton.addEventListener('click', openleaderBoard);
}
// function openleaderBoard(event) {
//     event.preventDefault();
//
// }



function getFormData(form, fields) {

    const formElements = form.elements;

    return fields.reduce(function (allfields, fieldname) {
        allfields[fieldname] = formElements[fieldname].value;
        return allfields;
    }, {});
}

function errorsOnDisplay(error, formError, formType) {
    let textError = '';

    if (!formError.stateError['usernameValid']) {
        textError += formError.stateError['usernameError'];
    }

    if (!formError.stateError['passwordValid']) {
        textError += formError.stateError['passwordError'];
    }

    if (formType === 'signup' && !formError.stateError['passwordConfirmValid']) {
        textError += formError.stateError['passwordConfirmError']
    }

    if (!textError) {
        console.info('Client validation - OK');
        return false;
    } else {
        error.style.display = 'block';
        error.innerText = textError;
        return true;
    }

}

/**
 *
 * @param {Event} event
 */
function onSubmitLoginForm(event) {
    event.preventDefault();

    const errorDiv = loginSection.getElementsByClassName('error')[0];
    errorDiv.innerText = '';
    errorDiv.style.display = 'none';

    const fields = ['username', 'password'];
    const form = event.currentTarget;

    const formData = getFormData(form, fields);
    const formError = new FormError(formData, 'login');

    formError.validate();

    if (!errorsOnDisplay(errorDiv, formError, 'login')) {
        loginUser(formData, function (err, response) {
            if (err) {
                form.reset();
                errorDiv.style.display = 'block';
                errorDiv.innerText += 'Invalid user data\n';
            } else {
                form.reset();
                openSection('play');
            }
        });

    }
}


/**
 *
 * @param {Event} event
 */
function onSubmitSignupForm(event) {
    event.preventDefault();

    const errorDiv = signupSection.getElementsByClassName('error')[0];
    errorDiv.innerText = '';
    errorDiv.style.display = 'none';

    const fields = ['username', 'password', 'passwordConfirm'];
    const form = event.currentTarget;

    const formData = getFormData(form, fields);
    const formError = new FormError(formData, 'signup');

    formError.validate();

    if (!errorsOnDisplay(errorDiv, formError, 'signup')) {
        signupUser(formData, function (err, response) {
            if (err) {
                form.reset();
                errorDiv.style.display = 'block';
                errorDiv.innerText += 'Invalid user data\n';
            } else {
                form.reset();
                openSection('play');
            }

        });
    }
}

function openAbout() {
    const backButton = aboutSection.getElementsByClassName('button-back')[0];
    backButton.addEventListener('click', getBack);
}

function loadAllUsers(callback) {
    httpModule.doGet({
        url: '/users',
        callback
    });
}


function loadMe(callback) {
    httpModule.doGet({
        url: '/me',
        callback
    });
}

function signupUser(user, callback) {
    httpModule.doPost({
        url: '/signup',
        callback,
        data: user
    });
}


function loginUser(user, callback) {
    httpModule.doPost({
        url: '/login',
        callback,
        data: user
    });
}


function checkAuth() {

}

openSection('menu');