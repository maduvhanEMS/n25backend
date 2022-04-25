module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Tests", "additional", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Tests", "additional");
  },
};
