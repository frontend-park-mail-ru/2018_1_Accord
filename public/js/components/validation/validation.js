export default class Validator {

    /**
     * @param {InputForm} email
     */
    static checkEmail(email) {
        if (!email.getData() || !email.getData().match(/@/)) {
            return {
                state: false,
                errMessage: "Invalid e-mail!"
            };
        }
        return {
            state: true,
            errMessage: ""
        };
    }

    /**
     * @param {InputForm} username
     */
    static checkUsername(username) {
        if (username.getData().length < 3 ||
            username.getData().length > 20) {
            return {
                state: false,
                errMessage: "Username need to contain 3-20 symbols!"
            }
        }

        return {
            state: true,
            errMessage: ""
        }
    }

    /**
     * @param {InputForm} password
     */
    static checkPassword(password) {
        if (!password.getData().match(/[\w\d]/) ||
            password.getData().length < 4 || password.getData().length > 30) {
            return {
                state: false,
                errMessage: "Password need to contain more than 4 symbols " +
                "with letters and digits"
            }
        }
        return {
            state: true,
            errMessage: ""
        }
    }

    /**
     * @param {InputForm} password
     * @param {InputForm} passwordConfirm
     */
    static confirmPassword(password, passwordConfirm) {
        if (password.getData() !== passwordConfirm.getData()) {
            return {
                state: false,
                errMessage: "Password do not match!"
            }
        }
        return {
            state: true,
            errMessage: ""
        }
    }
}






