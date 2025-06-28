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
      validate: {
      notEmpty: {
        msg: "El nombre no puede estar vacío",
      },
      notNull: {
        msg: "El nombre es obligatorio",
      },
      isValidName(value) {
        if (value.trim() === "") {
          throw new Error("El nombre no puede contener solo espacios");
        }
      }
    }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
      notEmpty: {
        msg: "El email no puede estar vacío",
      },
      notNull: {
        msg: "El email es obligatorio",
      }
    }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
      notEmpty: {
        msg: "La contraseña no puede estar vacía",
      },
      notNull: {
        msg: "La contraseña es obligatoria",
      },
      len: {
        args: [6],
        msg: "La contraseña debe tener al menos 6 caracteres",
      },
    }
    },
    rol: {
      type: DataTypes.ENUM("admin", "operador"),
      allowNull: false,
      defaultValue: "operador",
      notNull: {
        msg: "El rol es obligatorio",
      },
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
