/** @format */

const _ = require('lodash');

const getInfoData = (fields = [], object = {}) => {
  return _.pick(object, fields);
}; // Function get someinfo

module.exports = {
  getInfoData,
};
