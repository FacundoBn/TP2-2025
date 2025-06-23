import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("admin", "operador"),
      allowNull: false,
      defaultValue: "operador",
    },
    creado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: connection,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: false,
  }
);

export default Usuario;
