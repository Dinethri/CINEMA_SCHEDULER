import { test, expect } from "@playwright/test";
import LoginPage from "./pages/LoginPage";
import CinemaListPage from "./pages/CinemaListPage";
import DetailsPage from "./pages/DetailsPage";
import { shows } from "../test-data/shows";;

test.describe("Cinema Details Page", () => {
  test("TC_012 - Verify Movie Title field (typeahead)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const detailsPage = new DetailsPage(page);
    const cinemaListPage = new CinemaListPage(page);
    
    await loginPage.navigate();
    await loginPage.login("Admin", "password");
    await cinemaListPage.createNewShow();

    await detailsPage.enterMovieTitle("Av");
    const suggestions = await (await detailsPage.getMovieTitleSuggestions()).allTextContents();
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions).toContain("Avatar 3");
  });

  test("TC_013 - Verify Show Date field validation", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const detailsPage = new DetailsPage(page);
    const cinemaListPage = new CinemaListPage(page);

    await loginPage.navigate();
    await loginPage.login("Admin", "password");
    await cinemaListPage.createNewShow();

    await detailsPage.enterMovieTitle("Avatar");
    await detailsPage.selectTheater("Theater 1");
    await detailsPage.enterShowTime("18:00");
    // await detailsPage.enterShowDate("25/11/2025");
    await detailsPage.enterPrice("150");
    await detailsPage.enterNotes("Test show");

    await detailsPage.clickSaveButton();

    const error = await detailsPage.getShowDateError();
    expect(error).toContain("Show Date is required");
  });

  test("TC_014 - Verify Price details field validation", async ({page}) => {
    const loginPage = new LoginPage(page);
    const detailsPage = new DetailsPage(page);
    const cinemaListPage = new CinemaListPage(page);

    await loginPage.navigate();
    await loginPage.login("Admin", "password");
    await cinemaListPage.createNewShow();

    await detailsPage.enterMovieTitle("Avatar");
    await detailsPage.selectTheater("Theater 1");
    await detailsPage.enterShowDate("25/11/2025");
    await detailsPage.enterShowTime("15:00");
    await detailsPage.enterPrice("");
    await detailsPage.enterNotes("Test show");
    await detailsPage.clickSaveButton();

    const errorBanner = await detailsPage.getPriceDetailErrorMessage();
    expect(errorBanner).toContain("Ticket Price is required"); 
  });

  test("TC_015 - Verify successful save of new show", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cinemaListPage = new CinemaListPage(page);
    const detailsPage = new DetailsPage(page);

    await loginPage.navigate();
    await loginPage.login("Admin", "password");
    await cinemaListPage.createNewShow();

    await detailsPage.enterMovieTitle("Avatar");
    await detailsPage.selectTheater("Theater 1");
    await detailsPage.enterShowDate("25/11/2025");
    await detailsPage.enterShowTime("18:00");
    await detailsPage.enterPrice("150");
    await detailsPage.enterNotes("Test show");
    await detailsPage.clickSaveButton();

    const successMsg = await detailsPage.getSuccessBannerMessage();
    expect(successMsg).toContain("✓ Cinema show saved successfully!");

    await detailsPage.navigateToCinemaList();
    const rows = cinemaListPage.getAllTableRows();
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });
});
