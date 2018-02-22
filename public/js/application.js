'use strict'


const application = document.getElementById('application');

const menuSection = document.getElementById('menu');
const playSection = document.getElementById('play');
const loginSection = document.getElementById('login');
const signupSection = document.getElementById('signup');
const aboutSection = document.getElementById('about');

const loginForm = document.getElementsByClassName('js-login-form')[0];
const signupForm = document.getElementsByClassName('js-signup-form')[0];

playSection.style.display = 'none';
loginSection.style.display = 'none';
signupSection.style.display = 'none';
aboutSection.style.display = 'none';

const sections = {
    menu: menuSection,
    play: playSection,
    login: loginSection,
    signup: signupSection,
    about: aboutSection
};

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

const openFunction = {
    play: startPlay(),

    login: function () {
        loginForm.removeEventListener('submit', onSubmitLoginForm);
        loginForm.reset();
        loginForm.addEventListener('submit', onSubmitLoginForm);
    },

    signup: function () {
        signupForm.removeEventListener('submit', onSubmitSignupForm);
        signupForm.reset();
        signupForm.addEventListener('submit', onSubmitSignupForm);
    },

    about: openAbout()

};

function openSection(section) {
    Object.keys(sections).forEach(function (key) {
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


function startPlay() {
    const backButton = playSection.getElementsByClassName('button-back')[0];
    backButton.addEventListener('click', getBack);
}

function getBack(event) {
    //В будущем данная функция будет больше и сложнее, но пока так
    openSection('menu');

}


class FormError {
    constructor(formData, formType) {
        this._data = formData;
        this._type = formType;

        this._stateError = {
            usernameValid: false,
            usernameError: '',

            passwordValid: false,
            passwordError: '',

            passwordConfirmValid: false,
            passwordConfirmError: ''
        }
    }

    get stateError() {
        return this._stateError;
    }

    validate() {
        this.validateUsername();
        this.validatePassword();

        if (this._type === 'signup') {
            this.validatePasswordConfirm();
        }
    }

    validateUsername() {
        if (!this._data['username']) {
            this._stateError.usernameValid = false;
            this._stateError.usernameError = 'Enter your username!\n';
        } else {
            this._stateError.usernameValid = true;
            this._stateError.usernameError = '';
        }
    }

    validatePassword() {
        const regExp = /[^(\d\w)*]/;

        if (!this._data['password']) {
            this._stateError.passwordValid = false;
            this._stateError.passwordError = 'Enter password!\n';

        } else if (regExp.test(this._data['password'])) {
            this._stateError.passwordValid = false;
            this._stateError.passwordError = 'Password must contain only latin symbols and digits\n';

        } else {
            this._stateError.passwordValid = true;
            this._stateError.passwordError = '';
        }
    }

    validatePasswordConfirm() {
        if (!this._data['passwordConfirm']) {
            this._stateError.passwordConfirmValid = false;
            this._stateError.passwordConfirmError = 'Confirm password!\n';

        } else if (this._data['password'] !== this._data['passwordConfirm']) {
            this._stateError.passwordConfirmValid = false;
            this._stateError.passwordConfirmError = 'Passwords do not match!\n';

        } else {
            this._stateError.passwordConfirmValid = true;
            this._stateError.passwordConfirmError = '';
        }
    }
}

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
    errorDiv.style.display = 'none';

    const fields = ['username', 'password'];
    const form = event.currentTarget;

    const formData = getFormData(form, fields);
    const formError = new FormError(formData, 'login');

    formError.validate();

    if (!errorsOnDisplay(errorDiv, formError, 'login')) {
        loginUser(formData, function (err, response) {
            if (err) {
                loginForm.reset();
                errorDiv.style.display = 'block';
                errorDiv.innerText += 'Invalid user data\n';
            }

            openSection('play');
        });
    }

    form.reset();
}


/**
 *
 * @param {Event} event
 */
function onSubmitSignupForm(event) {
    event.preventDefault();

    const errorDiv = signupSection.getElementsByClassName('error')[0];
    errorDiv.style.display = 'none';

    const fields = ['username', 'password', 'passwordConfirm'];
    const form = event.currentTarget;

    const formData = getFormData(form, fields);
    const formError = new FormError(formData, 'signup');

    formError.validate();

    if (!errorsOnDisplay(errorDiv, formError, 'signup')) {
        signupUser(formData, function (err, response) {
            if (err) {
                loginForm.reset();
                errorDiv.style.display = 'block';
                errorDiv.innerText += 'Invalid user data\n';
            }

            openSection('play');
        });
    }

    form.reset();
}

function openAbout() {

}

function loginUser(user, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
            return;
        }

        if (xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        } else {
            callback(xhr);
        }
    };

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.withCredentials = true;

    xhr.send(JSON.stringify(user));
}

function signupUser(user, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/signup', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
            return;
        }

        if (xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        } else {
            callback(xhr);
        }
    };

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.withCredentials = true;

    xhr.send(JSON.stringify(user));

}