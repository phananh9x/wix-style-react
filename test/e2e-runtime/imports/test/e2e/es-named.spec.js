describe('React application with ES6 named imports', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3105/?type=es-named');
  });
  it('should load App with ES6 named imports', async () => {
    const selector = '[data-name="App"]';
    await page.waitForSelector(selector);

    expect(await page.$eval(selector, e => !!e)).toBe(true);
  });

  it('should load components with ES6 named imports', async () => {
    const selector = '[data-name="ES-Named-Text"]';
    await page.waitForSelector(selector);

    expect(await page.$eval(selector, e => !!e)).toBe(true);
  });
});
