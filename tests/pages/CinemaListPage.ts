import BasePage from './BasePage';
import { Page } from '@playwright/test';

export default class CinemaListPage extends BasePage {
//   private welcomeMessage = '.welcome-message';
private welcomeMessage = '.header';
private loginError = '.error';
private newShow = 'button[class="btn btn-success"]';
private clearAll = 'button[data-testid="clear-all-button"]';
private emptyStateMessage = 'div[data-message="no-runs"] p'; 
private tableRows = 'table tbody tr';
private paginationNext = 'button[data-page-action="next"]';
private paginationInfoText = '[data-pagination="controls"] span';
private scheduleIdHeader = 'th[data-sort-column="showId"]';
private scheduleIdCells = 'table tbody tr td[data-value]'; 
private showDateIsCells = 'table tbody tr td:nth-child(4)';
private movieTitleHeader = 'th[data-sort-column="movieTitle"]';
private showMovieTitleCells = 'table tbody tr td:nth-child(2)';
private dateHeader = 'th[data-sort-column="showDate"]';
private export = 'button:has-text("Export")';

  constructor(page: Page) {
    super(page);
  }

  async getWelcomeMessage() {
    await this.waitForSelector(this.welcomeMessage);
    return this.getText(this.welcomeMessage);
  }

  async getUnsuccessfullLoginMessage() {
    await this.waitForSelector(this.loginError);
    return this.getText(this.loginError);
  }

    async createNewShow() {
    await this.click(this.newShow);
  }

  async clearAllShows(){
    await this.click(this.clearAll);
  }

  async getEmptyStateMessage() {
  return this.page.locator(this.emptyStateMessage).innerText();
}

  getAllTableRows() {
    return this.page.locator(this.tableRows);
  }

  getPaginationNextButton() {
    return this.page.locator(this.paginationNext);
  }

  getPaginationInfo() {
    return this.page.locator(this.paginationInfoText);
  }

  async clickScheduleIdHeader() {
    await this.page.click(this.scheduleIdHeader);
  }

  getScheduleIdCells() {
    // return this.page.locator(this.scheduleIdCells);
    return this.page.locator('table tbody tr td:nth-child(1)');
  }

  getShowDateCells(){
    return this.page.locator(this.showDateIsCells)
  }

  async clickMovieTitleHeader(){
    await this.page.click(this.movieTitleHeader)
  }

  getMovieTitleCells(){
    return this.page.locator(this.showMovieTitleCells)
  }
  
  async clickShowDateHeader(){
    await this.page.click(this.dateHeader)
  }

  getExportButton() {
    return this.page.locator(this.export);
  }

  getNewShowButton(){
    return this.page.locator(this.newShow)
  }
}
