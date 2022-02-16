// Must be module.exports .
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'Users',
      {
        email: 'test@profico.com',
      },
      {
        id: 33,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'Users',
      {
        email: null,
      },
      {
        id: 33,
      },
    );
  },
};
