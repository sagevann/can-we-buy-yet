var base = {}
base.price = 450000
base.apr = 0.045
base.term = 30

base.down ={}
base.down.pct = 0.07
base.down.$ = base.price * base.down.pct

base.exp = {} 
base.exp.other = 7200
base.exp.rent = 300



function mtgPrincipal( price, down, pct ){

	//default to calculating by pct
	pct = typeof pct === 'undefined' ? true : false

	if( pct ){
		down = down > 1 ? down / 100 : down
		return price - downPayment( price, down)
	} else {
		return price - down
	}
}

function downPayment( P, i ){
	return P * i
}
	var Expenses = Backbone.Model.extend({
		defaults: {
			other: base.exp.other,
			rent: base.exp.rent
		},
		total: function(){ return this.get('other') + this.get('rent')}

	});//Expenses

	var Payment = Backbone.Model.extend({
		defaults: {
			number: 0

		}

	});//payment

	var Mortgage = Backbone.Model.extend({
		defaults:{
			price : base.price,
			apr : base.apr,
			down : base.down.$,
			dPct : base.down.pct,
			principal : base.price - base.down.$,
			term : base.term,
			periods: 12
		},
		payment: function(){  
			 	P = this.get('principal'),
				i = this.get('apr') / this.get('periods'),
				n = this.get('term') * this.get('periods'),
				In = Math.pow( (1 + i), n ),
				payment = P * ( ( i * In) / (In - 1) )

			return payment;
		},
		initialize: function(o){
			if( o ){
				this.set({price: o.price || base.price})
				if(typeof o.dPct !== 'undefined'){		
					this.set({ down: this.get('price') * o.dPct});
				 } else { 
					 	this.set({ down: o.down || base.down.$});
				 } 
				//console.log(this.down)
				this.set({ principal: (this.get('price') - this.get('down'))} )
				this.set({ apr: o.apr || base.apr } )
				this.set({ term: o.term || base.term })
			}
		}

	});//Mortgage

	//price
	//apr
	//down
	//fee_pct
	//tax_pct
	//d_by_pct
	var HomePurchase = Backbone.Model.extend({
		defaults:{
			

		},
		initialize: function(){
		
		}

	});//HomePurchase


var togglePercent = function( e ){
		e.data.t.text('$')
	
		$(e.data.t.data['toggle-target']).attr('placeholder', '$5000')

}



function convertDownToDollars( ){
	var value = $('#pct-down').val() / 100.0 * $('#price').val()
	return value.toFixed(0)
}

function convertDownToPct( ){
	var value = $('#dollars-dow').val() / $('#price').val()
	return value.toFixed(2)
}

function makeMortageFromForm(  )
{

	var o = {}
		
		o.price	= parseInt($('#price').val() )|| base.price
		o.apr 	= $('#apr').val() / 100.0 || base.apr
		o.dPct 	= $('#pct-down').val() / 100.0 || base.down.pct
		o.term = $('#term').val() || base.term

	console.log( o)
	//	fees 	= $('fees'),
	//	tax 	= $('property-tax')
	return new Mortgage( o )

}

function updateBaseMortgage( ){
	$('.payment').text('$'+ base_mtg.payment().toFixed(2))
}


	var exp = new Expenses()
	var home_450_7 = new HomePurchase()
	var mtg_450_7 = new Mortgage()
	var mtg_350_22 = new Mortgage( { price: 350000, dPct: 0.22} )
	var mtg_350_35k = new Mortgage( { price: 350000, down: 35022, term: 15} )

var base_mtg = new Mortgage()

$(function(){

	updateBaseMortgage( )
	$('.converted-down').text(convertDownToDollars())

	$('#calculate-payment').click( function(e){
		e.preventDefault();
		base_mtg = makeMortageFromForm( )
		updateBaseMortgage( )
	})

	$('#price,#pct-down,#apr,#term').on('change', function(){
		base_mtg = makeMortageFromForm()
		updateBaseMortgage( )


	})


	$('#pct-down').on('change', function(){
		$('#dollars-down').text('($'+convertDownToDollars()+')')
		$('#down').val(convertDownToDollars())
	})

	
})


