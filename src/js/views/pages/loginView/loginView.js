import BaseView from '../../view/baseView.js';

export default class LoginView extends BaseView{
  constructor() {
    super('js/views/pages/loginView/LoginView.tmpl');

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
            inputType: 'password',
            inputName: 'password',
            inputPlaceholder: 'password'
          }
        ],
        submitText: 'Log in'
      }
    };
    return super.render(attrs);
  }
}