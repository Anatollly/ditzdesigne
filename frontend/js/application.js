import {displayElement} from './util';
import mainPageView from './pages/main-page';
// import uniformView from './pages/uniform-page';
import portfolioPageView from './pages/portfolio-page';

export default class Application {

  static showMainPage() {
    displayElement(mainPageView());
  }

  // static showUniformPage() {
  //   displayElement(uniformView());
  // }

  static showPortfolioPage() {
    displayElement(portfolioPageView());
  }
}
