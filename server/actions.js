Meteor.methods({
	createRoom: ({ board, synthetizer, tempo} = {
		board: {
		    width: 16,
		    height: 16
		},
		synthetizer: {
		    base: 260,
		    wave: "sine",
		    scale: SCALE_VALUES.PENTATONIC_MINOR
		},
		tempo: 120
	})=> {
		var createdAt = new Date();
		var partition = [];
		var players = [];

		Rooms.insert({isPublic, board, players, partition, synthetizer, tempo, createdAt});
	},
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
	deleteUser: (roomId)=> {
		var userId = Meteor.userId();

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
