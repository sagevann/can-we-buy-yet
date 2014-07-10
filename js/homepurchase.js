function HomePurchase( price, down, apr, term, taxrate){
	this.price = price ? price : 100000.00;
	this.down = down ? down : 20000.0;
	this.apr = apr ? apr : .04;
	this.term = term ? term : 30; //years
	this.taxrate = taxrate ? taxrate : 0.0;
}

Object.defineProperties( HomePurchase.prototype,
	 		{ 
	 			principal: 	{ get: function(){ return this.price - this.down;} },
	 			P: 			{ get: function(){ return this.principal }},
	 			i: 			{ get: function(){ return (this.apr <= 1) ?  this.apr /12.0 : this.apr / 1200.0 } },
				n:			{ get: function(){ return this.term * 12 } },
				iN: 		{ get: function(){ return Math.pow( (1 + this.i ), this.n ); } },
				pmt: 		{ get: function(){ return (this.P * (this.i * this.iN) / (this.iN - 1)); } },
				pctDown: 	{ get: function(){ return ((this.down / this.price ) * 100.0 );},
							  set: function(pct){ var d = this.price * pct; ( pct >= 1 ) ? this.down = d/100.0 : this.down = d; }},
				pmi: 		{ get: function(){ return (this.pctDown < 20) ? (this.pmt * ( 20.0 - this.pctDown )/100.0) : 0.00  }},
				taxes: 		{ get: function(){ return ( this.principal * this.taxrate ) / 12 }},
				piti: 		{ get: function(){ return this.pmt + this.taxes + this.pmi}}
		   }

);

function pmi( ){
	(20.0 - this.pctDown) 
}
function principalPaid( payment, principal, rate){
	rate = ( rate > 1 ) ? rate / 100.0 : rate
	
	var interest_accrued = principal * rate,
		principal_paid = payment - interest_accrued

		return principal_paid
}

