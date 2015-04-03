/*
 * Copyright 2015 randalkamradt.
 *
 */
var stateFactory = require('./state');
var serverFactory = require('./server');
var handlerFactory = require('./handler');
var ticker;
var theController;
var leftdown = false;
var rightdown = false;
var updown = false;
var downdown = false;
var ticks = 0;

var internalStep = function(timestamp) {
  if(ticker) { // don't continue animating if the ticker is stoped
    theController.state.animate(ticks);
    window.requestAnimationFrame(internalStep);
  }
};

var internalTick = function() {
  theController.tick();
};

module.exports = function(sounds, ctx, ajax, squares) {
  if(!theController) { // singleton pattern
    theController = {
      'state': {},
      'server': {},
      'handler': {},
      'init': function() {
        this.state = stateFactory(sounds, ctx, squares, this);
        this.server = serverFactory(ajax, this);
        this.handler = handlerFactory(this);
        canvas.addEventListener("keydown", this.keyDown);
        canvas.addEventListener("keyup", this.keyUp);
        var button = document.getElementById('upbutton');
        this.handler.bindButton(button,'up');
        button = document.getElementById('leftbutton');
        this.handler.bindButton(button,'left');
        button = document.getElementById('rightbutton');
        this.handler.bindButton(button,'right');
        button = document.getElementById('downbutton');
        this.handler.bindButton(button,'down');
        button = document.getElementById('resetbutton');
        this.handler.bindButton(button,'reset');
        button = document.getElementById('stopbutton');
        this.handler.bindButton(button,'stop');
        button = document.getElementById('startbutton');
        this.handler.bindButton(button,'start');

        this.server.createWorld();
      },
      'start': function() {
        ticker = window.setInterval(internalTick, 20);
        window.requestAnimationFrame(internalStep); // start animation
      },
      'stop': function() {
        window.clearInterval(ticker);
        ticker = null;
      },
      'beginSuccess': function(data) {
        this.state.setWorldState(data);
        this.server.sync();
      },
      'stopSuccess': function(data) {
        this.stop();
      },
      'syncSuccess': function(data) {
        this.state.setState(data);
        if(!ticker) {
          this.start();
        }
      },
      'resetSuccess': function(data) {
        this.server.createWorld();
      },
      'error': function(logMessage, alertMessage) {
        if(logMessage) {
          console.log(logMessage);
        }
        if(alertMessage) {
          window.alert(alertMessage);
        }
      },
      'sync': function(event) {
        this.server.sync(event);
      },
      'actionStart': function(command) {
        leftdown = false;  // keydown flags are mutually exclusive
        rightdown = false;
        updown = false;
        downdown = false;
        switch(command) {
          case 'left':
            leftdown = true;
            break;
          case 'right':
            rightdown = true;
            break;
          case 'up':
            updown = true;
            break;
          case 'down':
            downdown = true;
            break;
          case 'start':
            if(!ticker) {
              this.start();
            }
            break;
          case 'stop':
            this.stop();
            break;
          case 'reset':
            this.reset();
            break;
        }
      },
      'actionStop': function(command) {
        switch(command) {
          case 'left':
            leftdown = false;
            break;
          case 'right':
            rightdown = false;
            break;
          case 'up':
            updown = false;
            break;
          case 'down':
            downdown = false;
            break;
        }
      },
      'reset': function() {
        this.stop();
        this.server.reset();
      },
      'tick': function() {
        var nextMove;
        if(ticks%10 === 0) { // every 10th tick sync
          if(ticks%20 === 0) {
            if(leftdown) {
              nextMove = 'left';
            } else if(rightdown) {
              nextMove = 'right';
            } else if(updown) {
              nextMove = 'up';
            } else if(downdown) {
              nextMove = 'down';
            }
            if(nextMove) {
              if(this.state.collision(nextMove)) {
                nextMove = '';
                sounds.beep();
              } else {
                sounds.bloop();
              }
            }
          }
          this.sync(nextMove);
        }
        ticks++;
      }
    };
  }
  return theController;
};
