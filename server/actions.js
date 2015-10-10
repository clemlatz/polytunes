Meteor.methods({
	addNote: (roomId, {x, y, timestamp})=> {
		var userId = Meteor.userId();
		Rooms.update(roomId, {
			$push: {
				partition: {
					x,
					y,
					timestamp,
					userId
				}
			}
		});
	},
	deleteNote: (roomId, {x, y})=> {
		Rooms.update(roomId, {
				$pull: {
					partition: {
						x,
						y
					}
				}
			});
	},
	addUser: (roomId, {surname, color})=> {
		var userId = Meteor.userId();

		Rooms.update(roomId, {
			$push: {
				players: {
					surname,
					userId,
					color
				}
			}
		});
	},
	deleteUser: (roomId, userId)=> {
		Rooms.remove(roomId, {
			$pull: {
				userId
			}
		});
	},
	ping: ()=> {
		return new Date();
	}
});
