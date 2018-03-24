module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Advertisers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      age: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Advertisers')
  }
}
