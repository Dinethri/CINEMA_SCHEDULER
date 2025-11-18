import { test, expect } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import CinemaListPage from './pages/CinemaListPage';

test.describe('Login Flow', () => {
    //Verify login function with correct credentials
  test('TC_001 - Successful login redirects to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new CinemaListPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'password');

    const message = await dashboard.getWelcomeMessage();
    // expect(page).toHaveTitle('newURL');//check the new URL
    expect(message).toContain('Welcome');
    console.log('Running test: Successful login');
  });

  //Verify login function with incorrect credentials
  test('TC_002 - Login test with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', '12345');

    const message = await loginPage.getUnsuccessfullLoginMessage();
    expect(message).toContain('Invalid username or password');
    console.log('Running test: Unsuccessful login');
  });
});
