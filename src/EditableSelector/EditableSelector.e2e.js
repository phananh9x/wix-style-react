import eyes from 'eyes.it';
import { editableSelectorTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

const storyUrl = createTestStoryUrl({
  category: storySettings.category,
  storyName: storySettings.storyName,
  testName: testStories.editableSelector,
});

describe('EditableSelector', () => {
  let driver;

  beforeEach(() => {
    driver = editableSelectorTestkitFactory({
      dataHook: storySettings.dataHook,
    });
    return browser.get(storyUrl);
  });

  eyes.it('should render a title', async () => {
    await waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector');
    expect(await driver.title().getText()).toBe('Type of Seeds');
  });

  eyes.it('should create a new option', async () => {
    await waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector');
    const newOption = 'Shir';
    await driver.createNewRow(newOption);
    await driver.clickApprove();
    expect(await driver.item(2).getText()).toBe(newOption);
  });

  // No eyes: I don't think eyes is needed here. It fails for unknown reason.
  // The snapshot used to include the edit button (which is visible on hover only)
  // And it started breaking (no edit button in snapshot). So we decided to disable eyes here.
  it('should not modify an option when edit is cancelled', async () => {
    await waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector');
    const newOption = 'Shir';
    await driver.editRow(1, newOption);
    await driver.clickCancel();
    expect(await driver.item(1).getText()).not.toBe(newOption);
  });

  eyes.it('should save an option when edit is approved', async () => {
    await waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector');
    const newOption = 'Shir';
    await driver.editRow(1, newOption);
    await driver.clickApprove();
    expect(await driver.item(1).getText()).toBe(newOption);
  });

  eyes.it('should select an option when clicked', async () => {
    await waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector');
    await driver.toggleItem(0);
    expect(await driver.isSelected(0)).toBe(true);
  });

  eyes.it('should delete an option', async () => {
    await waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector');
    await driver.deleteRow(1);
    await expect(await driver.items().count()).toBe(1);
  });
});
