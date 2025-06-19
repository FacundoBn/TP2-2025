export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('lugares', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    piso: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    numero: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    estado: {
      type: Sequelize.ENUM('disponible', 'ocupado'),
      allowNull: false,
      defaultValue: 'disponible',
    },
    // timestamps: false
  });

  // Si querés agregar la restricción única de piso+numero:
  await queryInterface.addConstraint('lugares', {
    fields: ['piso', 'numero'],
    type: 'unique',
    name: 'unique_piso_numero',
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('lugares');
}
