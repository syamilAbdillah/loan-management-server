const { Sequelize } 			= require('sequelize')
const createUserModel 		= require('./user.model')
const createContactModel 	= require('./contact.model')
const createCreditorModel	= require('./creditor.model')
const createDebtorModel		= require('./debtor.model')
const createLoanModel		= require('./loan.model')
const createCreditModel		= require('./credit.model')
const createDebtModel		= require('./debt.model')
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

const Credit 		= createCreditModel(sequelize, Loan, Debtor)
const Debt 			= createDebtModel(sequelize, Loan, Creditor)

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
sequelize.sync()
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

/*


CREATE TABLE IF NOT EXISTS "Credit" (
	"LoanId" UUID NOT NULL  
		REFERENCES "Loan" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
	"DebtorContactId" UUID NOT NULL 
		REFERENCES "Debtor" ("ContactId") ON DELETE CASCADE ON UPDATE CASCADE, 
	"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	PRIMARY KEY ("LoanId"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Credit' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): DROP TABLE IF EXISTS "Debt" CASCADE;

CREATE TABLE IF NOT EXISTS "Debt" (
	"id" UUID , 
	"nominal" INTEGER NOT NULL, 
	"date" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"LoanId" UUID NOT NULL 
		REFERENCES "Loan" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
	"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Debt' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname


*/