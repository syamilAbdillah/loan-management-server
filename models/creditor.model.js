const { DataTypes } = require('sequelize')

module.exports = function(sequelize, Contact){
	return sequelize.define('Creditor', {
		ContactId: {
			type: DataTypes.UUID,
			primaryKey: true,
			references: {
				model: Contact,
				key: 'id'
			}
		}
	})
}