module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'addressId', {
      type: Sequelize.INTEGER,
      after: 'role',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'addressId');
  },
};
