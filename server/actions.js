"use strict";

Meteor.methods({
	createRoom: (room) => {
		room = new Polytunes.Room(room);
    return Polytunes.Rooms.insert(room);
	},

	updateCell: (cell) => {
    "use strict";

    let room = Polytunes.Rooms.findOne(Meteor.user().currentRoom),
      user = Meteor.user();

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

    let result = Polytunes.Rooms.update(
  		{	_id: user.currentRoom,
  			'partition.id': cell.id
		  },
      { $set: {
        'partition.$.active': cell.active,
        'partition.$.slot': cell.slot,
        'partition.$.updatedBy': user._id
      } }
		);
    if (!result) {
      throw new Meteor.Error(500, `An error occured while updating cell ${cell.id}`);
    }
  },

	guestLogin: function(name) {
		let user = Meteor.user();
    Meteor.users.update(user, {
      $set: {
        'profile.name': name,
        'profile.online': true,
        lastSeenAt: (new Date()).getTime(),
      }
    });
    Meteor.call('userJoinsRoom', user.currentRoom);
    console.log(`User ${name} logged in.`);
	},

  userJoinsRoom: function(roomId) {
    let user = Meteor.user(),
      room = Polytunes.Rooms.findOne(roomId);

    Meteor.users.update(user, { $set: { 'currentRoom': roomId } });

    // Remove player before inserting
    Polytunes.Rooms.update(room._id, { $pull: { players: { userId: user._id }, multi: true } });

    // Insert player
    let slot = room.players.length + 1;
    Polytunes.Rooms.update(room._id, {
      $push: {
        players: {
          userId: user._id,
          name: user.profile.name,
          slot: room.players.length + 1
        }
      }
    });

    Polytunes.createNotification(room._id, `User ${user.profile.name} joined the room.`);

    console.log(`User ${user.profile.name} joined room ${roomId}.`);
  },

  userLeavesRoom: function(roomId, user) {
    user = user || Meteor.user();
    let room = Polytunes.Rooms.findOne(roomId);

    if (!user || !room) {
      return false;
    }

    let notes = room.partition;

    Meteor.users.update(user, { $unset: { 'currentRoom': "" } });

    // Clear notes created by this user
    for (let i = 0, c = notes.length; i < c; i++) {
      if (notes[i].updatedBy == user._id) {
        notes[i].active = false;
        notes[i].slot = null;
        notes[i].updatedBy = null;
      }
    }

    Polytunes.Rooms.update(roomId, {
      $pull: {
        players: { userId: user._id },
        multi: true
      },
      $set: {
        partition: notes
      }
    });

    Polytunes.createNotification(room._id, `User ${user.profile.name} left the room.`);

    console.log(`User ${user.profile.name} left room ${roomId}.`);
  }
});
