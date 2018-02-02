import { AppPage } from './app.po';

describe('my-calculator App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Home Title', () => {
    page.navigateTo();
    expect(page.getPageTitle())
      .toEqual([ '', 'TEST' ]);
  });
});
