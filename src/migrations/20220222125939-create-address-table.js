module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Address', {
      id: {
        allowNull: true,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      streetAdress: {
        type: Sequelize.STRING,
      },
      streetNumber: {
        type: Sequelize.INTEGER,
      },
      zipCode: {
        type: Sequelize.INTEGER,
      },
      town: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Address');
  },
};
