import { test, expect } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import CinemaListPage from './pages/CinemaListPage';
import DetailsPage from './pages/DetailsPage';
import { shows } from '../test-data/shows';

test.describe('Cinema List Page', () => {})
    //Verify dashboard tabs
  test('TC_003 - Verify Dashboard displays "Cinema List" and "Details" tabs after login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'password');

    const cinemaListTab = page.getByTestId('tab-runlist');
    const detailsTab = page.getByTestId('tab-forms');

    await expect(cinemaListTab).toBeVisible();
    await expect(detailsTab).toBeVisible();

    console.log('Dashboard displays both "Cinema List" and "Details" tabs successfully.');
  });

     //Verify cinema details forum values-------recorrect
  test('TC_004 - Verify Empty Cinema List table', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cinemaListPage = new CinemaListPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'password');

    const emptyMessage = await cinemaListPage.getEmptyStateMessage();
    expect(emptyMessage).toContain('No cinema shows scheduled yet');

    await expect(page.locator('table')).not.toBeVisible();
    await expect(page.locator('button:has-text("Export")')).toBeDisabled();

    console.log('Empty cinema list state validated successfully.');
  });

       //Verify cinema details table column values
  test('TC_005 - Verify field values in Cinema List table', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cinemaListPage = new CinemaListPage(page);
    const detailsPage = new  DetailsPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'password');

    await cinemaListPage.createNewShow();

    await detailsPage.enterMovieTitle("Avatar");
    await detailsPage.selectTheater("Theater 1");
    await detailsPage.enterShowDate("25/11/2025");
    await detailsPage.enterShowTime("18:00");
    await detailsPage.enterPrice("150");
    await detailsPage.enterNotes("Test show");

    await detailsPage.clickSaveButton();

    const message = await detailsPage.getSuccessBannerMessage();
    expect(message).toContain('✓ Cinema show saved successfully!');

    await detailsPage.navigateToCinemaList();

    const expectedColumns = [
        "Schedule ID",
        "Movie Title",
        "Theater",
        "Show Date",
        "Show Time",
        "Subtitles",
        "IMAX",
        "Notes"
    ];

    for (const column of expectedColumns) {
        await expect(page.locator(`table th:has-text("${column}")`)).toBeVisible();
    }

    console.log("Cinema List table columns validated successfully.");
  });

    test('TC_006 - Verify pagination in Cinema List', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const detailsPage = new DetailsPage(page);
    const cinemaListPage = new CinemaListPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'password');

    for (const show of shows) {
      await cinemaListPage.createNewShow();

      await detailsPage.enterMovieTitle(show.movie);
      await detailsPage.selectTheater(show.theater);
      await detailsPage.enterShowDate(show.date);
      await detailsPage.enterShowTime(show.time);
      await detailsPage.enterPrice(show.price);

      await detailsPage.clickSaveButton();

      const message = await detailsPage.getSuccessBannerMessage();
      expect(message).toContain('✓ Cinema show saved successfully!');

      await detailsPage.clickBackButton();
    }

    const rows = cinemaListPage.getAllTableRows();
    await expect(rows).toHaveCount(10);

    const nextButton = cinemaListPage.getPaginationNextButton();
    await expect(nextButton).toBeVisible();

    await nextButton.click();

    const rowsPage2 = cinemaListPage.getAllTableRows();
    await expect(rowsPage2).toHaveCount(1);

    const pageInfo = cinemaListPage.getPaginationInfo(); 
    await expect(pageInfo).toContainText('Page 2 of 2 (11 total records)');
  });

  test('TC_007 - Verify sorting for Schedule ID column', async ({ page }) => {
    

    const loginPage = new LoginPage(page);
    const cinemaListPage = new CinemaListPage(page);
    const detailsPage = new DetailsPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'password');
    await cinemaListPage.createNewShow();

    await detailsPage.enterMovieTitle("Avatar");
    await detailsPage.selectTheater("Theater 1");
    await detailsPage.enterShowTime("18:00");
    await detailsPage.enterShowDate("25/11/2025");
    await detailsPage.enterPrice("150");
    await detailsPage.enterNotes("Test show");

    await detailsPage.clickSaveButton();

    const message = await detailsPage.getSuccessBannerMessage();
    expect(message).toContain('Cinema show saved successfully!');

    await detailsPage.navigateToCinemaList();

    const scheduleIdCells = await cinemaListPage.getScheduleIdCells(); 
    await expect(scheduleIdCells.first()).toBeVisible();

    const idsBefore = await scheduleIdCells.allTextContents();

    await cinemaListPage.clickScheduleIdHeader();

    const idsAsc = await scheduleIdCells.allTextContents();

    const sortedAsc = [...idsBefore]
    .map(id => Number(id))
    .sort((a, b) => a - b)
    .map(id => id.toString()); 

    expect(idsAsc).toEqual(sortedAsc);

    await cinemaListPage.clickScheduleIdHeader();

    const idsDesc = await scheduleIdCells.allTextContents();

    const sortedDesc = [...idsBefore]
    .map(id => Number(id))
    .sort((a, b) => b - a)
    .map(id => id.toString());

    expect(idsDesc).toEqual(sortedDesc);
  });

  test('TC_008 - Verify sorting for Movie Title column', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cinemaListPage = new CinemaListPage(page);
  const detailsPage = new DetailsPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'password');
    await cinemaListPage.createNewShow();

    await detailsPage.enterMovieTitle("The Batman 2");
    await detailsPage.selectTheater("Theater 1");
    await detailsPage.enterShowTime("18:00");
    await detailsPage.enterShowDate("26/11/2025");
    await detailsPage.enterPrice("250");
    await detailsPage.enterNotes("Test show");

    await detailsPage.clickSaveButton();
    await detailsPage.clickBackButton();

    const movieCells = cinemaListPage.getMovieTitleCells();

    await expect(movieCells.first()).toBeVisible();
    const titlesBefore = await movieCells.allTextContents();

    await cinemaListPage.clickMovieTitleHeader();
    const titlesAsc = await movieCells.allTextContents();
    expect(titlesAsc).toEqual([...titlesBefore].sort());

    await cinemaListPage.clickMovieTitleHeader();
    const titlesDesc = await movieCells.allTextContents();
    expect(titlesDesc).toEqual([...titlesBefore].sort().reverse());
});

test('TC_009 - Verify sorting for Show Date column', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cinemaListPage = new CinemaListPage(page);
  const detailsPage = new DetailsPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'password');
    await cinemaListPage.createNewShow();

    await detailsPage.enterMovieTitle("Avatar");
    await detailsPage.selectTheater("Theater 1");
    await detailsPage.enterShowTime("18:00");
    await detailsPage.enterShowDate("25/11/2025");
    await detailsPage.enterPrice("150");
    await detailsPage.enterNotes("Test show");

    await detailsPage.clickSaveButton();
    await detailsPage.clickBackButton();

  const dateCells = cinemaListPage.getShowDateCells();
  await expect(dateCells.first()).toBeVisible();
  const datesBefore = await dateCells.allTextContents();

  // Sort ascending
  await cinemaListPage.clickShowDateHeader();
  const datesAsc = await dateCells.allTextContents();
  const sortedAsc = [...datesBefore].sort((a, b) => new Date(a.split('/').reverse().join('-')).getTime() - new Date(b.split('/').reverse().join('-')).getTime());
  expect(datesAsc).toEqual(sortedAsc);

  // Sort descending
  await cinemaListPage.clickShowDateHeader();
  const datesDesc = await dateCells.allTextContents();
  const sortedDesc = [...datesBefore].sort((a, b) => new Date(b.split('/').reverse().join('-')).getTime() - new Date(a.split('/').reverse().join('-')).getTime());
  expect(datesDesc).toEqual(sortedDesc);
});

test('TC_010 - Verify Export button when shows exist', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cinemaListPage = new CinemaListPage(page);
  const detailsPage = new DetailsPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'password');
    await cinemaListPage.createNewShow();

    await detailsPage.enterMovieTitle("Avatar");
    await detailsPage.selectTheater("Theater 1");
    await detailsPage.enterShowTime("18:00");
    await detailsPage.enterShowDate("25/11/2025");
    await detailsPage.enterPrice("150");
    await detailsPage.enterNotes("Test show");

    await detailsPage.clickSaveButton();
    await detailsPage.clickBackButton();

  const exportBtn = cinemaListPage.getExportButton();
  await expect(exportBtn).toBeEnabled();


});

test('TC_011 - Verify New Show button visibility and navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cinemaListPage = new CinemaListPage(page);

  await loginPage.navigate();
  await loginPage.login('Admin', 'password');

  const newShowBtn = cinemaListPage.getNewShowButton();
  await expect(newShowBtn).toBeVisible();
  await newShowBtn.click();

  const header = await page.locator('h3:has-text("Cinema Scheduler")').textContent();
  expect(header).toContain("Cinema Scheduler");
});
