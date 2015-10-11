Template.body.helpers({
    isLogged: ()=> !Session.get('authorization') ? false : true
})

let boardData;

Template.board.helpers({
  rows: function () {
   let room;
    if (location.pathname.split('/')[1] === 'rooms')
      room = Rooms.findOne({_id: location.pathname.split('/')[location.pathname.split('/').length - 1]});
    else room = Rooms.findOne();

    if (!room)
      return false;

    if (!boardData) {
      boardData = [];
      for (let y = 0; y < room.board.height ; y++) {
        let row = [];
        for (let x = 0; x < room.board.width; x++) {
          row.push(cell(x, y));
        }
        boardData.push(row)
      }
    }

    room.partition.forEach(function (cell) {
      boardData[cell.y][cell.x] = cell;
    });

    setNotes();

    return boardData;
  }
});

Template.controls.helpers({
  playerCount: function() {
    var count = Connections.find().count();
    if (count > 1) {
      return count+" players";
    }
    return count+" player";
  },
  playerList: function() {
    var list = [];
    Connections.find().forEach( function(player) {
      list.push('<span class="player" style="color: '+COLOR_VALUES[player.color]+'">'+player.name+'</span>');
    })
    return list.join(' ');
  }
});

Template.login.helpers({
  random_color: function() {
    var colors = [];
    for (color in COLOR_VALUES) {
      colors.push({
        name: color,
        code: COLOR_VALUES[color]
      });
    }
    return colors[parseInt(Math.random() * (colors.length))];
  }
});

Template.login.events({
  'submit #login-form': event => {
    event.preventDefault();

    const surname = event.target.surname.value;
    const color = event.target.color.value;
    const roomId = Rooms.findOne()._id;

    Meteor.call('addUser', roomId, { surname, color});
    Session.setPersistent('authorization', "true");
    Session.setPersistent('surname', surname);
    Session.setPersistent('color', color);
    return false;
  }
});

Template.board.events({
  'click td': function (event, template) {
    let x = $(event.target).data('x');
    let y = $(event.target).data('y');

    let room = Rooms.findOne();

    boardData[y][x].surname = Session.get('surname');
    boardData[y][x].color = Session.get('color');
    boardData[y][x].i = !boardData[y][x].i;

    Meteor.call('addNote', room._id, boardData[y][x]);
  },
});

Template.controls.events({
  'click #play': function (event, template) {
    togglePlay();
    instrument.playNote(1); // Hack to fix sound in Safari iOS
  }
});

Meteor.startup( function() {
  instrument = new Instrument();
});

// client code: ping heartbeat every 5 seconds
Meteor.setInterval(function () {
  Meteor.call('keepalive', { id: Meteor.userId(), name: Session.get('surname'), color: Session.get('color') });
}, 5000);

function cell(x, y, userId) {
  return {
    x: x || 0,
    y: y || 0,
    frequency: 200,
    title: 200,
    timestamp: new Date(),
    userId: userId || '',
    i: false,
  }
}

let togglePlay = (function() {
  let handler = -1;
  return function() {
    if (handler === -1) {
      handler = setInterval(function () {
        play();
      }, noteDuration());
    } else {
      clearInterval(handler);
      handler = -1;
    }
  }
})();

function play () {
  let room = Rooms.findOne();

  if (cursor >= room.board.width) {
    cursor = 0;
  }

  $('td').removeClass('p p1 p2');
  for(let y = 0; y < room.board.height; y++) {
    let cell = boardData[y][cursor];
    if (cell.i) {
      $(`td[data-x="${cursor}"][data-y="${y}"]`).toggleClass('p');
      // cell.p = true;
      // visualEffect(cell);
      instrument.playNote(cell.frequency);
    }
  }

  cursor++;
}

function noteDuration() {
  return 60 / Rooms.findOne().tempo * 1000 / 4;
}

var cursor = 0;

// Calculate note from base and interval
function calcNote(base,interval) {
  return Math.round(base * Math.pow(2,interval/12)*100)/100;
}

// Get 'max' notes of 'scale' from 'base'
function getScaleNotes(scale,base,max) {
  interval = 0;
  ni = 0;
  notes = new Array();
  ints = new Array();
  for(n = 0; n < max; n++) {
    note = calcNote(base,interval);
    interval = interval + scale[ni];
    ints[n] = scale[ni];
    notes[n] = note;
    ni++;
    if (ni >= scale.length) ni = 0;
  }
  return notes;
}

// Each cell get its note
function setNotes() {
  var base = 260;
  var board_height = Rooms.findOne().board.height;
  var board_width = Rooms.findOne().board.width;
  var notes = getScaleNotes(SCALE_VALUES.MAJOR, base, board_height);
    for(x = 0; x < board_width; x++) {
  for(y = 0; y < board_height; y++) {
      boardData[x][y].frequency = notes[board_height-x-1];
      boardData[x][y].title = notes[board_height-x-1];
    }
  }
}
