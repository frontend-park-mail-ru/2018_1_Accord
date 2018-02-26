export default class FormError {
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
            this._stateError.passwordError = "Password must contain only latin symbols and digits\n";

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





