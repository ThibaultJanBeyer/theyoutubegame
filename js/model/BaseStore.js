class BaseStore {
  constructor() {
    this.storeName = 'genericStore';
  }

  /**
   * Updates any property and publishes it
   * @param {String} property e.g. 'score'
   * @param {*} value
   */
  update(property, value) {
    const prev = this[`_${property}`];
    this[`_${property}`] = value;
    this.publishChange(property, value, prev);
  }

  /**
   * @param {String} property 
   * @param {*} value 
   * @param {*} prev previous property value 
   */
  publishChange(property, value, prev) {
    topic.publish(`${this.storeName}/update`, {
      prev,
      property, value
    });
  }
}
