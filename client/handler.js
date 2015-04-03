/*
 * Copyright 2015 randalkamradt.
 *
 */
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

module.exports = function(controller) {
  return {
    'keyUp': function(e) {
      controller.actionStop(this._xlateKey(e.keyCode));
    },
    'keyDown': function(e) {
      controller.actionStart(this._xlateKey(e.keyCode));
    },
    'actionEnd': function(e, command) {
      e.preventDefault();
      controller.actionStop(command);
    },
    'actionStart': function(e, command) {
      e.preventDefault();
      controller.actionStart(command);
    },
    'bindButton': function(button, command) {
      var self = this;
      button.addEventListener("mousedown", function(event) {
        self.actionStart(event, command);
      });
      button.addEventListener("touchstart", function(event) {
        self.actionStart(event, command);
      });
      button.addEventListener("mouseup", function(event) {
        self.actionEnd(event, command);
      });
      button.addEventListener("touchend", function(event) {
        self.actionEnd(event, command);
      });

    },
    '_xlateKey': function(key) {
      var command;
      switch(key) {
        case LEFT:
          command = 'left';
          break;
        case RIGHT:
          command = 'right';
          break;
        case UP:
          command = 'up';
          break;
        case DOWN:
          command = 'down';
          break;
      }
      return command;
    }
  };
};
