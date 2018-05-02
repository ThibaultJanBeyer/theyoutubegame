class BaseEntity extends BaseStore {
  constructor() {
    super();
    this.entityName = 'genericEntity';
  }

  /**
   * @param {String} property 
   * @param {*} value 
   * @param {*} prev previous property value 
   */
  publishChange(property, value, prev) {
    topic.publish(`${this.storeName}/${this.entityName}/${property}/update`, {
      id: this.id, prev,
      property, value
    });

    topic.publish(`${this.storeName}/${this.entityName}/update`, {
      id: this.id, prev,
      property, value
    });
  }
}
