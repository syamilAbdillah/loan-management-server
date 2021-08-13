const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define('Loan', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		remaining: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		nominal: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	})
} 