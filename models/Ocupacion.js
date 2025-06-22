import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import Estacionamiento from "./Estacionamiento.js";
import Vehiculo from "./Vehiculo.js";

class Ocupacion extends Model {}

Ocupacion.init(
  {
    hora_entrada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora_salida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lugar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Ocupacion",
    tableName: "ocupaciones",
    timestamps: false,
  }
);

// Asociaciones
Ocupacion.belongsTo(Vehiculo, {
  foreignKey: "patente",
  targetKey: "patente",
  onDelete: "CASCADE",
});

Ocupacion.belongsTo(Estacionamiento, {
  foreignKey: "lugar_id",
  onDelete: "CASCADE",
});

export default Ocupacion;
