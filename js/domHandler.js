function DOMHandler () {
	this.content			= document.querySelector(".content");
	this.dsContainer 		= document.querySelector(".ds-container");
	this.gridContainer 		= document.querySelector(".grid-container");

	this.setupData();
}

DOMHandler.prototype = {

	setupData: function () {
		var me = this
			, rows = me.gridContainer.children;
		
		for (var x = 0, lx = rows.length; x < lx; x++) {
			var cells = rows[x].children;

			for (var y = 0, ly = cells.length; y < ly; y++) {
				var cell = cells[y];
				if(cell.dataset){
					cell.dataset.x = x;
					cell.dataset.y = y;
				} else{
					cell.setAttribute("data-x", x);
					cell.setAttribute("data-y", y);
				}
				
			};
		};
	},

	attach: function (clas, callback, scope) {
		var i = 0
			, elems = document.querySelectorAll(clas)
			, elem
			, func = function (event) {
				callback.call(this, event, scope);
			};

		while (elem = elems[i++]) {
			elem['func'] = func;
			elem.addEventListener('click', func);
			classie.remove(elem, 'disabled');
		}
	},

	detach: function (clas, callback) {
		var i = 0
			, elems = document.querySelectorAll(clas)
			, elem;

		while (elem = elems[i++]) {
			elem.removeEventListener('click', elem['func']);
			classie.add(elem, 'disabled');
		}
	},

	selectDOMCell: function (cell) {
		return document.querySelector('.grid-cell[data-x="'+ cell.x +'"][data-y="'+ cell.y +'"]');
	},

	flip: function(cell) {
		var domCell = this.selectDOMCell(cell);
		if(!classie.has(domCell, 'flip')) {
			setTimeout(function () {
				domCell.click();
			}, 300);
		}
	},

	resetGrid: function () {
		var i = 0
			, inners = this.gridContainer.querySelectorAll('.inner-tile')
			, inner;

		while (inner = inners[i++]) {
			classie.remove(inner.parentNode, 'flip');
			classie.remove(inner.parentNode, 'doge-jump');
			inner.parentNode.removeChild(inner);
		}

	},

	remainingCells: function() {
		return this.gridContainer.querySelectorAll('.grid-cell:not(.flip)');
	},

	setupDataSize: function (size) {
		this.content.setAttribute("data-grid-size", size);
	}
};

