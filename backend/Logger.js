const mongoose = require('mongoose');

// Logtimes model
let schema = mongoose.Schema;

let loggerSchema = new schema({
	user_id: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	logged_in_at: {
		user_time: {
			type: String,
		},
		server_time: {
			type: String,
		},
	},
	logged_out_at: {
		user_time: {
			type: String,
		},
		server_time: {
			type: String,
		},
	},
});

module.exports = mongoose.model('LogTime', loggerSchema);
