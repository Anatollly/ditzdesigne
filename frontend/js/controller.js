class Controller {

  get hash() {
    let hash = window.location.hash.slice(1);
    return hash;
  }

  set hash(hash) {
    window.location.hash = hash;
  }

}

export default () => new Controller();
