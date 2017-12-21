// @flow
import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
  dialectOptions: {
    charset: 'utf8mb4',
  },
  logging: false,
  operatorsAliases: false,
});

export default sequelize;
