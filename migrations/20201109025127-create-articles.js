'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      clean_url: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      status: {
        type : Sequelize.STRING,
        defaultValue : 'draft'
      },
      user_id : {
        type : Sequelize.STRING,
        allowNull : false,
        validate: {
          notNull: { msg: "user id is required" },
        }
      },
      banned : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      bannedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('articles');
  }
};