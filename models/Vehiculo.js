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
        }
      }
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La marca es obligatoria",
        },
        notEmpty: {
          msg: "La marca no puede estar vacía",
        },
        isValid(value) {
          if (value.trim() === "") {
            throw new Error("La marca no puede contener solo espacios");
          }
        }
      }
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El modelo es obligatorio",
        },
        notEmpty: {
          msg: "El modelo no puede estar vacío",
        },
        isValid(value) {
          if (value.trim() === "") {
            throw new Error("El modelo no puede contener solo espacios");
          }
        }
      }
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
