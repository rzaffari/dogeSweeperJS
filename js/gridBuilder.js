function GridBuilder(size) {
	this.size 			= size;
	this.containerSize	= 40 * this.size + 20;
	this.gridContainer 	= document.querySelector(".grid-container");
	this.grid 			= document.createDocumentFragment();

	this.clearGridTree();
	this.build();
}

GridBuilder.prototype = {
	clearGridTree: function () {
		var children = this.gridContainer.children
			, child;
		while (child = children[0]) {
			this.gridContainer.removeChild(child);
		}
	},

	build: function () {
		var i = this.size;
		while(i-- > 0) {
			this.grid.appendChild(this.buildRow());
		}

		this.gridContainer.appendChild( this.grid.cloneNode(true) );
	},

	buildRow: function () {
		var row = this.createElement()
			, i = this.size;

		classie.add(row, 'grid-row');

		while(i-- > 0){
			row.appendChild(this.buildGridCell());
		}

		return row;
	},

	buildGridCell: function () {
		var gridCell = this.createElement();

		classie.add(gridCell, 'grid-cell');
		gridCell.appendChild(this.buildInnerCell());

		return gridCell;
	},

	buildInnerCell: function () {
		var innerCell = this.createElement();

		classie.add(innerCell, 'inner-cell');

		return innerCell;
	},

	createElement: function () {
		return document.createElement("div");
	},

};