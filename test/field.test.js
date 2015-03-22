var fieldFactory = require('../client/field');
var should = require('should');

describe('creation and manipulation of field and user', function() {
  describe('creation and manipulation of user', function() {
    it('should be able to create a user', function() {
      var sut = fieldFactory();
      var session = 'asglasdg';
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
      sut.makeField(session);
      sut.addUser(session);
      sut.moveDown(0);
      var state = sut.getState();
      state.should.be.instanceOf(Object).and.have.property('users');
      state.users.should.be.instanceOf(Array);
      state.users.should.have.length(1);
      state.users[0].sessionid.should.be.exactly(session);
      state.users[0].cursorx.should.be.exactly(0);
      state.users[0].cursory.should.be.exactly(1);
      sut.moveUp(0);
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
      sut.makeField(session);
      sut.addUser(session);
      sut.moveRight(0);
      var state = sut.getState();
      state.should.be.instanceOf(Object).and.have.property('users');
      state.users.should.be.instanceOf(Array);
      state.users.should.have.length(1);
      state.users[0].sessionid.should.be.exactly(session);
      state.users[0].cursorx.should.be.exactly(1);
      state.users[0].cursory.should.be.exactly(0);
      sut.moveLeft(0);
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
      sut.makeField(session);
      var result = sut.getWorld(0);
      result.world.should.be.instanceOf(Array);
      result.world.should.have.length(sut.MAXX);
      result.uid.should.be.exactly(0);
    });
});
});
