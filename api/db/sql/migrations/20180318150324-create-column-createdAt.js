module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Advertiser', 'createdAt', Sequelize.DATE)
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Advertiser', 'createdAt')
  }
}
