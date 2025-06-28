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
      validate: {
        notNull: { msg: "La hora de entrada es obligatoria." },
        isDate: { msg: "Debe ser una fecha válida." },
      },
    },
    hora_salida: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          msg: "La hora de salida debe ser una fecha válida.",
        },
      },
    },
    lugar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "El ID del lugar es obligatorio." },
        isInt: { msg: "El ID del lugar debe ser un número entero." },
        min: {
          args: [1],
          msg: "El ID del lugar debe ser mayor a 0.",
        },
      },
    },
    patente: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La patente es obligatoria",
        },
        notEmpty: {
          msg: "La patente no puede estar vacía",
        },
        isAlphanumeric: {
          msg: "La patente solo puede contener letras y números",
        },
        len: {
          args: [6, 8],
          msg: "La patente debe tener entre 6 y 8 caracteres",
        },
      }
    }
    
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
