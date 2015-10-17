var hotkeys = new Hotkeys();
hotkeys.add({
  combo : "space",
  callback : function(){
    togglePlay();
  }
});

// Prevent play double toggling when button has focus
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (document.activeElement.id === "play") {
    return false;
  }
};