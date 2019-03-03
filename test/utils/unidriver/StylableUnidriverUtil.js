/**
 * This is an implementation of StylableDOMUtil for Unidriver.
 *
 * Work-In-Progress: Not all methods are implemented yet !
 */
export class StylableUnidriverUtil {
  constructor(style) {
    this.style = style;
  }

  /**
   * Returns true is the element has the specified state name with value 'true'.
   *
   * @returns boolean
   */
  async hasStyleState(base, stateName, param = true) {
    const { stateKey, styleState } = this.getStateDataAttrKey(stateName, param);
    const actual = await base.attr(stateKey);
    return String(styleState[stateKey]) === actual;
  }

  /**
   * Get style state value
   *
   * @returns state or null if not found
   */
  async getStyleState(base, stateName) {
    const { stateKey } = this.getStateDataAttrKey(stateName);
    return base.attr(stateKey);
  }

  getStateDataAttrKey(state, param = true) {
    const styleState = this.style.$cssStates({ [state]: param });
    return { stateKey: Object.keys(styleState)[0], styleState };
  }
}
