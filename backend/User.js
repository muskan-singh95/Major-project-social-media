const mongoose = require('mongoose');

// Users model
const userSchema = new mongoose.Schema({
	user_code: {
		type: String,
	},
	user_handle: {
		type: String,
	},
	password: {
		type: String,
		min: 6,
	},
	name: {
		type: String,
		min: 4,
	},
	bio: {
		type: String,
		max: 1024,
	},
	location: {
		type: String,
		min: 2,
		max: 255,
	},
	email_id: {
		type: String,
		min: 6,
		max: 255,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	profile_pic: {
		type: String,
	},
	group_names: [
		{
			type: String,
		},
	],
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

// Get user's group members
userSchema.methods.getUserGroupMembers = async (currentUserID, cb) => {
	let currentUser = await mongoose.model('user').findById(currentUserID);
	// Get user group
	let userGroups = currentUser.group_id;

	let notificationUsers = [];
	let groups = [];
	if (userGroups.length > 0) {
		var feedNotificationProcessed = 0;
		//find all group member in which user belongs
		userGroups.forEach(async (userGroup, index, array) => {
			let group = await mongoose
				.model('Group')
				.findOne({ group_name: userGroup });
			if (group) groups.push(group.group_name);
			let group_users = await mongoose
				.model('user')
				.find({
					group_id: { $in: [group.group_id] },
					user_id: { $ne: currentUser.user_id },
				})
				.exec();
			group_users = group_users.filter((member) => {
				return (
					JSON.stringify(member._id) !=
					JSON.stringify(currentUser._id)
				);
			});
			group_users.forEach(async (member) => {
				if (JSON.stringify(member) == JSON.stringify(currentUser._id)) {
					feedNotificationProcessed++;
					if (feedNotificationProcessed === array.length) {
						cb(notificationUsers);
					}
					return true;
				}
				notificationUsers.push(member);
			});
			feedNotificationProcessed++;
			if (feedNotificationProcessed === array.length) {
				cb(notificationUsers, groups);
			}
		});
	}
};

module.exports = mongoose.model('User', userSchema);
