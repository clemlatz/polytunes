if (Rooms.find().count() === 0){Rooms.insert({ isPublic: true,
board: { width: 16, height: 16 },players: [],partition: [],
synthetizer:{base:260,wave:"sine",scale:SCALE_VALUES.PENTATONIC_MINOR},
tempo: 120,createdAt:new Date()})}
Meteor.publish(null, ()=> Rooms.find()); Rooms.allow({ insert:()=> false,
update:()=> false, remove:()=> false});Meteor.publish(null,()=> Connections
.find());Meteor.methods({keepalive(user_id){if(!Connections.findOne({user_id}))
Connections.insert({user_id: user_id});Connections.update({user_id},{$set:{
last_seen:new Date().getTime()}})}});Meteor.setInterval(()=>{var n=new Date()
.getTime();Connections.find({last_seen: {$lt: (n - 10 * 1000)}}).forEach(
user=> Connections.remove(user))})
