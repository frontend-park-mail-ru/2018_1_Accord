import BaseView from '../../view/baseView.js';

export default class LoginView extends BaseView{
  constructor() {
    super('js/views/pages/loginView/LoginForm.tmpl');
    this.attrs = {
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
    super.render();
  }
}
