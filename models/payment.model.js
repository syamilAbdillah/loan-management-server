const { DataTypes } = require('sequelize')

module.exports = (sequelize, Loan) => {
	return sequelize.define('Debt', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		nominal: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		LoanId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Loan,
				key: 'id'
			}
		}
	})
}