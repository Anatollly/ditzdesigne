import {displayElement} from './util';
import mainPageView from './pages/main-page';
import aboutUsPageView from './pages/aboutUs-page';
import portfolioPageView from './pages/portfolio-page';
import servicesPageView from './pages/services-page';
import technologiesPageView from './pages/technologies-page';
import contactsPageView from './pages/contacts-page';
import bestsellerPageView from './pages/bestseller-page';
import interTextilePageView from './pages/interTextile-page';
import sharesPageView from './pages/shares-page';
import textileForRestPageView from './pages/textileForRest-page';
import uniformsPageView from './pages/uniforms-page';
import errorPageView from './pages/error-page';


export default class Application {

  static showMainPage() {
    displayElement(mainPageView());
  }

  static showAboutUsPage() {
    displayElement(aboutUsPageView());
  }

  static showPortfolioPage() {
    displayElement(portfolioPageView());
  }

  static showServicesPage() {
    displayElement(servicesPageView());
  }

  static showTechnologiesPage() {
    displayElement(technologiesPageView());
  }

  static showContactsPage() {
    displayElement(contactsPageView());
  }

  static showBestsellerPage() {
    displayElement(bestsellerPageView());
  }

  static showInterTextilePage() {
    displayElement(interTextilePageView());
  }

  static showSharesPage() {
    displayElement(sharesPageView());
  }

  static showTextileForRestPage() {
    displayElement(textileForRestPageView());
  }

  static showUniformsPage() {
    displayElement(uniformsPageView());
  }

  static showErrorPage() {
    displayElement(errorPageView());
  }
}
