const { DataTypes } = require('sequelize')

module.exports = function(sequelize, Contact){
	return sequelize.define('Creditor', {
		ContactId: {
			type: DataTypes.UUID,
			references: {
				model: Contact,
				key: 'id'
			}
		}
	})
}