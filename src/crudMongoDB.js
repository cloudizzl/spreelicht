const { MongoClient, ObjectId} = require("mongodb");
// // Replace db_user, db_pswd, db_name
const db_user = 'webappdev_locations_wad_locations_user';
const db_pswd = 'XwfJj4EXl';
const db_name = 'webappdev_locations';
const db_collection = 'users';
const uri = `mongodb://${db_user}:${db_pswd}@mongodb1.f4.htw-berlin.de:27017/${db_name}`;
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db(db_name);
    const users = database.collection(db_collection);
    // ***** Start replace ***** //
    const query = {};
    const cursor = users.find(query);
    if ((await users.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    allRecords = new Array();
    for await (const doc of cursor) {
      console.log(doc); // Print returned document
      allRecords.push(doc);
    }
    console.log(allRecords.length);
    // ***** End replace ***** //
  } finally {
    // Ensures that the client will close
    await client.close();
  }
}
run().catch(console.log);
/*
// FIND ONE: Query for a user with the name 'Mina'
    const query = {name: 'Mina' };
    const doc = await users.findOne(query);
    console.log(doc); // Print returned document

//FIND ALL:        
    const query = {};
    const cursor = users.find(query);
    if ((await users.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    allRecords = new Array();
    for await (const doc of cursor) {
      console.log(doc); // Print returned document
      allRecords.push(doc);
    }
    console.log(allRecords.length);

//INSERT ONE:  
    let doc = { username: "maxime", 
                password: "maxime", 
                name: "Maxime", 
                role: "non-admin"};
    const result = await users.insertOne(doc); // insert into user collection
    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

//REPLACE ONE:  
    const objectId = new ObjectId("658073d6d42add12a855fd37");
    const query = { _id: objectId };
    // replace the matched document with the replacement document
    const replacementDocument = {
        username: "maxime",
        password: "secret", 
        name: "Maxime", 
        role: "admin",
    };
    const result = await users.replaceOne(query, replacementDocument);
    console.log(result);
    if (result.modifiedCount === 1) {
      console.log("Successfully updated one document.");
    } else {
      console.log("No documents matched the query. Updated 0 documents.");
    }

//DELETE ONE:
    const objectId = new ObjectId("658073d6d42add12a855fd37");
    const query = { _id: objectId };
    const result = await users.deleteOne(query);
    if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
    }
*/