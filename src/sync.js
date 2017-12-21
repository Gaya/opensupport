// @flow

import sequelize from './connect';

import './models/Package';

sequelize.sync().then(() => sequelize.close());
