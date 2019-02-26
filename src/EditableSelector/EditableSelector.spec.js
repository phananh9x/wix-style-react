import React from 'react';
import sinon from 'sinon';
import editableSelectorDriverFactory from './EditableSelector.driver';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import EditableSelector from './EditableSelector';

describe('EditableSelector', () => {
  const createDriver = createDriverFactory(editableSelectorDriverFactory);
  let props;

  beforeEach(() => {
    props = {};
  });

  it('should have a list of selectors', () => {
    props.options = [{ title: 'a' }, { title: 'b' }];
    const driver = createDriver(<EditableSelector {...props} />);
    expect(driver.items()).toHaveLength(props.options.length);
  });

  it('should have all selector data ', () => {
    props.options = [{ isSelected: true, title: 'Shir', onToggle: () => {} }];
    const driver = createDriver(<EditableSelector {...props} />);
    const selector = driver.items()[0];
    expect(selector.isChecked()).toEqual(props.options[0].isSelected);
    expect(selector.titleTextDriver().getText()).toEqual(
      props.options[0].title,
    );
  });

  it('should render a title', () => {
    props.title = "I'm a Title";
    const driver = createDriver(<EditableSelector {...props} />);
    expect(driver.title()).toEqual(props.title);
  });

  it('should render "add row" button', () => {
    props.newRowLabel = 'add new!';
    const driver = createDriver(<EditableSelector {...props} />);
    expect(driver.newRowButton().textContent).toEqual(props.newRowLabel);
  });

  it('should call onOptionAdded', () => {
    props.onOptionAdded = sinon.spy();
    const driver = createDriver(<EditableSelector {...props} />);
    const newTitle = 'new option';
    driver.addNewRow(newTitle);
    driver.clickApprove();
    expect(props.onOptionAdded.calledWith({ newTitle })).toEqual(true);
  });

  it('should exit editing mode after approve click', () => {
    const driver = createDriver(<EditableSelector {...props} />);
    const label = 'new option';
    driver.addNewRow(label);
    driver.clickApprove();
    expect(driver.isEditing()).toEqual(false);
  });

  it('should exit editing mode after cancel click', () => {
    const driver = createDriver(<EditableSelector {...props} />);
    const label = 'new option';
    driver.addNewRow(label);
    driver.clickCancel();
    expect(driver.isEditing()).toEqual(false);
  });

  it('should have edit and delete actions for each option', () => {
    props.options = [{ isSelected: false, title: 'Shir' }];
    const driver = createDriver(<EditableSelector {...props} />);
    expect(driver.deleteButtonAt(0)).not.toBeUndefined();
    expect(driver.editButtonAt(0)).not.toBeUndefined();
  });

  it('should get "edit" button text from props', () => {
    props.options = [{ isSelected: false, title: 'Shir' }];
    props.editButtonText = 'Edit Label';
    const driver = createDriver(<EditableSelector {...props} />);
    expect(driver.editButtonAt(0).textContent).toEqual(props.editButtonText);
  });

  it('should call onOptionEdit', () => {
    props.options = [{ isSelected: false, title: 'Shir', onToggle: () => {} }];
    props.onOptionEdit = sinon.spy();
    const driver = createDriver(<EditableSelector {...props} />);
    const newTitle = 'yo';
    driver.editRow(0, newTitle);
    driver.clickApprove();
    expect(props.onOptionEdit.calledWith({ newTitle, index: 0 })).toEqual(true);
  });

  it('should call onOptionToggle', () => {
    props.options = [{ isSelected: false, title: 'Shir' }];
    props.onOptionToggle = sinon.spy();
    const driver = createDriver(<EditableSelector {...props} />);
    driver.toggleItem(0);
    expect(props.onOptionToggle.calledOnce).toEqual(true);
    expect(props.onOptionToggle.calledWith(0)).toBe(true);
  });

  it('should call onOptionDelete', () => {
    props.options = [{ isSelected: false, title: 'Shir', onToggle: () => {} }];
    props.onOptionDelete = sinon.spy();
    const driver = createDriver(<EditableSelector {...props} />);
    driver.deleteRow(0);
    expect(props.onOptionDelete.calledWith({ index: 0 })).toEqual(true);
  });

  it('should use checkbox toggles', () => {
    props.toggleType = 'checkbox';
    props.options = [{ isSelected: false, title: 'Shir' }];
    const driver = createDriver(<EditableSelector {...props} />);
    const selector = driver.items()[0];
    expect(selector.toggleType()).toEqual(props.toggleType);
  });

  it('should use radio toggles', () => {
    props.toggleType = 'radio';
    props.options = [{ isSelected: false, title: 'Shir' }];
    const driver = createDriver(<EditableSelector {...props} />);
    const selector = driver.items()[0];
    expect(selector.toggleType()).toEqual(props.toggleType);
  });

  it('should stop edit when click add new row', () => {
    props.options = [{ isSelected: false, title: 'Shir', onToggle: () => {} }];
    const driver = createDriver(<EditableSelector {...props} />);
    const newTitle = 'yo';
    expect(driver.isEditingRow()).toBeFalsy();
    driver.startEditing(0, newTitle);
    expect(driver.isEditingRow()).toBeTruthy();
    driver.startAdding();
    expect(driver.isEditingRow()).toBeFalsy();
    expect(driver.isAddingRow()).toBeTruthy();
  });

  it('should stop add when click edit row', () => {
    props.options = [{ isSelected: false, title: 'Shir', onToggle: () => {} }];
    const driver = createDriver(<EditableSelector {...props} />);
    const newTitle = 'yo';
    expect(driver.startAdding()).toBeFalsy();
    driver.startAdding();
    expect(driver.isAddingRow()).toBeTruthy();
    driver.startEditing(0, newTitle);
    expect(driver.isEditingRow()).toBeTruthy();
    expect(driver.isAddingRow()).toBeFalsy();
  });
});
