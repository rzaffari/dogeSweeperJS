function GameManager(size) {
  	this.size 				= size; // Size of the grid
  	this.minesCount     	= 10;

  	this.start();
}

GameManager.prototype = {

	start: function  () {
		this.grid        	= new Grid(this.size);
		this.domHandler 	= new DOMHandler();
		this.messageHandler	= new MessageHandler();
	    this.won         	= false;
	    this.dogesFlips		= 0;

	    this.domHandler.setupDataSize(this.size);
	    
	    this.setupTiles();

	    this.domHandler.attach('.grid-cell', this.showTile, this);
	    this.domHandler.attach('.restart', this.reset, this);
	},

	reset: function (event, scope) {
		me = scope;

		me.messageHandler.stopLoop = true;

		me.domHandler.detach('.grid-cell', me.showTile, this);
		me.domHandler.detach('.restart', me.reset, this);

		me.domHandler.resetGrid();
		me.start();
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
				, me = scope
				, inner = document.createElement("div")
				, tile;

			if(cell.dataset){
				tile = me.grid.tileAt({ x: cell.dataset.x, y: cell.dataset.y });
			} else{
				tile = me.grid.tileAt({ x: cell.getAttribute("data-x"), y: cell.getAttribute("data-y")});
			}

			classie.add(inner, 'inner-tile');
			inner.textContent = tile.displayValue();
			cell.appendChild(inner);
			classie.add(cell, 'flip');

			if (tile.isMine()){
				me.showMineTile(cell, inner);
			} else{
				me.showNeighborTiles(tile);
			}
		}
	},

	showMineTile : function (cell, inner) {
		var me = this;

		classie.add(inner, 'doge');

		if(document.querySelectorAll('.doge-jump').length == 0) classie.add(cell, 'doge-jump');

		me.grid.mineCells().forEach( function (mine) {
			me.domHandler.flip(mine);
		});

		if(++me.dogesFlips == me.minesCount){
			me.endGame();	
		}
	},

	showNeighborTiles : function (tile) {
		var me = this;

		if (tile.displayValue() === ""){
			me.grid.neighborsOf(tile).forEach( function (neigh) {
				me.domHandler.flip(neigh);
			});
		} else {
			//Single tile or wave-border tile
			me.verify();
		}
	},

	verify: function() {
		var cells = this.domHandler.remainingCells();

		if (cells.length === this.minesCount) {
			this.won = true;
			this.endGame();
		}
	},

	endGame: function () {
		this.domHandler.detach('.grid-cell', this.showTile);
		this.messageHandler.sayWow(this.won);
	}

};

