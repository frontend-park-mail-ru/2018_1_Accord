export const menuObjects = {
  play: {
    title: 'Play',
    href: ''
  },
  login: {
    title: 'Login',
    href: ''
  },
  signUp: {
    title: 'Sign up',
    href: ''
  },
  logout: {
    title: 'Logout',
    href: ''
  },
  about: {
    title: 'About',
    href: ''
  }
};

export const navObjects = (data) => {
  return {
    profile: {
      title: `${data}`,
      class: 'nav__items-profile',
      href: ''
    },
    settings: {
      title: 'Settings',
      class: 'nav__items-settings',
      href: ''
    },
    back: {
      title: 'Back',
      class: 'nav__items-back',
      href: ''
    },
    login: {
      title: 'Login',
      class: 'anav__items-login',
      href: ''
    },
    signUp: {
      title: 'Sign up',
      class: 'nav__items-signup',
      href: ''
    },
    logout: {
      title: 'Logout',
      class: 'nav__items-logout',
      href: ''
    }
  };
};