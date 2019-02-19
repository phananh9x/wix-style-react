describe('React application with commonjs requires', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3105/?type=cjs');
  });
  it('should load App with commonjs requires', async () => {
    const selector = '[data-name="App"]';
    await page.waitForSelector(selector);

    expect(await page.$eval(selector, e => !!e)).toBe(true);
  });

  it('should load components with commonjs requires', async () => {
    const selector = '[data-name="CJS-Text"]';
    await page.waitForSelector(selector);

    expect(await page.$eval(selector, e => !!e)).toBe(true);
  });
});
