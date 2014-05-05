function MessageHandler () {
	this.wowShouts	= [];
	this.sayWon 	= [ 
						'Such Win', 'Much Good', 
						'Wow'
					];
	this.sayLose 	= [
						'Such Lose', 'Such Lost', 
						'Very Loser', 'Wow'
					];
	this.colors 	= [ "960DFF", "0CE8C6", "6F3", "FFF000", "E88470", "F0C", "240DFF", "87FF0D", "E81F18" ];

	this.pElem 		= document.createElement("p");
	this.body		= document.body;

}

MessageHandler.prototype = {

	sayWow: function(won) {
		this.wowShouts = won ? this.sayWon.slice() : this.sayLose.slice();
        this.shoutWow();
    },

    shoutWow: function() {
    	this.defineWow()
        this.body.appendChild(this.pElem);
		setTimeout( this.cleanAndWow.bind(this), 800);
    },

    defineWow: function () {
		var color
			, phrase
			, topPos
			, leftPos;

		phrase 	= Math.floor( ( Math.random() * this.wowShouts.length ) + 1 );
		topPos 	= Math.floor( ( Math.random() * (window.innerHeight - 100) ) + 1 );
        leftPos = Math.floor( ( Math.random() * (window.innerWidth - 100) ) + 1 );
        color 	= Math.floor( ( Math.random() * this.colors.length) );

    	classie.add(this.pElem, 'say-wow');
        this.pElem.textContent = this.wowShouts.splice(phrase, 1);
        
        this.pElem.style.top = topPos + "px";
        this.pElem.style.left = leftPos + "px";
        this.pElem.style.color = "#" + this.colors[color];

    },

    cleanAndWow: function () {
    	classie.remove(this.pElem, 'say-wow');
    	this.pElem.parentNode.removeChild(this.pElem);

    	if (this.wowShouts.length > 0) this.shoutWow();
    }
};