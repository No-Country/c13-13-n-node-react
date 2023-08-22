const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "message",
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          sentAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          status: {
            type: DataTypes.ENUM('active', 'deleted', 'edited'),
            defaultValue: 'active',
          },

    },
    { timestamps: false }
  );
};