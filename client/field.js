/*
 * Copyright 2015 randalkamradt.
 *
 */

module.exports = function(ctx, viewsize, squaresize, squares) {
  var field = [];
  var viewx = 0;
  var viewy = 0;
  var maxx = 0;
  var maxy = 0;
  return {
    'getMax': function() {
      return {
        'x': maxx,
        'y': maxy
      };
    },
    'getViewPort': function() {
      return {
        'x': viewx,
        'y': viewy
      };
    },
    'setWorld': function(f) {
      field = f;
      maxx = f.length;
      maxy = maxx > 0 ? f[0].length : 0;
    },
    'ensureCentered': function(user) {
      var minvbuf = Math.floor(viewsize/4);
      var maxvbuf = Math.floor(viewsize*3/4);
      var viewminx = viewx+(minvbuf);
      var viewminy = viewy+(minvbuf);
      var viewmaxx = viewx+(maxvbuf);
      var viewmaxy = viewy+(maxvbuf);
      var oldx = viewx;
      var oldy = viewy;
      if(user.cursorx < viewminx) {
        viewx -= viewminx-user.cursorx;
        if(viewx < 0) {
          viewx = 0;
        }
      } else if(user.cursorx > viewmaxx) {
        viewx += user.cursorx-viewmaxx;
        if(viewx > maxx-viewsize) {
          viewx = maxx-viewsize;
        }
      }
      if(user.cursory < viewminy) {
        viewy -= viewminy-user.cursory;
        if(viewy < 0) {
          viewy = 0;
        }
      } else if(user.cursory > viewmaxy) {
        viewy += user.cursory-viewmaxy;
        if(viewy > maxy-viewsize) {
          viewy = maxy-viewsize;
        }
      }
      if(oldy !== viewy || oldx !== viewx) {
        this.drawField();
      }
    },
    'drawField': function() {
      for(var x = viewx; x < viewx+viewsize && x < maxx; x++) {
        for(var y = viewy; y < viewy+viewsize && y < maxy; y++) {
          this.drawFieldAt(x, y);
        }
      }
    },
    'getFieldToken': function(x, y) {
      return field[x][y];
    },
    'drawFieldAt': function(x, y) {
      this.drawAt(x, y, this.getFieldToken(x,y));
    },
    'drawInterim': function(x1, y1, x2, y2, tick, o) {
      if(x1 === x2 && y1 === y2) {
        return;
      }
      var deltax = (x2-x1)*(tick%squaresize+1);
      var deltay = (y2-y1)*(tick%squaresize+1);
      var fieldToken = this.getFieldToken(x1,y1);
      x1 -= viewx;
      y1 -= viewy;
      if(x1 < 0 || x1 >= viewsize || y1 < 0 || y1 >= viewsize) {
        return;
      }
      this.makeSquare(x1*squaresize, y1*squaresize, this.getColor(fieldToken));
      this.makeSquare(x1*squaresize+deltax, y1*squaresize+deltay, this.getColor(o));
    },
    'drawAt': function(x, y, o) {
      x -= viewx;
      y -= viewy;
      if(x < 0 || x > viewsize || y < 0 || y > viewsize) {
        return;
      }
      this.makeSquare(x*squaresize, y*squaresize, this.getColor(o));
    },
    'makeSquare': function(x, y, i) {
      ctx.drawImage(squares, i*squaresize, 0, squaresize, squaresize, x, y, squaresize, squaresize);
//      var oldFillStyle = ctx.fillStyle;
//      ctx.fillStyle = rgba;
//      ctx.fillRect(x, y, squaresize, squaresize);
//      ctx.fillStyle = oldFillStyle;
    },
    'getColor': function(i) {
      return i;
//      if(i === 0) {
//        return 'rgb(255,255,128)';
//      } else if(i === 1) {
//        return 'rgb(255,128,255)';
//      } else if(i === 2) {
//        return 'rgb(128,128,255)';
//      } else if(i === 3) {
//        return 'rgb(255,128,128)';
//      } else if(i === 4) {
//        return 'rgb(0,0,0)';
//      } else {
//        throw Error('color ' + i + ' not defined');
//      }
    }
  };
};
