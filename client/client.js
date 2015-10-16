function debug(msg) {
  if (Session.get('debug') === true) {
    console.log(msg);
  }
}

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

    // Initiliaze the board if doesn't exits
    if (!boardData) {
      boardData = [];
      for (let y = 0; y < room.board.height ; y++) {
        let row = [];
        for (let x = 0; x < room.board.width; x++) {
          row.push(new Cell(x, y));
        }
        boardData.push(row)
      }
    }

    // Set active cells
    room.partition.forEach(function (cell) {
      boardData[cell.y][cell.x] = cell;
    });

    // Give each cell it's note frequency
    var notes = getScaleNotes(room.synthetizer.scale, room.synthetizer.base, room.board.height);
    for(x = 0; x < room.board.width; x++) {
      for(y = 0; y < room.board.height; y++) {
        boardData[x][y].frequency = notes[room.board.height-x-1];
      }
    }
    
    debug("Updating board");
    
    return boardData;
  }
});

Template.controls.helpers({
  playerList: function() {
    var list = [];
    Connections.find().forEach( function(player) {
      list.push('<span class="player '+player.color+'">'+player.name+'</span>');
    })
    return list.join(' ');
  },
  playButtonIcon: function() {
    return (Session.get('playing') === true ? 'pause' : 'play');
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

    Meteor.call('keepalive', { id: Meteor.userId(), name: surname, color: color });
    return false;
  }
});

Template.board.events({
  'click td': function (event, template) {
    let cell = $(event.target);
    let x = cell.data('x');
    let y = cell.data('y');
    let room = Rooms.findOne();

    // boardData[y][x].surname = Session.get('surname');
    boardData[y][x].color = Session.get('color');
    // boardData[y][x].i = !boardData[y][x].i;

    if (cell.hasClass("active")) {
      cell.addClass("false"); // optimistic ui
      boardData[y][x].active = false;
    } else {
      cell.addClass("active "+boardData[y][x].color); // optimistic ui
      boardData[y][x].active = true;
    }

    Meteor.call('setNote', room._id, boardData[y][x]);

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

let togglePlay = (function() {
  let handler = -1;
  return function() {
    if (handler === -1) {
      Session.set("playing", true);
      handler = setInterval(function () {
        play();
      }, noteDuration());
    } else {
      Session.set("playing", false);
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
    if (cell.active) {
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
