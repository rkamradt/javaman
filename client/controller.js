var stateFactory = require('./state');
var serverFactory = require('./server');
var handlerFactory = require('./handler');
var ticker;
var theController;
var leftdown = false;
var rightdown = false;
var updown = false;
var downdown = false;

var internalStep = function(timestamp) {
  theController.state.animate();
  if(ticker) { // don't continue animating if the ticker is stoped
    window.requestAnimationFrame(internalStep);
  }
};

module.exports = function(sounds, ctx, ajax) {
  if(!theController) { // singleton pattern
    theController = {
      'state': {},
      'server': {},
      'handler': {},
      'init': function() {
        this.state = stateFactory(sounds, ctx, this);
        this.server = serverFactory(ajax, this);
        this.handler = handlerFactory(this);
        window.handler = this.handler; // export to global for html event binder
        this.state.createWorld();
        this.server.createWorld();
      },
      'start': function() {
        ticker = window.setInterval(this.state.tick, 20);
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
      'actionStart': function(dir) {
        this.leftdown = false;  // keydown flags are mutually exclusive
        this.rightdown = false;
        this.updown = false;
        this.downdown = false;
        switch(dir) {
          case 'left':
            this.leftdown = true;
            break;
          case 'right':
            this.rightdown = true;
            break;
          case 'up':
            this.updown = true;
            break;
          case 'down':
            this.downdown = true;
            break;
          case 'start':
            if(!ticker) {
              this.start();
            }
            break;
          case 'reset':
            this.reset();
            break;
        }
      },
      'actionStop': function(dir) {
        switch(dir) {
          case 'left':
            this.leftdown = false;
            break;
          case 'right':
            this.rightdown = false;
            break;
          case 'up':
            this.updown = false;
            break;
          case 'down':
            this.downdown = false;
            break;
        }
      },
      'reset': function() {
        this.server.reset();
      }
    };
  }
  return theController;
};
