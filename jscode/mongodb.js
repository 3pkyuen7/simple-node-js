const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'myproject';

(async function() {
    let client;
    try {
    client = await MongoClient.connect(url,{ useNewUrlParser: true });
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    // Get the collection
    const col = db.collection('find');
    // Insert multiple documents
    /*
    const r = await col.insertMany([{_id:"testingid",a:1}, {_id:"testingid2",a:1}, {a:1}]);
    assert.equal(3, r.insertedCount);
    console.log(r.insertedCount);
    */
    // Get first two documents that match the query
    var password = "testingPassword";
    //col.insertMany([{_id:password,userName:"userName"}]);
    const docs = await col.find({_id:password}).toArray();
    console.log(docs);
    console.log(docs.length);
    } catch (err) {
    console.log(err.stack);
    }
    // Close connection
    client.close();
})();