function GameManager(size) {
  	this.size 				= size; // Size of the grid
  	this.minesCount     	= 10;

  	//me = this;

  	this.start();
}

GameManager.prototype = {

	start: function  () {
		this.grid        	= new Grid(this.size);
		this.eventHandler = new EventHandler();
	    this.score       	= 0;
	    this.won         	= false;
	    this.dogesFlips	= 0;

	    this.setupTiles();

	    this.eventHandler.attach('.grid-cell', this.showTile, this);
	    this.eventHandler.attach('.restart', this.reset);
	},

	reset: function () {
		this.eventHandler.resetGrid();
		this.eventHandler.clearMessage(this.over);
		this.start();
	},

	setupTiles: function  () {
		var me = this;
		
		me.addMines();

		var mines = me.grid.mineCells();

		mines.forEach(function (mine){
			var neighbors = me.grid.neighborsOf(mine);
			
			neighbors.forEach(function (cell) {
				var tile = me.grid.tileAt(cell);
				if (!tile.isMine()) me.grid.tileAt(cell).incrementCounter();
			});
		});
	},

	addMines: function  () {
		for (var i = 0; i < this.minesCount; i++) {
			this.grid.tileAt(this.grid.randomAvailableCell()).setMine();
		};
	},

	showTile: function(event, scope) {
		if(!classie.has(this, 'flip')) {
			var cell = this
				, inner = document.createElement("div")
				, tile = scope.grid.tileAt({ x: cell.dataset.x, y: cell.dataset.y });

			classie.add(inner, 'inner-tile');
			inner.textContent = tile.displayValue();
			cell.appendChild(inner);
			classie.add(cell, 'flip');

			if (tile.isMine()){
				scope.showMineTile(cell, inner);
			} else{
				scope.showNeighborTiles(tile);
			}
		}
	},

	showMineTile : function (cell, inner) {
		var me = this;

		classie.add(inner, 'doge');

		if(document.querySelectorAll('.doge-jump').length == 0) classie.add(cell, 'doge-jump');

		me.grid.mineCells().forEach( function (mine) {
			me.eventHandler.flip(mine);
		});

		if(++me.dogesFlips == me.minesCount){
			me.endGame();	
		}
	},

	showNeighborTiles : function (tile) {
		var me = this;

		if (tile.displayValue() === ""){
			me.grid.neighborsOf(tile).forEach( function (neigh) {
				me.eventHandler.flip(neigh);
			});
		} else {
			//Single tile or wave-border tile
			me.verify();
		}
	},

	verify: function() {
		var cells = this.eventHandler.remainingCells()
			, mines = this.grid.mineCells();

		if (cells.length === mines.length) {
			this.won = true;
			this.endGame();
		}
	},

	endGame: function () {
		me.eventHandler.detach('.grid-cell', this.showTile);
		me.eventHandler.message(me.won);
	}

	/*showAll: function () {
		var me = this
			, gridContainer = document.querySelector(".grid-container")
			, rows = gridContainer.children;

		for (var x = 0, lx = rows.length; x < lx; x++) {
			var cells = rows[x].children;

			for (var y = 0, ly = cells.length; y < ly; y++) {
				var cell = cells[y]
					, inner = document.createElement("div")
					, tile = me.grid.tileAt({ x: x, y: y });

				classie.add(inner, 'inner-tile');
				inner.textContent = tile.displayValue();

				cell.appendChild(inner);
			};
		};

	}*/

};

