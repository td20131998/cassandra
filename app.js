var cassandra = require('cassandra-driver');
var assert = require('assert');

var authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
var contactPoints = ['127.0.0.1', '127.0.0.1', '127.0.0.1'];
// var PlainTextAuthProvider = new cassandra.auth.PlainTextAuthProvider;

var client = new cassandra.Client({
    contactPoints: ['127.0.0.1:9042'], 
    authProvider: authProvider,
    keyspace: 'grocery'
});

function execute(query, params, callback) {
    return new Promise((resolve, reject) => {
        client.execute(query, params, (err, result) => {
            if (err) {
                reject();
            } else {
                callback(err, result);
                resolve();
            }
        })
    })
};

var query = 'SELECT name, price_p_item FROM grocery.fruit_stock WHERE name=? ALLOW FILTERING';
var q1 = execute(query, ['oranges'], (err, result) => {
    assert.ifError(err);
    console.log('The cost per orange is $' + result.rows[0].price_p_item);
});

var q2 = execute(query, ['apples'], (err, result) => {
    assert.ifError(err);
    console.log('The cost per apple is $' + result.rows[0].price_p_item);
});

var q3 = execute(query, ['bananas'], (err, result) => {
    assert.ifError(err);
    console.log('The cost per banana is $' + result.rows[0].price_p_item);
});

var q4 = execute(query, ['pineapples'], (err, result) => {
    assert.ifError(err);
    console.log('The cost per pineapple is $' + result.rows[0].price_p_item);
});

Promise.all([q1, q2, q3, q4]).then(() => {
    console.log('exit');
    process.exit();
});