/*
 * Copyright 2015 randalkamradt.
 *
 */
var fieldFactory = require('../../client/field');
var should = require('should');

describe('drawing of the field', function() {
  var sut;
  var fillRectResults;
  var MAXX = 100;
  var MAXY = 100;
  var VIEWSIZE = 10;
  var SQUARESIZE = 20;
  var NUMTOKENS = 4;
  var createRandomField = function() {
    var ret = [];
    for(var x = 0; x < MAXX; x++) {
      ret.push([]);
      for(var y = 0; y < MAXY; y++) {
        ret[x].push(Math.floor(Math.random()*NUMTOKENS));
      }
    }
    return ret;
  };
  beforeEach(function() {
    var ctx = {
      'drawImage': function(square, sx, sy, sw, sh, x, y, xd, yd) {
        fillRectResults.push({
          'x': x,
          'y': y,
          'xd': xd,
          'yd': yd,
        });
      }
    };
    fillRectResults = [];
    sut = fieldFactory(ctx, VIEWSIZE, SQUARESIZE);
    sut.setWorld(createRandomField());
  });
  describe('initial settings', function() {
    it('should have good intial values', function() {
      var max = sut.getMax();
      max.should.have.property('x', MAXX);
      max.should.have.property('y', MAXY);
      var viewport = sut.getViewPort();
      viewport.should.have.property('x', 0); // viewport should start at 0,0
      viewport.should.have.property('y', 0);
    });
  });
  describe('drawing a field', function() {
    it('should be able to draw a field', function() {
      sut.drawField();
      fillRectResults.should.be.instanceOf(Array);
      fillRectResults.should.have.length(VIEWSIZE*VIEWSIZE);
    });
  });
  describe('drawing a field square', function() {
    it('should be able to draw a field square', function() {
      sut.drawFieldAt(0,0);
      fillRectResults.should.be.instanceOf(Array);
      fillRectResults.should.have.length(1);
      fillRectResults = [];
      sut.drawFieldAt(VIEWSIZE-1,VIEWSIZE-1);
      fillRectResults.should.be.instanceOf(Array);
      fillRectResults.should.have.length(1);
    });
    it('should not be able to draw an item out of bounds', function() {
      try {
        sut.drawFieldAt(-1,-1);
        fail('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('Cannot read property \'-1\' of undefined');
      }
      try {
        sut.drawFieldAt(MAXX,MAXY);
        fail('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('Cannot read property \'100\' of undefined');
      }
    });
  });
  describe('move viewport', function() {
    it('should move the viewport when moving around', function() {
      sut.ensureCentered({
        'cursorx': MAXX-1,
        'cursory': 0
      });
      var viewport = sut.getViewPort();
      viewport.should.have.property('x', MAXX-VIEWSIZE);
      viewport.should.have.property('y', 0);
      sut.ensureCentered({
        'cursorx': MAXX-1,
        'cursory': MAXY-1
      });
      viewport = sut.getViewPort();
      viewport.should.have.property('x', MAXX-VIEWSIZE);
      viewport.should.have.property('y', MAXY-VIEWSIZE);
      sut.ensureCentered({
        'cursorx': 0,
        'cursory': MAXY-1
      });
      viewport = sut.getViewPort();
      viewport.should.have.property('x', 0);
      viewport.should.have.property('y', MAXY-VIEWSIZE);
      sut.ensureCentered({
        'cursorx': 0,
        'cursory': 0
      });
      viewport = sut.getViewPort();
      viewport.should.have.property('x', 0);
      viewport.should.have.property('y', 0);
    });
  });
  describe('getting styles', function() {
    it('should be able to get a style', function() {
      var ix = sut.getColor(0);
      ix.should.be.exactly(0);
      ix = sut.getColor(1);
      ix.should.be.exactly(1);
      ix = sut.getColor(2);
      ix.should.be.exactly(2);
      ix = sut.getColor(3);
      ix.should.be.exactly(3);
      ix = sut.getColor(4);
      ix.should.be.exactly(4);
    });
  });
});
