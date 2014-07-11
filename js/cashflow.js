//set up to accept expenses
function CashFlow( ){
	var o = arguments[0] ? arguments[0] : { in: 1000.0, out: 500.0, housing: 500.0 }
	console.log(o)
	this.in = o.in ? o.in : 1000.00;
	this.housing = o.housing ? o.housing : 500.00;
	this.out = o.out ? o.out : 500.00;
	this.other = [0]
	

	this.addCashFlow = function( cf ){
		var c = { 	in: cf.in + this.in,
				  	out: cf.out + this.out,
				  	housing: cf.housing + this.housing 
				 }
		return new CashFlow( c )
	}
}

Object.defineProperties( CashFlow.prototype,
	 		{ 
	 			expenses:   { get: function(){ return this.housing + this.out + this.purchases } },
	 			savings: 	{ get: function(){ return this.in - this.expenses }},
	 			purchases:  { get: function(){ return this.other.reduce(function(c,p,i,v){return c+p })},
	 						  set: function(v){ this.other.push(v)}}, 
	 			toObj:   	{ get: function(){ return { in: this.in, out: this.out, housing: this.housing }} }
		   }
);

function Simulation( ){
	var o = arguments[0] ? arguments[0] : { periods: 24, cashFlow: new CashFlow()}
	this.periods = o.periods ? o.periods : 24; //months
	this.cashFlow = o.cashFlow ? o.cashFlow : new CashFlow( {in: 10000.0, out: 4000.00, housing: 2500.00 })
	this.yearly = { income: 	this.cashFlow.in * 12.0,
					expenses: 	this.cashFlow.expenses * 12.0,
					savings: 	this.cashFlow.savings * 12.0,
					housing:  	this.cashFlow.housing * 12.0,
				  }
	this.purchases = {}

	this.cumulative = function(end){
		var c = [ { cashflow: this.cashFlow, purchases: this.purchases[0], net: 'foo'}]
		for( var i = 1; i < end; i++){
			c.push( { cashflow: c[i-1].cashflow.addCashFlow( this.cashFlow ), purchases: this.purchases[i] })
		}

		return c;
	}//cumulative

	this.newPurchase = function( period, purchase ){
		this.purchases[period] = purchase;
	}
}

function Purchase( item, cost){
	this.item = item ? item : 'EXPENSE'
	this.cost = cost ? cost : 0
}

