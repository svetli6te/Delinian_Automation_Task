
import { test, expect } from '@playwright/test';

test.describe('Tests are starting from the CryptoCurency Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://coinmarketcap.com/currencies/bitcoin/');
        //page.setViewportSize({ width: 1920, height: 1080 });
    })

    test('CryptoCurency Details - Validate the Bitcoin details page displays accurate information like price, market cap, volume, etc', async ({ page }) => {
        await expect(page.getByText('Bitcoin Price', { exact: true })).toBeVisible;
        await expect(page.locator('#section-coin-stats').getByText('Market cap', { exact: true })).toBeVisible;
        await expect(page.locator('#section-coin-stats').getByText('Volume (24h)')).toBeVisible;
        await expect(page.getByText('Volume/Market cap (24h)')).toBeVisible;
        await expect(page.getByText('Circulating supply', { exact: true })).toBeVisible;
        await expect(page.getByText('Total supply', { exact: true })).toBeVisible;
        await expect(page.getByText('Max. supply', { exact: true })).toBeVisible;
        await expect(page.getByText('Fully diluted market cap')).toBeVisible;
    })

    test('Curency Conversion - Valdate that users can change the currency used for displaying prices', async ({ page }) => {
        await page.getByRole('button', { name: 'USD H' }).click();
        await page.getByText('Euro').first().click();
        await page.getByRole('button', { name: 'EUR H' }).click();
        await expect(page.getByText('EUR', { exact: true }).nth(2)).toBeVisible;
        await page.getByText('United States Dollar').first().click();
        await expect(page.getByText('USD', { exact: true }).nth(2)).toBeVisible;
    })

    test('Chart Interaction - that users can hover over the chart to see historical price data', async ({ page }) => {
        await page.locator('div:nth-child(2) > .sc-39fac312-0 > .sc-e33569d4-0 > .fullscreen > .chart-wrapper-inner > div:nth-child(5) > .chart-wrapper > .chart > .tv-lightweight-charts > table > tr > td:nth-child(2) > div > canvas:nth-child(2)').first().hover({
            position: {
                x: 309,
                y: 159
            }
        });
        await expect(page.locator('div:nth-child(2) > .sc-39fac312-0 > .sc-e33569d4-0 > .fullscreen > .chart-wrapper-inner > div:nth-child(5) > .chart-wrapper > .chart > .tv-lightweight-charts > table > tr > td:nth-child(2) > div > canvas:nth-child(2)').first()).toBeVisible;
        await page.locator('div:nth-child(2) > .sc-39fac312-0 > .sc-e33569d4-0 > .fullscreen > .chart-wrapper-inner > div:nth-child(5) > .chart-wrapper > .chart > .tv-lightweight-charts > table > tr > td:nth-child(2) > div > canvas:nth-child(2)').first().click({
            position: {
                x: 231,
                y: 120
            }
        });
        await expect(page.locator('div:nth-child(2) > .sc-39fac312-0 > .sc-e33569d4-0 > .fullscreen > .chart-wrapper-inner > div:nth-child(5) > .chart-wrapper > .chart > .tv-lightweight-charts > table > tr > td:nth-child(2) > div > canvas:nth-child(2)').first()).toBeVisible;
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    })
})

