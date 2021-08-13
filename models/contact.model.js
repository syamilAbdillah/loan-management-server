const { DataTypes } = require('sequelize')

module.exports = (sequelize, User) => {
	return sequelize.define('Contact', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		UserId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: 'id'
			}
		}
	})
}