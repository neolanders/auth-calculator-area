import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(): any {
    return browser.get('/');
  }

  getPageTitle(): any {
    return element.all(by.tagName('h1'))
      .getText();
  }
}
