const cassandra = require('cassandra-driver');
const assert = require('assert');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'people',
});

//Thong thuong
// const query = "SELECT * FROM subcribers WHERE first_name = 'Tung Duong' ALLOW FILTERING";
// client.execute(query, (err, result) => {
//     assert.ifError(err);
//     console.log(result.first());
// });

//Voi tham so
const query1 = 'SELECT * FROM subcribers WHERE first_name = ? ALLOW FILTERING';
client.execute(query1, ['Bob'], (err, result) => {
    assert.ifError(err);
    console.log(result.rows);
});

const insert = 'INSERT INTO subcribers(id, email, first_name, last_name) VALUES(now(), ?, ?, ?)';
client.execute(insert, ['tungbx@vnu.edu.vn', 'Xuan Tung', 'Bui']);