function GameManager(size) {
  	this.size 				= size; // Size of the grid
  	this.minesCount     	= 10;

  	me = this;

  	me.start();
}

GameManager.prototype = {

	start: function  () {
		this.grid        	= new Grid(this.size);
		this.eventHandler 	= new EventHandler();
	    this.score       	= 0;
	    this.over        	= false;
	    this.won         	= false;

	    this.setupTiles();

	    this.eventHandler.attach(this.showTile);
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

	showTile: function(event) {
		var cell = this
			, inner = document.createElement("div")
			, tile = me.grid.tileAt({ x: cell.dataset.x, y: cell.dataset.y })
			, value = tile.displayValue();

		classie.add(inner, 'inner-tile');
		
		inner.textContent = value;
		cell.appendChild(inner);

		if (tile.isMine()){
			classie.add(inner, 'doge');
			classie.add(cell, 'flip');

			if(document.querySelectorAll('.doge-jump').length == 0) classie.add(cell, 'doge-jump');

			me.grid.mineCells().forEach( function (mine) {
				me.eventHandler.trigger(mine);
			});
		} else{
			classie.add(cell, 'flip');

			if (!tile.isMine() && value === ""){
				me.grid.neighborsOf(tile).forEach( function (neigh) {
					me.eventHandler.trigger(neigh);
				});
			}
		}
		
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

