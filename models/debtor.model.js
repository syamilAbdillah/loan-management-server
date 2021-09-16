const { DataTypes } = require('sequelize')

module.exports = function(sequelize, Contact){
	return sequelize.define('Debtor', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},		
		ContactId: {
			type: DataTypes.UUID,
			references: {
				model: Contact,
				key: 'id'
			}
		}
	})
}