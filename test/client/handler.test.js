/*
 * Copyright 2015 randalkamradt.
 *
 */
var handlerFactory = require('../../client/handler');
var should = require('should');

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

describe('handle user interactions', function() {
  it('should be able to handle key strokes and translate them to commands', function() {
    var action = '';
    var sut = handlerFactory({
      'actionStart': function(command) {
        action = command;
      },
      'actionStop': function(command) {
        action = '';
      }
    });
    sut.keyDown({'keyCode': LEFT});
    action.should.be.exactly('left');
    sut.keyUp({'keyCode': LEFT});
    action.should.be.exactly('');
    sut.keyDown({'keyCode': RIGHT});
    action.should.be.exactly('right');
    sut.keyUp({'keyCode': RIGHT});
    action.should.be.exactly('');
    sut.keyDown({'keyCode': UP});
    action.should.be.exactly('up');
    sut.keyUp({'keyCode': UP});
    action.should.be.exactly('');
    sut.keyDown({'keyCode': DOWN});
    action.should.be.exactly('down');
    sut.keyUp({'keyCode': DOWN});
    action.should.be.exactly('');
  });
  it('should be able to handle mouse/touch actions', function() {
    var action = '';
    var defaultPrevented = false;
    var sut = handlerFactory({
      'actionStart': function(command) {
        action = command;
      },
      'actionStop': function(command) {
        action = '';
      }
    });
    sut.actionStart({'preventDefault': function () { defaultPrevented = true; }},'left');
    action.should.be.exactly('left');
    defaultPrevented.should.be.true;
    defaultPrevented = false;
    sut.actionStart({'preventDefault': function () { defaultPrevented = true; }},'stop');
    action.should.be.exactly('stop');
    defaultPrevented.should.be.true;
    defaultPrevented = false;
  });
});
