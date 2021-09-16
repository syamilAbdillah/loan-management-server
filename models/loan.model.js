const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define('Loan', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		nominal: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	})
} 