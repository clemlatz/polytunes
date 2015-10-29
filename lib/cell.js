"use strict";

Polytunes.Cell = function (x, y, frequency) {
  this.x = x || 0;
  this.y = y || 0;
  this.id = `{${x};${y}}`;
  this.frequency = frequency || 0;
  this.active = false;
  this.slot = null;
  this.updateBy = null;
}
