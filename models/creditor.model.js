const { DataTypes } = require('sequelize')

module.exports = function(sequelize, Contact){
	return sequelize.define('Creditor', {
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