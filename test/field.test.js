var fieldFactory = require('../server/field');
var should = require('should');

describe('creation and manipulation of field and user', function() {
  describe('creation and manipulation of user', function() {
    it('should be able to create a user', function() {
      var sut = fieldFactory();
      var session = 'asglasdg';
      sut.createWorld(session);
      sut.addUser(session);
      var state = sut.getState();
      state.should.be.instanceOf(Object).and.have.property('users');
      state.users.should.be.instanceOf(Array);
      state.users.should.have.length(1);
      state.users[0].sessionid.should.be.exactly(session);
      state.users[0].cursorx.should.be.exactly(0);
      state.users[0].cursory.should.be.exactly(0);
    });
    it('should be able to validate an existing user', function() {
      var sut = fieldFactory();
      var session = 'asglasdg';
      sut.addUser(session);
      sut.validateUser(0,session).should.be.exactly(true);
    });
  });
  describe('moving a user', function() {
    it('should be move a user up and down', function() {
      var session = 'asldfkja';
      var sut = fieldFactory();
      sut.createWorld(session);
      sut.addUser(session);
      sut.move(0, 'down');
      var state = sut.getState();
      state.should.be.instanceOf(Object).and.have.property('users');
      state.users.should.be.instanceOf(Array);
      state.users.should.have.length(1);
      state.users[0].sessionid.should.be.exactly(session);
      state.users[0].cursorx.should.be.exactly(0);
      state.users[0].cursory.should.be.exactly(1);
      sut.move(0, 'up');
      state = sut.getState();
      state.should.be.instanceOf(Object).and.have.property('users');
      state.users.should.be.instanceOf(Array);
      state.users.should.have.length(1);
      state.users[0].sessionid.should.be.exactly(session);
      state.users[0].cursorx.should.be.exactly(0);
      state.users[0].cursory.should.be.exactly(0);
    });
    it('should be move a user left and right', function() {
      var session = 'asldfkja';
      var sut = fieldFactory();
      sut.createWorld(session);
      sut.addUser(session);
      sut.move(0, 'right');
      var state = sut.getState();
      state.should.be.instanceOf(Object).and.have.property('users');
      state.users.should.be.instanceOf(Array);
      state.users.should.have.length(1);
      state.users[0].sessionid.should.be.exactly(session);
      state.users[0].cursorx.should.be.exactly(1);
      state.users[0].cursory.should.be.exactly(0);
      sut.move(0, 'left');
      state = sut.getState();
      state.should.be.instanceOf(Object).and.have.property('users');
      state.users.should.be.instanceOf(Array);
      state.users.should.have.length(1);
      state.users[0].sessionid.should.be.exactly(session);
      state.users[0].cursorx.should.be.exactly(0);
      state.users[0].cursory.should.be.exactly(0);
    });
  });
  describe('creation and manipulation of field', function() {
    it('should be able to make a playing field', function() {
      var sut = fieldFactory();
      var session = 'asglasdg';
      var result = sut.createWorld(session);
      result.world.should.be.instanceOf(Array);
      result.world.should.have.length(100);
      result.uid.should.be.exactly(session);
    });
});
});
