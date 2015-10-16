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
    
    boardData = [], i = 0;;
    for (let y = 0; y < room.board.height ; y++) {
      let row = [];
      for (let x = 0; x < room.board.width; x++) {
        row.push(room.partition[i]);
        i++;
      }
      boardData.push(row);
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
    let room = Rooms.findOne(),
      target = $(event.target),
      cell = { id: target.data('id') };

    if (target.hasClass('active')) {
      target.removeClass("active"); // optimistic ui
      cell.active = false;
    } else {
      cell.color = Session.get('color');
      cell.active = true;
      target.addClass("active "+cell.color); // optimistic ui
    }
    
    debug("Updating cell "+cell.id);
    Meteor.call('updateCell', room._id, cell);
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

  // $('td').removeClass('playing p1 p2');
  for(let y = 0; y < room.board.height; y++) {
    let cell = boardData[y][cursor];
    if (cell.active) {
      let $cell = $(`td[data-id="{${cursor},${y}}"]`);
      instrument.playNote(cell.frequency);
      visualEffect($cell, cursor, y);
    }
  }

  cursor++;
}

var visualEffect = function($cell, x, y) {
	  
    var around = $(`td[data-id="{${x-1},${y}}"], 
      td[data-id="{${x+1},${y}}"], 
      td[data-id="{${x},${y-1}}"], 
      td[data-id="{${x},${y+1}}"]`);
    
    // Main cell effect
    $cell.addClass('playing');
    // around.addClass('around');
    
    setTimeout( function() {
      $cell.removeClass('playing');
      around.removeClass('around');
    }, noteDuration() * 2);
    
	}

var noteDuration = function() {
  return 60 / Rooms.findOne().tempo * 1000 / 4;
};

var cursor = 0;
