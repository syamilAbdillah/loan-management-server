const { Sequelize } 			= require('sequelize')
const createUserModel 		= require('./user.model')
const createContactModel 	= require('./contact.model')
const createCreditorModel	= require('./creditor.model')
const createDebtorModel		= require('./debtor.model')
const createLoanModel		= require('./loan.model')
const createDebtModel		= require('./debt.model')
const createCreditModel		= require('./credit.model')
const createPaymentModel	= require('./payment.model')





/**
 *
 * INITIALIZE SEQUELIZE
 *  
 **/

const sequelize = new Sequelize({
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	define: {
		freezeTableName: true
	}
})





/***
 *	
 * INITIALIZE MODEL
 *  
 ***/

const User 			= createUserModel(sequelize)
const Contact 		= createContactModel(sequelize, User)
const Creditor		= createCreditorModel(sequelize, Contact)
const Debtor 		= createDebtorModel(sequelize, Contact)
const Loan 			= createLoanModel(sequelize)
const Debt 			= createDebtModel(sequelize, Loan, Creditor)
const Credit 		= createCreditModel(sequelize, Loan, Debtor)
const Payment 		= createPaymentModel(sequelize, Loan)




/***
 *
 * TABLE ASSOCIATION
 * 
 ***/

// user 1:n contact
User.hasMany(Contact)
Contact.belongsTo(User)

// contact 1:1 creditor
Contact.hasOne(Creditor, { onDelete: 'CASCADE' })
Creditor.belongsTo(Contact)

// contact 1:1 debtor
Contact.hasOne(Debtor, { onDelete: 'CASCADE' })
Debtor.belongsTo(Contact)

// loan 1:1 debt
Loan.hasOne(Debt, { onDelete: 'CASCADE' })
Debt.belongsTo(Loan)

// loan 1:1 credit
Loan.hasOne(Credit, { onDelete: 'CASCADE' })
Credit.belongsTo(Loan)

// creditor 1:n debt
Creditor.hasMany(Debt, { onDelete: 'CASCADE' })
Debt.belongsTo(Creditor)

// debtor 1:n credit
Debtor.hasMany(Credit, { onDelete: 'CASCADE' })
Credit.belongsTo(Debtor)

// loan 1:n payment
Loan.hasMany(Payment, { onDelete: 'CASCADE' })
Payment.belongsTo(Loan)





// model & db sync
sequelize.sync({ alter: true })
	.then((arg) => console.log('db is sync'))
	.catch(error => console.log('db is failed to sync', error))


module.exports = {
	sequelize,
	User,
	Contact,
	Loan,
	Debt,
	Credit,
	Debtor,
	Creditor,
	Payment
}