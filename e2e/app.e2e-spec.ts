import { LyfrontPage } from './app.po';

describe('lyfront App', () => {
  let page: LyfrontPage;

  beforeEach(() => {
    page = new LyfrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
