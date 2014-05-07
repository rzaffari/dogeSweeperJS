function MessageHandler () {
	this.wowShouts	= [];
	this.sayWon 	= [ 
						'Such Win', 'Much Good', 
						'Wow', 'Doge Approves',
						'Such Luck', 'Try Again'
					];
	this.sayLose 	= [
						'Such Lost', 'So Stupid',
						'Very Loser', 'Wow',
						'Ugly Game', 'Just Quit',
						'Much Defeat', 'So Terrible',
						'Wow', 'Doge Always Wins'
					];
	this.colors 	= [ "960DFF", "0CE8C6", "6F3", "FFF000", "E88470", "F0C", "240DFF", "87FF0D", "E81F18" ];
	this.sizes		= [ "48", "32", "38", "52"];

	this.pElem 		= document.createElement("p");
	this.body		= document.body;
	this.stopLoop	= false;

}

MessageHandler.prototype = {

	sayWow: function(won) {
		this.stopLoop = false;
		this.wowShouts = won ? this.sayWon.slice() : this.sayLose.slice();
        this.shoutWow();
    },

    shoutWow: function() {
    	this.defineWow()
        this.body.appendChild(this.pElem);
		setTimeout( this.cleanAndWow.bind(this), 1000);
    },

    defineWow: function () {
		var color
			, phrase
			, topPos
			, leftPos;

		phrase 	= Math.floor( ( Math.random() * this.wowShouts.length ) );
		topPos 	= Math.floor( ( Math.random() * (window.innerHeight - 200) ) + 1 );
        leftPos = Math.floor( ( Math.random() * (window.innerWidth - 200) ) + 1 );
        color 	= Math.floor( ( Math.random() * this.colors.length) );
        size 	= Math.floor( ( Math.random() * this.sizes.length) );

    	classie.add(this.pElem, 'say-wow');
        this.pElem.textContent = this.wowShouts.splice(phrase, 1);
        
        this.pElem.style.top = topPos + "px";
        this.pElem.style.left = leftPos + "px";
        this.pElem.style.fontSize = this.sizes[size] + "px";
        this.pElem.style.color = "#" + this.colors[color];

    },

    cleanAndWow: function () {
    	classie.remove(this.pElem, 'say-wow');
    	this.pElem.parentNode.removeChild(this.pElem);

    	if (!this.stopLoop && this.wowShouts.length > 0) this.shoutWow();
    }
};