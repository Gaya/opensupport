// @flow

import Sequelize from 'sequelize';

import sequelize from '../connect';

const Package = sequelize.define('Package', {
  name: Sequelize.STRING,
  data: Sequelize.JSON,
});

export default Package;
