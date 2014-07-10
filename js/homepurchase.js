function proper( proto, prop, f ){
	console.log('proper: added ' + prop + ' to ' + proto.name )
	Object.defineProperty( proto, prop, { get: f } );
}

function propers( proto, options){
	for(var o in options ){
		console.log( 'propers: ' + options[o]["prop"] )
		proper( proto, options[o]["prop"], options[o]["f"]);
	}
}

function HomePurchase( price, down, apr, term){
	this.price = price ? price : 100000.00;
	this.down = down ? down : 20000.0;
	this.apr = apr ? apr : .04;
	this.term = term ? term : 30; //years
}



HomePurchase.prototype = {
	name: "HomePurchase",
    payment: function(){
    	return 'payment';
    }
};

var hpo = [
	 		{ prop: 'principal', f: function(){return this.price - this.down;} },
	 		{ prop: 'P', f: function(){ return this.principal }},
			{ prop: 'i', 	f: function(){ return (this.apr <= 1) ?  this.apr /12.0 : this.apr / 1200.0 } },
			{ prop: 'n',	f: function(){ return this.term * 12 } },
			{ prop: 'iN', 	f: function(){ return Math.pow( (1 + this.i ), this.n ); } },
			{ prop: 'pmt', 	f: function(){ return (this.P * (this.i * this.iN) / (this.iN - 1)).toFixed(2); } }
		   ]
//hpo.push( 3 )

propers( HomePurchase.prototype, hpo )

var b = new HomePurchase();
function principalPaid( payment, principal, rate){
	rate = ( rate > 1 ) ? rate / 100.0 : rate
	
	var interest_accrued = principal * rate,
		principal_paid = payment - interest_accrued

		return principal_paid
}

