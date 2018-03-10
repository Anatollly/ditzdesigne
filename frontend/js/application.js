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
import hashController from './controller';


export default class Application {

  static showMainPage() {
    displayElement(mainPageView());
    // hashController().hash = '/main';
  }

  static showAboutUsPage() {
    displayElement(aboutUsPageView());
    // hashController().hash = '/aboutUs';
  }

  static showPortfolioPage(albumName) {
    displayElement(portfolioPageView(albumName));
    // hashController().hash = '/portfolio';
  }

  static showServicesPage() {
    displayElement(servicesPageView());
    // hashController().hash = '/services';
  }

  static showTechnologiesPage() {
    displayElement(technologiesPageView());
    // hashController().hash = '/technologies';
  }

  static showContactsPage() {
    displayElement(contactsPageView());
    // hashController().hash = '/contacts';
  }

  static showBestsellerPage() {
    displayElement(bestsellerPageView());
    // hashController().hash = '/bestseller';
  }

  static showInterTextilePage() {
    displayElement(interTextilePageView());
    // hashController().hash = '/interTextile';
  }

  static showSharesPage() {
    displayElement(sharesPageView());
    // hashController().hash = '/shares';
  }

  static showTextileForRestPage() {
    displayElement(textileForRestPageView());
    // hashController().hash = '/textileForRest';
  }

  static showUniformsPage() {
    displayElement(uniformsPageView());
    // hashController().hash = '/uniforms';
  }

  static showErrorPage() {
    displayElement(errorPageView());
    // hashController().hash = '/error';
  }

}
