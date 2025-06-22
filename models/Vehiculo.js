// models/Vehiculo.js
import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Vehiculo extends Model {}

Vehiculo.init(
  {
    patente: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Vehiculo",
    tableName: "vehiculos",
    timestamps: false,
  }
);

export default Vehiculo;
