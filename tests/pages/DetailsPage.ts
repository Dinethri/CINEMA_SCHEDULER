import BasePage from './BasePage';
import { Page, expect } from '@playwright/test';
export default class DetailsPage extends BasePage {

  private movieTitle = '#movieTitle';
  private theaterDropdown = '#theater';
  private showDate = '#showDate';
  private showTime = '#showTime';
  private priceField = '#ticketPrice';
  private notesField = '#notes';
  private saveButton = 'button:has-text("Save")';
  private resetButton = 'button:has-text("Reset")';
  private backButton = 'button:has-text("Back")';
  private successBanner = '[data-testid="success-banner"]';
  private cinemaListTab = 'text=Cinema List';

  async enterMovieTitle(movie: string) {
    await this.page.fill(this.movieTitle, movie);
  }

  async selectTheater(theater: string) {
    await this.page.selectOption(this.theaterDropdown, theater);
  }

  async enterShowDate(date: string) {
      const dateInput = this.page.locator(this.showDate);
    await dateInput.waitFor({ state: 'visible', timeout: 10000 });
    await dateInput.fill('');
    await dateInput.type(date, { delay: 50 });
  }

  async enterShowTime(time: string) {
    const locator = this.page.locator(this.showTime);
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.fill('');
    await locator.type(time, { delay: 50 });
  }

  async enterPrice(price: string){
    await this.page.fill(this.priceField, price)
  }

  async enterNotes(note: string) {
    await this.page.fill(this.notesField, note);
  }

  async clickSaveButton() {
    await this.page.click(this.saveButton);
  }

  async clickBackButton() {
    await this.page.click(this.backButton);
  }

  async clickResetButton() {
    await this.page.click(this.resetButton);
  }

  async getSuccessBannerMessage() {
    const banner = this.page.locator(this.successBanner);
    await expect(banner).toBeVisible({ timeout: 10000 });
    return banner.innerText();
  }

  async navigateToCinemaList(){
    await this.page.click(this.cinemaListTab);
  }

  async getMovieTitleSuggestions(){
    // return this.page.locator('.typeahead-suggestion');
    return this.page.locator('[data-testid^="movieTitle-option"]');
  }

  async getShowDateError(){
    return this.page.locator('[data-testid="showDate-error"]').innerText();
  }

  async getPriceDetailErrorMessage(){
    return this.page.locator('[data-testid="ticketPrice-error"]').innerText();
  }

}
