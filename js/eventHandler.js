function EventHandler () {
	this.gridContainer = document.querySelector(".grid-container");

	this.setupData();
}

EventHandler.prototype = {

	setupData: function () {
		var me = this
			, rows = me.gridContainer.children;

		for (var x = 0, lx = rows.length; x < lx; x++) {
			var cells = rows[x].children;

			for (var y = 0, ly = cells.length; y < ly; y++) {
				var cell = cells[y];
				cell.dataset.x = x;
				cell.dataset.y = y;
			};
		};
	},

	attach: function (clas, callback) {
		var i = 0
			, elems = document.querySelectorAll(clas)
			, elem;

		while (elem = elems[i++]) {
			elem.addEventListener('click', callback, false);
		}
	},

	selectDOMCell: function (cell) {
		return document.querySelector('.grid-cell[data-x="'+ cell.x +'"][data-y="'+ cell.y +'"]');
	},

	trigger: function(cell) {
		var domCell = me.eventHandler.selectDOMCell(cell);
		if(!classie.has(domCell, 'flip')) {
			setTimeout(function () {
				domCell.click();
			}, 300);
		}
	},

	resetGrid: function () {
		debugger;
		var i = 0
			, inners = this.gridContainer.querySelectorAll('.inner-tile')
			, inner;

		while (inner = inners[i++]) {
			classie.remove(inner.parentNode, 'flip');
			inner.parentNode.removeChild(inner);
		}

	}

};

