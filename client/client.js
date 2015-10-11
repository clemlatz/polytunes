Template.view.helpers({isLogged: ()=> !Session.get('authorization')?false:true
});let boardData;Template.board.helpers({rows() {let room = Rooms.findOne();
if (!room) return false; if (!boardData) { boardData = [];
for (let y = 0; y < room.board.height ; y++) {
let row = [];for (let x = 0; x < room.board.width; x++) row.push(cell(x, y));
boardData.push(row)}}room.partition.forEach(function (cell) {
boardData[cell.y][cell.x] = cell});setNotes(room);return boardData}})
Template.controls.helpers({players() {var count=Connections.find().count();
return (count > 1) ? count+" players" : count+" player"}})
Template.login.helpers({random_color(){var colors = [];
for (color in COLOR_VALUES)colors.push({name: color,code:COLOR_VALUES[color]});
return colors[parseInt(Math.random() * (colors.length))]}});Template.login.
events({'submit #login-form': ({preventDefault, target}) => {preventDefault();
Meteor.call('addUser',Rooms.findOne()._id,{surname:target.surname.value,
color:target.color.value});Session.setPersistent('authorization', "true");
Session.setPersistent('surname', surname);
Session.setPersistent('color', color);
}});Template.board.events({'click td': ({target})=> {
let x=$(target).data('x'),y=$(target).data('y')
boardData[y][x].color = Session.get('color');
boardData[y][x].i = !boardData[y][x].i;
Meteor.call('addNote', Rooms.findOne()._id, boardData[y][x]);}})
Template.controls.events({ 'click #play': ()=>togglePlay() })
Meteor.startup(()=> instrument = new Instrument())
Meteor.setInterval(()=> Meteor.call('keepalive', Meteor.userId()), 5000);
cell=(x=0, y=0,userId='')=>({x,y,frequency:200,title:200,timestamp:new Date(),
userId,i:false});let togglePlay = (function() {let handler = -1;
return ()=> {if (handler === -1)
handler = setInterval(play, 60/Rooms.findOne().tempo*1000/4);
else {clearInterval(handler);handler = -1}}})();function play() {
let room=Rooms.findOne();if (cursor >= room.board.width) cursor = 0;
$('td').removeClass('p p1 p2');for(let y = 0; y < room.board.height; y++) {
let cell = boardData[y][cursor];if (cell.i) {
$(`td[data-x="${cursor}"][data-y="${y}"]`).toggleClass('p');
instrument.playNote(cell.frequency)}}
cursor++}var cursor=0;function getScaleNotes(scale,base,max) {
var interval=0, ni=0, notes=new Array(),ints=new Array();
for(n = 0; n < max; n++) {
note = Math.round(base * Math.pow(2,interval/12)*100)/100;
interval = interval + scale[ni];ints[n] = scale[ni];notes[n] = note;
if (++ni >= scale.length) ni = 0;}return notes;}
function setNotes(room) {
var base = 260, bh = room.board.height, bw = room.board.width;
var notes = getScaleNotes(SCALE_VALUES.MAJOR, base, bh);
for(x = 0; x < bw; x++){for(y = 0; y < bh; y++) {boardData[x][y].
frequency=notes[bh-x-1];boardData[x][y].title = notes[bh-x-1]}}}
