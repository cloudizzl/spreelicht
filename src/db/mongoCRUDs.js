import { MongoClient } from "mongodb";

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
    const query = {_id: locationId};
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
    return result;
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
    const query = {_id: locationId};
    const updateDoc = {
      $set: locationData
    };
    const result = await locations.updateOne(query, updateDoc);
    if (result.modifiedCount === 0) {
      console.log("No documents matched the query. Updated 0 documents.");
    }
    return result;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};


export const deleteLocation = async function(locationId) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const locations = database.collection('locations');
    const query = {_id: locationId};
    const result = await locations.deleteOne(query);
    if (result.deletedCount === 0) {
      console.log("No documents matched the query. Deleted 0 documents.");
    } else {
      console.log(`Deleted document with _id: ${locationId}`);
    }
    return result;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};
