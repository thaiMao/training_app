module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('PushSubscription', {
      id: Sequelize.INTEGER,
      endpoint: {
        type: Sequelize.STRING,
        allowNull: false
      },
      keys: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('PushSubscription')
  }
}
