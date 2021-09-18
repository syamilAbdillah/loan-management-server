const { DataTypes } = require('sequelize')

module.exports = (sequelize, Loan, Debtor) => {
	return sequelize.define('Credit', {
		LoanId: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			references: {
				model: Loan,
				key: 'id'
			}
		},
		DebtorContactId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Debtor,
				key: 'ContactId'
			}
		}
	})
} 