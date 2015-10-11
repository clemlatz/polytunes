Meteor.methods({createRoom({ board, synthetizer, tempo} = {board:{width:16,
height:16},synthetizer:{base:260,wave:"sine",
scale:SCALE_VALUES.PENTATONIC_MINOR},tempo: 120}){
var createdAt = new Date(),partition = [],players = [];Rooms.insert({
	isPublic, board, players, partition, synthetizer, tempo, createdAt})},
addNote(roomId, partition){var userId=Meteor.userId();partition.userId=userId;
Rooms.update(roomId, { $push: { partition }});},
addUser(roomId, {surname, color}) {var userId = Meteor.userId();
Rooms.update(roomId, { $push: { players: { surname, userId, color }}})}});
