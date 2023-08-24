const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Room",
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
      image: {
        type: DataTypes.STRING,
      },
      maxParticipants: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
            min: 1,
            max: 50,
          }, // Establece el número máximo predeterminado
      },
      participants: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1,
            max: 50,
          }, // Establece el número máximo predeterminado
      },
      createdBy: {
        type: DataTypes.INTEGER, // ID del usuario que creó la sala
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Valor por defecto: fecha y hora actual
      },
    //   ,
    //   review: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    //   },
    },
    { timestamps: false }
  );
};
