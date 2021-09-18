const { DataTypes } = require('sequelize')

module.exports = function(sequelize, Contact){
	return sequelize.define('Debtor', {
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