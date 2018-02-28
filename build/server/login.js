class Login {
  constructor() {
    this._user = '';
    this._pass = '';
    this._ip = '';
  }

  signin(user, pass, ip) {
    this._user = user;
    this._pass = pass;
    this._ip = ip;
  }

  logout() {
    this._user = '';
    this._pass = '';
    this._ip = '';
  }

  checkLogin(ip) {
    const _user = 'ditz';
    const _pass = 'ditz';
    return this._user === _user && this._pass === _pass && this._ip === ip && this._ip !== '';
  }
}

module.exports = {
  Login
};
