import userService from '../../../services/UserService.js';
import Logger from '../../../utils/logger.js';
//import {fetchFaildErrors} from '../../../config/textErrors.js';
import BaseView from '../../view/baseView.js';


export default class MenuSection extends BaseView {
  constructor() {
    super('js/views/pages/MainMenuView/MainMenuView.tmpl');

  }

  render() {
    userService.getUser()
      .then((user) => {
        if (!user) {

        } else {

        }

        super.render(this.attrs);
        //TODO: обработать неуспешный выход
      })
      .catch((error) => {
        Logger.error(error);

        super.render(this.attrs);
        //this.textError.innerHTML = fetchFaildErrors.noConnection;
      });

    return this.el;
  }

}
