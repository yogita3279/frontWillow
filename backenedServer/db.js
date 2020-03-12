// import and use mongodb.MongoClient
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionString ='mongodb+srv://yogita:yogit@2923@cluster0-bbz58.mongodb.net/test?retryWrites=true&w=majority';


const dbConnectionUrl = connectionString;



function initialize(dbName, dbCollectionName, successCallback, failureCallback) {
	MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
		if (err) {
			console.log(`[MongoDB connection] ERROR: ${err}`);
			failureCallback(err);        // this should be "caught" by the calling function
		} else {
			const dbObject = dbInstance.db(dbName);
			const dbCollection = dbObject.collection(dbCollectionName);

			console.log("[MongoDB connection] SUCCESS");
			successCallback(dbCollection);
		}
	});
}



module.exports = { initialize };