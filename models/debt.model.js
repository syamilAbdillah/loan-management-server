const { DataTypes } = require('sequelize')

module.exports = (sequelize, Loan, Creditor) => {
	return sequelize.define('Debt', {
		LoanId: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			references: {
				model: Loan,
				key: 'id'
			}
		},
		CreditorContactId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Creditor,
				key: 'ContactId'
			}
		}
	})
}