import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js"; // asegúrate de que esta ruta es correcta

class Estacionamiento extends Model {}

Estacionamiento.init(
  {
    piso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "El campo 'piso' es obligatorio." },
        isInt: { msg: "El piso debe ser un número entero." },
        
        max: {
          args: [10],
          msg: "El piso no puede ser mayor que 10.",
        },
      }
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "El campo 'numero' es obligatorio." },
        isInt: { msg: "El número debe ser un número entero." },
        min: {
          args: [1],
          msg: "El número no puede ser menor que 1.",
        },
        
      }
    },
    estado: {
      type: DataTypes.ENUM("disponible", "ocupado"),
      allowNull: false,
      defaultValue: "disponible",
      validate: {
        isIn: {
          args: [["disponible", "ocupado"]],
          msg: "El estado debe ser 'disponible' u 'ocupado'.",
        },
      }
    }
  },
  {
    sequelize: connection,
    modelName: "Estacionamiento",
    tableName: "lugares", // coincide con el nombre de la tabla en tu .sql
    timestamps: false,
  }
);

export default Estacionamiento;
