const cassandra = require('cassandra-driver');
const assert = require('assert');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'people',
});

const query = 'SELECT * FROM subcribers WHERE first_name = ? ALOW FILTERING';
const params = ['Tung Duong', 'Bob'];

client.connect((err) => {
    assert.ifError(err);
});

client.execute(query, params, { prepare: true }).then((err, result) => {
    if (err) assert.ifError(err);
    let user = result;
    console.log(user);
})