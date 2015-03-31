var VIEWSIZE = 20;
var SIZE = 20;
var MAXX = 100;
var MAXY = 100;

module.exports = function(ctx) {
  var field = [];
  var viewx = 0;
  var viewy = 0;
  return {
    'setWorld': function(f) {
      field = f;
    },
    'ensureCentered': function(user) {
      var minvbuf = VIEWSIZE/4;
      var maxvbuf = VIEWSIZE*3/4;
      var minx = viewx+(minvbuf);
      var miny = viewy+(minvbuf);
      var maxx = viewx+(maxvbuf);
      var maxy = viewy+(maxvbuf);
      var oldx = viewx;
      var oldy = viewy;
      if(user.cursorx < minx) {
        viewx -= minx-user.cursorx;
        if(viewx < 0) {
          viewx = 0;
        }
      } else if(user.cursorx > maxx) {
        viewx += user.cursorx-maxx;
        if(viewx > MAXX-VIEWSIZE) {
          viewx = MAXX-VIEWSIZE;
        }
      }
      if(user.cursory < miny) {
        viewy -= miny-user.cursory;
        if(viewy < 0) {
          viewy = 0;
        }
      } else if(user.cursory > maxy) {
        viewy += user.cursory-maxy;
        if(viewy > MAXY-VIEWSIZE) {
          viewy = MAXY-VIEWSIZE;
        }
      }
      if(oldy !== viewy || oldx !== viewx) {
        this.drawField();
      }
    },
    'drawField': function() {
      for(var x = viewx; x < viewx+VIEWSIZE && x < MAXX; x++) {
        for(var y = viewy; y < viewy+VIEWSIZE && y < MAXY; y++) {
          this.drawFieldAt(x, y);
        }
      }
    },
    'drawFieldAt': function(x, y) {
      this.drawAt(x, y, field[x][y]);
    },
    'drawInterim': function(x1, y1, x2, y2, tick, o) {
      if(x1 === x2 && y1 === y2) {
        return;
      }
      var deltax = (x2-x1)*(tick%SIZE+1);
      var deltay = (y2-y1)*(tick%SIZE+1);
      var fieldColor = field[x1][y1];
      x1 -= viewx;
      y1 -= viewy;
      if(x1 < 0 || x1 >= VIEWSIZE || y1 < 0 || y1 >= VIEWSIZE) {
        return;
      }
      this.makeSquare(x1*SIZE, y1*SIZE, this.getColor(fieldColor));
      this.makeSquare(x1*SIZE+deltax, y1*SIZE+deltay, this.getColor(o));
    },
    'drawAt': function(x, y, o) {
      x -= viewx;
      y -= viewy;
      if(x < 0 || x >= VIEWSIZE || y < 0 || y >= VIEWSIZE) {
        return;
      }
      this.makeSquare(x*SIZE, y*SIZE, this.getColor(o));
    },
    'makeSquare': function(x, y, rgba) {
      var oldFillStyle = ctx.fillStyle;
      ctx.fillStyle = rgba;
      ctx.fillRect(x, y, SIZE, SIZE);
      ctx.fillStyle = oldFillStyle;
    },
    'getColor': function(i) {
      if(i === 0) {
        return 'rgb(255, 255, 128)';
      } else if(i === 1) {
        return 'rgb(255, 128, 255)';
      } else if(i === 2) {
        return 'rgb(128, 128, 255)';
      } else if(i === 3) {
        return 'rgb(255, 128, 128)';
      } else if(i === 4) {
        return 'rgb(0, 0, 0)';
      }
    }
  };
};
