module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Advertiser', 'updatedAt', Sequelize.DATE)
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Advertiser', 'updatedAt')
  }
}
