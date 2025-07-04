import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Rol extends Model {}

Rol.init(
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Rol",
    tableName: "roles",
    timestamps: false,
  }
);

export default Rol;
