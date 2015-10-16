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
	setNote: (roomId, cell)=> {
    
    // Add userId
    var userId = Meteor.userId();
		cell.userId = userId;
		
    // If cell already exists, delete it
		var result = Rooms.update({
			_id: roomId,
			'partition.x': cell.x,
			'partition.y': cell.y,
		}, {
			$set: {
				'partition.$': cell
			}
		});
    
    // Else, create a new one
    if (!result) {
  		Rooms.update(roomId, {
  			$push: {
  				partition: cell
  			}
  		});
      console.log("Added note");
    } else {
      console.log("Updated note");
    }
    
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
