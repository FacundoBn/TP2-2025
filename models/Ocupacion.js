module.exports = (sequelize, DataTypes) => {
  const Ocupacion = sequelize.define("Ocupacion", {
    hora_entrada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora_salida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, 
                                     
{
    tableName: 'ocupaciones'
  });

  Ocupacion.associate = (models) => {
    Ocupacion.belongsTo(models.Vehiculo, {
      foreignKey: 'patente',
      targetKey: 'patente',
      onDelete: 'CASCADE'
    });
    Ocupacion.belongsTo(models.Lugar, {
      foreignKey: 'lugar_id',
      onDelete: 'CASCADE'
    });
  };

  return Ocupacion;
};

