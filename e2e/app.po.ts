import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(): any {
    return browser.get('/');
  }

  getPageTitle(): any {
    return element(by.css('h1'))
      .getText();
  }
}
