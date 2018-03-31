import BaseView from '../../view/baseView.js';

export default class SignupView extends BaseView {
  constructor() {
    super('js/views/pages/signupView/SignupView.tmpl');
  }

  render() {
    const attrs = {
      form: {
        fields: [
          {
            inputType: 'email',
            inputName: 'email',
            inputPlaceholder: 'email'
          },
          {
            inputType: 'text',
            inputName: 'username',
            inputPlaceholder: 'username'
          },
          {
            inputType: 'password',
            inputName: 'password',
            inputPlaceholder: 'password'
          },
          {
            inputType: 'password',
            inputName: 'password',
            inputPlaceholder: 'confirm password'
          }
        ],
        submitText: 'Sign up'
      }
    };
    return super.render(attrs);
  }
}
