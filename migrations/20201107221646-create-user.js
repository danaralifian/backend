'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permissionLevel : {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "permission level is required" },
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name is required" },
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "email is required" },
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password is required" },
        }
      },
      image : {
        type : Sequelize.STRING
      },
      banned : {
        type : Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      bannedAt : {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};