import { MongoClient, ObjectId } from "mongodb";

// Replace db_user, db_pass, db_name, db_collection
const db_user = 'webappdev_locations_wad_locations_user';
const db_pass = 'XwfJj4EXl';
const db_name = 'webappdev_locations';
const db_collection = 'users';
const dbHostname = "mongodb1.f4.htw-berlin.de"
const dbPort = 27017
const uri = `mongodb://${db_user}:${db_pass}@${dbHostname}:${dbPort}/${db_name}`;

export const findOneUser  = async function(uNameIn, passwdIn) {
  const client = new MongoClient(uri);
  console.log ("DB: " + uNameIn + "," + passwdIn);
  try {
    const database = client.db(db_name);
    const users = database.collection(db_collection);
    const query = {username: uNameIn, password: passwdIn};
    const doc = await users.findOne(query);
    if (doc) {
      delete doc.password;
    }
    return doc;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};

export const findAllUsers  = async function() {
  const client = new MongoClient(uri);
  try {  
    const database = client.db(db_name);
    const users = database.collection(db_collection);
    const query = {};
    const cursor = users.find(query);
    // Print a message if no documents were found
    if ((await users.countDocuments(query)) === 0) {
      console.log("No documents found!");
      return null;
    }
    let docs = new Array();
    for await (const doc of cursor) {
      delete doc.password;
      docs.push(doc);
    }
    return docs;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};

export const findOneLocation = async function(locationId) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const locations = database.collection('locations');
    const query = { _id: typeof locationId === "string" ? new ObjectId(locationId) : locationId };
    const doc = await locations.findOne(query);
    return doc;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};

export const findAllLocations = async function() {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const locations = database.collection('locations');
    const query = {};
    const cursor = locations.find(query);
    // Print a message if no documents were found
    if ((await locations.countDocuments(query)) === 0) {
      console.log("No documents found!");
      return null;
    }
    let docs = new Array();
    for await (const doc of cursor) {
      docs.push(doc);
    }
    return docs;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};


export const addLocation = async function(locationData) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const locations = database.collection('locations');
    const result = await locations.insertOne(locationData);
    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    const insertedDoc = await findOneLocation(result.insertedId);
    return insertedDoc;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};

export const updateLocation = async function(locationId, locationData) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const locations = database.collection('locations');
    let query;
    try {
      query = { _id: new ObjectId(locationId) };
    } catch (e) {
      query = { _id: locationId }; // fallback if not a valid ObjectId
    }
    const updateDoc = { $set: locationData };
    console.log("Updating location with query:", query);
    console.log("Update document:", updateDoc);
    const result = await locations.updateOne(query, updateDoc);
    console.log("Update result:", result);
    if (result.matchedCount === 0) {
      console.log("No documents matched the query. Updated 0 documents.");
    }
    return result;
  } finally {
    await client.close();
  }
};

export const deleteLocation = async function(locationId) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const locations = database.collection('locations');
    let query;
    try {
      query = { _id: new ObjectId(locationId) };
    } catch (e) {
      query = { _id: locationId }; // fallback if not a valid ObjectId
    }
    console.log("Deleting location with query:", query);
    const result = await locations.deleteOne(query);
    console.log("Delete result:", result);
    return result;
  } finally {
    await client.close();
  }
};