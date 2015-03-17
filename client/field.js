
module.exports = function(ctx) {
  return {
    '_cursorx': 10,
    '_cursory': 10,

    'MAXX': 20,
    'MAXY': 20,
    'SIZE': 20,


    '_field': [],
    '_ctx': ctx,
    'collision': function(x1, y1) {
      var x = this._cursorx + x1;
      var y = this._cursory + y1;
      return (x < 0 || x >= this.MAXX || y < 0 || y >= this.MAXY || this._field[x][y] === 0);
    },
    'makeField': function() {
      for(var i = 0; i < this.MAXX; i++) {
        this._field.push([]);
        for(var j = 0; j < this.MAXY; j++) {
          this._field[i].push(Math.floor(Math.random()*4));
        }
      }
    },
    'moveLeft': function() {
      this.undrawMe(ctx);
      this._cursorx--;
      this.drawMe(ctx);
    },
    'moveRight': function() {
      this.undrawMe(ctx);
      this._cursorx++;
      this.drawMe(ctx);
    },
    'moveUp': function() {
      this.undrawMe(ctx);
      this._cursory--;
      this.drawMe(ctx);
    },
    'moveDown': function() {
      this.undrawMe(ctx);
      this._cursory++;
      this.drawMe(ctx);
    },
    'drawField': function() {
      for(var i = 0; i < this.MAXX; i++) {
        for(var j = 0; j < this.MAXY; j++) {
          this.drawAt(i, j, this._field[i][j]);
        }
      }
    },
    'drawAt': function(i, j, o) {
      this.makeSquare(i*this.SIZE, j*this.SIZE, this.getColor(o));
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
    }
  };
};
