var goRouteFactory = require('../server/goroute');
var fieldFactory = require('../server/field');
var should = require('should');

var field = fieldFactory();

describe('routing a web service', function() {
  var field;
  var sent;
  var ended;
  var sut;
  var req;
  var res;
  before(function(done) {
    req = { // define session here so session persists
      'session': {},
      'url': ''
    };
    sut = goRouteFactory();
    done();
  });
  beforeEach(function(done) {
    sent = '';
    ended = false;
    res = {
      'send': function(str) {
        sent = str;
        return this;
      },
      'end': function() {
        ended = true;
      }
    };
    done();
  });
  // TODO should check for collision, hard if field is random
  it('should allow a get on /world', function() {
    req.url = '/world';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    sent.should.be.instanceOf(Object);
    sent.world.should.be.instanceOf(Array);
    sent.world.should.have.length(100);
    sent.uid.should.be.exactly(0);
    req.session.uid.should.be.exactly(0);
    req.session.uuid.should.be.instanceOf(Object);
    ended.should.be.exactly(true);
  });
  it('should allow a get on /world/go', function() {
    req.url = '/world';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    req.url = '/world/go';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    sent.should.be.instanceOf(Object);
    sent.users.should.be.instanceOf(Array);
    sent.users.should.have.length(1);
    sent.users[0].sessionid.should.be.exactly(req.session.uuid);
    sent.users[0].cursorx.should.be.exactly(0);
    sent.users[0].cursory.should.be.exactly(0);
    ended.should.be.exactly(true);
  });
  it('should allow a get on /world/go/down', function() {
    req.url = '/world';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    req.url = '/world/go/down';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    sent.should.be.instanceOf(Object);
    sent.users.should.be.instanceOf(Array);
    sent.users.should.have.length(1);
    sent.users[0].sessionid.should.be.exactly(req.session.uuid);
    sent.users[0].cursorx.should.be.exactly(0);
    sent.users[0].cursory.should.be.exactly(1);
    ended.should.be.exactly(true);
  });
  it('should allow a get on /world/go/up', function() {
    req.url = '/world';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    req.url = '/world/go/up';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    sent.should.be.instanceOf(Object);
    sent.users.should.be.instanceOf(Array);
    sent.users.should.have.length(1);
    sent.users[0].sessionid.should.be.exactly(req.session.uuid);
    sent.users[0].cursorx.should.be.exactly(0);
    sent.users[0].cursory.should.be.exactly(0);
    ended.should.be.exactly(true);
  });
  it('should allow a get on /world/go/right', function() {
    req.url = '/world';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    req.url = '/world/go/right';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    sent.should.be.instanceOf(Object);
    sent.users.should.be.instanceOf(Array);
    sent.users.should.have.length(1);
    sent.users[0].sessionid.should.be.exactly(req.session.uuid);
    sent.users[0].cursorx.should.be.exactly(1);
    sent.users[0].cursory.should.be.exactly(0);
    ended.should.be.exactly(true);
  });
  it('should allow a get on /world/go/left', function() {
    req.url = '/world';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    req.url = '/world/go/left';
    sut(req, res, function() {
      throw Error('Should not call next');
    });
    sent.should.be.instanceOf(Object);
    sent.users.should.be.instanceOf(Array);
    sent.users.should.have.length(1);
    sent.users[0].sessionid.should.be.exactly(req.session.uuid);
    sent.users[0].cursorx.should.be.exactly(0);
    sent.users[0].cursory.should.be.exactly(0);
    ended.should.be.exactly(true);
  });
  it('should chain on /badpath', function() {
    req.url = '/another/path';
    var chained = false;
    sut(req, res, function() {
      chained = true;
    });
    chained.should.be.exactly(true);
  });
});
