function Grid(size) {
  this.size = size;
  this.cells = this.clearGrid();
  this.mines = [];

}

Grid.prototype = {

	clearGrid: function () {
		var cells = [];

		for (var x = 0; x < this.size; x++) {
			var row = cells[x] = [];

			for (var y = 0; y < this.size; y++) {
				row.push(new Tile({ x:x, y:y }));
			};
		};

		return cells;
	},

	forEachCell: function(callback) {
		for (var x = 0; x < this.size; x++) {
			for (var y = 0; y < this.size; y++) {
				callback(this.cells[x][y]);
			}
		}
	},

	tileAt: function(cell) {
		return this.cells[cell.x][cell.y];
	},


	neighborsOf: function(cell) {
		var cells = []
			, maxX = cell.x + 2
			, maxY = cell.y + 2;

		for (var row = cell.x-1; row < maxX; row++) {
			for (var col = cell.y-1; col < maxY; col++) {
				var candidate = { x: row, y: col };
				
				if(this.withinBounds(candidate)) {
					cells.push(candidate);
				}
			};
		};

		return cells;
	},

	mineCells: function() {
		var self = this
			, mines = self.mines;

		if (mines <= 0){

			this.forEachCell(function (tile) {
				if (tile.isMine()) {
					mines.push({ x: tile.x, y: tile.y });
				}
			});

		}

		return mines;
	},

	randomAvailableCell: function () {
		var cells = this.availableCells();

		if (cells.length) {
			return cells[Math.floor(Math.random() * cells.length)];
		}
	},

	availableCells: function () {
		var cells = [];

		this.forEachCell(function (tile) {
			if (!tile.isMine()) {
				cells.push({ x: tile.x, y: tile.y });
			}
		});

		return cells;
	},

	withinBounds: function (position) {
	  return position.x >= 0 && position.x < this.size &&
	         position.y >= 0 && position.y < this.size;
	}

};

 