
module.exports = function(ctx) {
  return {
    '_users': [],
    '_viewx': 0,
    '_viewy': 0,
    '_viewsize': 20,
    'MAXX': 100,
    'MAXY': 100,
    'SIZE': 20,


    '_field': [],
    '_ctx': ctx,
    'addUser': function(session) {
      this._users.push({
        sessionid: session,
        cursorx: 0,
        cursory: 0
      });
      return this._users.length-1;
    },
    'validateUser': function(uid, session) {
      return uid < 0 || uid >= this._users.length ||
        this._users[uid].session != session;
    },
    'getWorld': function(uid) {
      return { world: this._field, 'uid': uid };
    },
    'setWorld': function(field) {
      this._field = field;
    },
    'getState': function() {
      return {
        users: this._users
      };
    },
    'setState': function(uid, state) {
      this.undrawUsers();
      this._users = state.users;
      this.moveTo(uid, this._users[uid].cursorx, this._users[uid].cursory);
    },
    'collision': function(uid, x1, y1) {
      if(uid >= this._users.length) {
        return;
      }
      var x = this._users[uid].cursorx + x1;
      var y = this._users[uid].cursory + y1;
      return (x < 0 || x >= this.MAXX || y < 0 || y >= this.MAXY || this._field[x][y] === 0);
    },
    'moveTo': function(uid, x, y) {
      this.undrawUsers();
      this._users[uid].cursorx = x;
      this._users[uid].cursory = y;
      this.ensureCentered(uid);
      this.drawUsers();
    },
    'moveLeft': function(uid) {
      this.undrawUsers();
      this._users[uid].cursorx--;
      this.ensureCentered(uid);
      this.drawUsers();
    },
    'moveRight': function(uid) {
      this.undrawUsers();
      this._users[uid].cursorx++;
      this.ensureCentered(uid);
      this.drawUsers();
    },
    'moveUp': function(uid) {
      this.undrawUsers();
      this._users[uid].cursory--;
      this.ensureCentered(uid);
      this.drawUsers();
    },
    'moveDown': function(uid) {
      this.undrawUsers();
      this._users[uid].cursory++;
      this.ensureCentered(uid);
      this.drawUsers();
    },
    'undrawUsers': function() {
      var self = this;
      this._users.forEach(function(user) {
        self.drawAt(user.cursorx, user.cursory,
          self._field[user.cursorx][user.cursory]);
      });
    },
    'drawUsers': function() {
      var self = this;
      this._users.forEach(function(user) {
        self.drawAt(user.cursorx, user.cursory, 4);
      });
    },
    'ensureCentered': function(uid) {
      if(uid >= this._users.length) {
        return;
      }
      var minvbuf = this._viewsize/4;
      var maxvbuf = this._viewsize*3/4;
      var minx = this._viewx+(minvbuf);
      var miny = this._viewy+(minvbuf);
      var maxx = this._viewx+(maxvbuf);
      var maxy = this._viewy+(maxvbuf);
      var oldx = this._viewx;
      var oldy = this._viewy;
      var user = this._users[uid];
      if(user.cursorx < minx) {
        this._viewx -= minx-user.cursorx;
        if(this._viewx < 0) {
          this._viewx = 0;
        }
      } else if(user.cursorx > maxx) {
        this._viewx += user.cursorx-maxx;
        if(this._viewx > this.MAXX-this._viewsize) {
          this._viewx = this.MAXX-this._viewsize;
        }
      }
      if(user.cursory < miny) {
        this._viewy -= miny-user.cursory;
        if(this._viewy < 0) {
          this._viewy = 0;
        }
      } else if(user.cursory > maxy) {
        this._viewy += user.cursory-maxy;
        if(this._viewy > this.MAXY-this._viewsize) {
          this._viewy = this.MAXY-this._viewsize;
        }
      }
      if(oldy !== this._viewy || oldx !== this._viewx) {
        this.drawField();
      }
    },
    'makeField': function() {
      for(var x = 0; x < this.MAXX; x++) {
        this._field.push([]);
        for(var y = 0; y < this.MAXY; y++) {
          this._field[x].push(Math.floor(Math.random()*4));
        }
      }
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
      if(!this._ctx) {
        return;
      }
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
    }
  };
};
