import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('my-calculator App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Home Title', () => {
    page.navigateTo();
    expect(page.getPageTitle())
      .toEqual('Home');
  });

  it('should be able to click on login link on the homepage and get to the login page', () => {
    // browser.get("/");
    const loginLinkEl = element(by.css('.login'));
    loginLinkEl.click();
    browser.driver.wait(() => {
        return browser.driver.getCurrentUrl()
          .then(url => {
            return /login/.test(url);
        });
    }, 10000);
  });

});
