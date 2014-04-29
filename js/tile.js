function Tile(position) {
  this.x                = position.x;
  this.y                = position.y;
  this.counter          = 0;
  this.mine				= false;
}

Tile.prototype = {

	isMine: function() {
		return this.mine;
	},

	setMine: function() {
		this.mine = true;
	},

	incrementCounter: function() {
		this.counter++;
	},

	displayValue: function () {
		return this.counter === 0 ? "" : this.counter
	}

};

