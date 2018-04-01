import userService from '../../../services/UserService.js';
import Logger from '../../../utils/logger.js';
//import {fetchFaildErrors} from '../../../config/textErrors.js';
import BaseView from '../../view/baseView.js';
import {menuObjects} from '../../../utils/views/viewsObjects.js';
import NavBar from '../../../components/NavBar/navBar.js';


export default class MenuSection extends BaseView {
  constructor() {
    super('js/views/pages/MainMenuView/MainMenuView.tmpl');

  }

  render() {
    this.attrs = {
      header: 'Bubble Wars',
      navItems: [],
      menuItems: []
    };

    const menuObj = menuObjects;

    userService.getUser()
      .then((user) => {
        if (!user) {
          const navBar = new NavBar({userData: undefined, state: 'menu'});
          this.attrs.navItems = navBar.render();

          this.attrs.menuItems = [
            menuObj.play,
            menuObj.login,
            menuObj.signUp,
            menuObj.about
          ];

          super.render(this.attrs);

        } else {
          const navBar = new NavBar({userData: user, state: 'menu'});
          this.attrs.navItems = navBar.render();

          this.attrs.menuItems = [
            menuObj.play,
            menuObj.logout,
            menuObj.about
          ];
        }

        super.render(this.attrs);
        //TODO: обработать неуспешный выход
      })
      .catch((error) => {
        const navBar = new NavBar({userData: undefined, state: 'menu'});
        this.attrs.navItems = navBar.render();

        this.attrs.menuItems = [
          menuObj.play,
          menuObj.about
        ];

        Logger.error(error);

        super.render(this.attrs);
        //this.textError.innerHTML = fetchFaildErrors.noConnection;
      });

    return this.el;
  }

}
