var settings = require('../settings'),
	Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server;

var mongodb = new Db(settings.db, new Server(settings.host, settings.port, {auto_reconnect:true}), {
	safe: true
})

mongodb.ObjectID = require('mongodb').ObjectID;

module.exports = mongodb;