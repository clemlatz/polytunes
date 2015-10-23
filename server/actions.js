Meteor.methods({
	createRoom: (room) => {
		room = room || {
        isPublic: true,
        board: {
            width: 16,
            height: 16
        },
        players: [],
        partition: [],
        synthetizer: {
            base: 260,
            wave: "sine",
            scale: SCALE_VALUES.MAJOR
        },
        tempo: 120,
        createdAt: new Date()
    };

    let music = new Music();
    let notes = music.getScaleNotes(room.synthetizer.scale, room.synthetizer.base, room.board.height);
    for (let y = 0; y < room.board.height; y++) {
      for (let x = 0; x < room.board.width; x++) {
        let frequency = notes[room.board.width-y-1];
        room.partition.push(new Cell(x,y,frequency));
      }
    }

    Rooms.insert(room);
	},

	updateCell: (roomId, cell) => {

        let result = Rooms.update(
      		{	_id: roomId,
      			'partition.id': cell.id
    		  },
          { $set: {
            'partition.$.active': cell.active,
            'partition.$.color': cell.color
          } }
    		);
        if (!result) {
          console.log(`An error occured while updating cell [${cell.id}] : ${cell.active}`);
        }
    },

	guestLogin: (roomId, { name, color }) => {
		var userId = Meteor.userId();
    Meteor.users.update(userId, {
      $set: {
        'profile.name': name,
        'profile.color': color,
        'profile.online': true,
        lastSeenAt: (new Date()).getTime(),
      }
    });
    console.log(`User ${name} logged in.`);
	},
	deleteUser: (roomId) => {
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
