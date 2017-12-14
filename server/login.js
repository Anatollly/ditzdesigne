class Login {
  constructor() {
    this._user = '';
    this._pass = '';
  }

  signin(user, pass) {
    this._user = user;
    this._pass = pass;
  }

  logout() {
    this._user = '';
    this._pass = '';
  }

  checkLogin() {
    const _user = 'ditz';
    const _pass = 'ditz';
    return this._user === _user && this._pass === _pass;
  }
}

module.exports = {
  Login
};
