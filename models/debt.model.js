const { DataTypes } = require('sequelize')

module.exports = (sequelize, Loan, Creditor) => {
	return sequelize.define('Debt', {
		LoanId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Loan,
				key: 'id'
			}
		},
		CreditorId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Creditor,
				key: 'id'
			}
		}
	})
}