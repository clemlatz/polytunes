Meteor.methods({
	createRoom: (room) => {
		room = _.extend({
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
    }, room);

    let music = new Music();
    let notes = music.getScaleNotes(room.synthetizer.scale, room.synthetizer.base, room.board.height);
    for (let y = 0; y < room.board.height; y++) {
      for (let x = 0; x < room.board.width; x++) {
        let frequency = notes[room.board.width-y-1];
        room.partition.push(new Cell(x,y,frequency));
      }
    }

    return Rooms.insert(room);
	},

	updateCell: (cell) => {

        let result = Rooms.update(
      		{	_id: Meteor.user().profile.currentRoom,
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

	guestLogin: function(name, color) {
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

  userJoinsRoom: function(roomId) {
    let user = Meteor.user();
    Meteor.users.update(user, {
      $set: {
        'profile.currentRoom': roomId
      }
    });
    console.log(`User ${user.profile.name} joined room ${roomId}.`);
  },

  userLeavesRoom: function(roomId) {
    let user = Meteor.user();
    Meteor.users.update(user, {
      $unset: {
        'profile.currentRoom': ""
      }
    });
    console.log(`User ${user.profile.name} left room ${roomId}.`);
  }
});
