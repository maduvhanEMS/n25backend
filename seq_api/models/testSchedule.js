"use strict";

module.exports = (sequelize, DataTypes) => {
  const TestSchedule = sequelize.define("TestSchedule", {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    start: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Received",
    },
    reportNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    files: DataTypes.ARRAY(DataTypes.STRING),
  });
  TestSchedule.associate = function (models) {
    TestSchedule.belongsTo(models.TestRequest, {
      foreignKey: "testRequestId",
      as: "testSchedule",
    });
  };
  return TestSchedule;
};
