
import { test, expect } from '@playwright/test';

test.describe('Tests are starting from the Home Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://coinmarketcap.com/');
        //Uncomment next line if you want to run the tests one by one with resolution 1920:1080
        //page.setViewportSize({ width: 1920, height: 1080 });
    })

    test('Search Functionality - Validate that users can enter a cryptocurrency name, search for it, and see relevant search results', async ({ page }) => {
        await page.getByText('Search', { exact: true }).click();
        await page.getByPlaceholder('Search coin, pair, contract address, exchange, or post').fill('bitcoin');
        await page.getByPlaceholder('Search coin, pair, contract address, exchange, or post').press('Enter');
        await expect(page).toHaveURL('https://coinmarketcap.com/currencies/bitcoin/');
    })

    test('Navigation - Valdate navigation bettwin Home Page and Bitcoin Page', async ({ page }) => {
        await page.getByRole('link', { name: 'BTC logo Bitcoin BTC' }).click();
        await expect(page).toHaveURL('https://coinmarketcap.com/currencies/bitcoin/');
        await page.goto('https://coinmarketcap.com/');
        await expect(page).toHaveURL('https://coinmarketcap.com/');
    })

    test('Pagenation- Validate that users can navigate through multiple pages of results', async ({ page }) => {
        await page.getByRole('button', { name: 'Page 2' }).click();
        await expect(page).toHaveURL('https://coinmarketcap.com/?page=2');
        await page.getByRole('button', { name: 'Page 3' }).click();
        await expect(page).toHaveURL('https://coinmarketcap.com/?page=3');
    })

    test('Sorting Functionality - Verify that the sorting options (price) work as expected', async ({ page }) => {
        await page.getByText('Price', { exact: true }).click();
        await expect(page.getByRole('cell', { name: 'H Price' }).locator('span').nth(1)).toBeVisible;
        const descending = await page.getByText('Price', { exact: true }).allTextContents();
        await page.getByText('Price', { exact: true }).click();
        const ascending = await page.getByText('Price', { exact: true }).allTextContents();
        await expect(descending).toEqual(ascending.reverse());
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    })
})

