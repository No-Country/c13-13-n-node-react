const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Chat",
    {
      title: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          max: 5,
          min: 0,
        },
      },
      maxParticipants: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
            min: 1,
            max: 50,
          }, // Establece el número máximo predeterminado
      }
    //   ,
    //   review: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    //   },
    },
    { timestamps: false }
  );
};
