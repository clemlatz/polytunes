Meteor.methods({
	addNote: (roomId, cell)=> {
		var userId = Meteor.userId();
		cell.userId = userId;
		Rooms.update(roomId, {
			$push: {
				partition: cell
			}
		});
	},
	updateNote: (roomId, cell)=> {
		Rooms.upsert({
			_id: roomId,
			'partition.x': cell.x,
			'partition.y': cell.y,
		}, {
			$set: {
				'partition.$': cell
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
				players: { userId }
			}
		});
	},
	ping: ()=> {
		return new Date();
	}
});
