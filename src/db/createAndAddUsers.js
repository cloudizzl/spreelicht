
const db_user = 'webappdev_locations_wad_locations_user';
const db_pass = 'XwfJj4EXl';
const db_name = 'webappdev_locations';
const db_collection = 'users';
const dbHostname = "mongodb1.f4.htw-berlin.de"
const dbPort = 27017
const uri = `mongodb://${db_user}:${db_pass}@${dbHostname}:${dbPort}/${db_name}`;

let MongoClient = require('mongodb').MongoClient;
MongoClient.connect(uri, async function(err, db) {
  if (err) throw err;
  let dbo = db.db(db_name);
  dbo.createCollection(db_collection, function(err, res){
    if (err) throw err;
    console.log("Collection "+ db_collection+" has been created!")
  })
  let admina = {username: "admina", password: "password",name: "Mina", role: "admin"};
  let normalo = {username: "normalo", password: "password", name: "Norman", role: "non-admin"};
  dbo.collection(db_collection).insertOne(admina, function(err, res){
    if (err) throw err;
    console.log("admina has been inserted")
  })
  dbo.collection(db_collection).insertOne(normalo,function(err, res){
    if (err) throw err;
    console.log("normalo has been inserted");
  })
  await db.close();
})