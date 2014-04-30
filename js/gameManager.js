function GameManager(size) {
  	this.size 				= size; // Size of the grid
  	this.minesCount     	= 10;

  	me = this;

  	me.start();
}

GameManager.prototype = {

	start: function  () {
		me.grid        	= new Grid(me.size);
		me.eventHandler = new EventHandler();
	    me.score       	= 0;
	    me.won         	= false;
	    me.dogesFlips	= 0;

	    me.setupTiles();

	    me.eventHandler.attach('.grid-cell', this.showTile);
	    me.eventHandler.attach('.restart', me.reset);
	},

	reset: function () {
		me.eventHandler.resetGrid();
		me.start();
	},

	setupTiles: function  () {
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

	showTile: function(event) {
		if(!classie.has(this, 'flip')) {
			var cell = this
				, inner = document.createElement("div")
				, tile = me.grid.tileAt({ x: cell.dataset.x, y: cell.dataset.y });

			classie.add(inner, 'inner-tile');
			inner.textContent = tile.displayValue();
			cell.appendChild(inner);
			classie.add(cell, 'flip');

			if (tile.isMine()){
				me.showMineTile(cell, inner);
			} else{
				me.showNeighborTile(tile);
			}
		}
	},

	showMineTile : function (cell, inner) {
		classie.add(inner, 'doge');

		if(document.querySelectorAll('.doge-jump').length == 0) classie.add(cell, 'doge-jump');

		me.grid.mineCells().forEach( function (mine) {
			me.eventHandler.trigger(mine);
		});

		if(++me.dogesFlips == me.minesCount){
			me.gameOver();	
		}
	},

	showNeighborTile : function (tile) {
		if (tile.displayValue() === ""){
			me.grid.neighborsOf(tile).forEach( function (neigh) {
				me.eventHandler.trigger(neigh);
			});
		}
	},

	gameOver: function () {
		me.eventHandler.detach('.grid-cell', this.showTile);
		me.eventHandler.message(me.over);
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

