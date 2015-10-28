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
    "use strict";

    let room = Rooms.findOne(Meteor.user().currentRoom);

    // Get cell coordinates
    let coord = cell.id.match(/{(\d+);(\d+)}/);
    cell.x = coord[1];
    cell.y = coord[2];

    // Check if user can update current cell
    if ((cell.slot == 0 && cell.x > (room.board.width / 2) - 1) ||
          (cell.slot == 1 && cell.x < room.board.width / 2)
      ) {
      throw new Meteor.Error(500, `cannot-add-notes-on-this-side`);
    }

    let result = Rooms.update(
  		{	_id: Meteor.user().currentRoom,
  			'partition.id': cell.id
		  },
      { $set: {
        'partition.$.active': cell.active,
        'partition.$.slot': cell.slot
      } }
		);
    if (!result) {
      throw new Meteor.Error(500, `An error occured while updating cell ${cell.id}`);
    }
  },

	guestLogin: function(name, color) {
		let user = Meteor.user();
    Meteor.users.update(user, {
      $set: {
        'profile.name': name,
        'profile.color': color,
        'profile.online': true,
        lastSeenAt: (new Date()).getTime(),
      }
    });
    Meteor.call('userJoinsRoom', user.currentRoom);
    console.log(`User ${name} logged in.`);
	},

  userJoinsRoom: function(roomId) {
    let user = Meteor.user(),
      room = Rooms.findOne(roomId);

    Meteor.users.update(user, { $set: { 'currentRoom': roomId } });

    // Remove player before inserting
    Rooms.update(room._id, { $pull: { players: { userId: user._id }, multi: true } });

    // Insert player
    let slot = room.players.length + 1;
    Rooms.update(room._id, {
      $push: {
        players: {
          userId: user._id,
          name: user.profile.name,
          slot: room.players.length + 1
        }
      }
    });
    console.log(`User ${user.profile.name} joined room ${roomId}.`);
  },

  userLeavesRoom: function(roomId) {
    let user = Meteor.user();
    if (!user) {
      return false;
    }

    Meteor.users.update(user, { $unset: { 'currentRoom': "" } });

    Rooms.update(roomId, {
      $pull: {
        players: { userId: user._id },
        multi: true
      }
    });
    console.log(`User ${user.profile.name} left room ${roomId}.`);
  }
});
