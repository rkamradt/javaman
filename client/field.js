
module.exports = function(ctx) {
  return {
    '_cursorx': 50,
    '_cursory': 50,
    '_viewx': 0,
    '_viewy': 0,
    '_viewsize': 20,
    'MAXX': 100,
    'MAXY': 100,
    'SIZE': 20,


    '_field': [],
    '_ctx': ctx,
    'collision': function(x1, y1) {
      var x = this._cursorx + x1;
      var y = this._cursory + y1;
      return (x < 0 || x >= this.MAXX || y < 0 || y >= this.MAXY || this._field[x][y] === 0);
    },
    'makeField': function() {
      for(var x = 0; x < this.MAXX; x++) {
        this._field.push([]);
        for(var y = 0; y < this.MAXY; y++) {
          this._field[x].push(Math.floor(Math.random()*4));
        }
      }
    },
    'moveTo': function(x, y) {
      this.undrawMe();
      this._cursorx = x;
      this._cursory = y;
      this.ensureCentered();
      this.drawMe();
    },
    'moveLeft': function() {
      this.undrawMe();
      this._cursorx--;
      this.ensureCentered();
      this.drawMe();
    },
    'moveRight': function() {
      this.undrawMe();
      this._cursorx++;
      this.ensureCentered();
      this.drawMe();
    },
    'moveUp': function() {
      this.undrawMe();
      this._cursory--;
      this.ensureCentered();
      this.drawMe();
    },
    'moveDown': function() {
      this.undrawMe();
      this._cursory++;
      this.ensureCentered();
      this.drawMe();
    },
    'drawField': function() {
      for(var x = this._viewx; x < this._viewx+this._viewsize && x < this.MAXX; x++) {
        for(var y = this._viewy; y < this._viewy+this._viewsize && y < this.MAXY; y++) {
          this.drawAt(x, y, this._field[x][y]);
        }
      }
    },
    'drawAt': function(x, y, o) {
      x -= this._viewx;
      y -= this._viewy;
      if(x < 0 || x >= this._viewsize || y < 0 || y >= this._viewsize) {
        return;
      }
      this.makeSquare(x*this.SIZE, y*this.SIZE, this.getColor(o));
    },
    'makeSquare': function(x, y, rgba) {
      var oldFillStyle = this._ctx.fillStyle;
      this._ctx.fillStyle = rgba;
      this._ctx.fillRect(x, y, this.SIZE, this.SIZE);
      this._ctx.fillStyle = oldFillStyle;
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
    },
    'undrawMe': function() {
      this.drawAt(this._cursorx, this._cursory,
        this._field[this._cursorx][this._cursory]);
    },
    'drawMe': function() {
      this.drawAt(this._cursorx, this._cursory, 4);
    },
    'ensureCentered': function() {
      var minvbuf = this._viewsize/4;
      var maxvbuf = this._viewsize*3/4;
      var minx = this._viewx+(minvbuf);
      var miny = this._viewy+(minvbuf);
      var maxx = this._viewx+(maxvbuf);
      var maxy = this._viewy+(maxvbuf);
      var oldx = this._viewx;
      var oldy = this._viewy;
      if(this._cursorx < minx) {
        this._viewx -= minx-this._cursorx;
        if(this._viewx < 0) {
          this._viewx = 0;
        }
      } else if(this._cursorx > maxx) {
        this._viewx += this._cursorx-maxx;
        if(this._viewx > this.MAXX-this._viewsize) {
          this._viewx = this.MAXX-this._viewsize;
        }
      }
      if(this._cursory < miny) {
        this._viewy -= miny-this._cursory;
        if(this._viewy < 0) {
          this._viewy = 0;
        }
      } else if(this._cursory > maxy) {
        this._viewy += this._cursory-maxy;
        if(this._viewy > this.MAXY-this._viewsize) {
          this._viewy = this.MAXY-this._viewsize;
        }
      }
      if(oldy !== this._viewy || oldx !== this._viewx) {
        this.drawField();
      }
    }
  };
};
