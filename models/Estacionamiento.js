import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js"; // asegúrate de que esta ruta es correcta

class Estacionamiento extends Model {}

Estacionamiento.init(
  {
    piso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("disponible", "ocupado"),
      allowNull: false,
      defaultValue: "disponible",
    },
  },
  {
    sequelize: connection,
    modelName: "Estacionamiento",
    tableName: "lugares", // coincide con el nombre de la tabla en tu .sql
    timestamps: false,
  }
);

export default Estacionamiento;
