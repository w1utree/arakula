/**
 *
 * Shoptimizer quantity custom script
 *
 * @package Shoptimizer
 */

let changEv   = new Event( 'change' );
let sidebarEl = [];
let timerId;
let miniItems;
const shopWidget = document.querySelector( '.widget_shopping_cart' );

const shoptimizerDelayFunction = function( func, delay ) {
	clearTimeout( timerId );
	timerId = setTimeout( func, delay );
};
function shoptimizerInitMiniCartQty() {
	if ( ! shopWidget ) {
		return;
	}
	sidebarEl = [];
	miniItems = shopWidget.querySelectorAll( '.shoptimizer-custom-quantity-mini-cart' );
	miniItems.forEach(
		function( item ) {
			sidebarEl.push(
				{
					qtInput: item.querySelector( 'input' ),
					qtButtons: Array.from( item.querySelectorAll( '.shoptimizer-custom-quantity-mini-cart_button' ) )
				}
			);
		}
	);
	sidebarEl.forEach(
		function( item ) {
			item.qtButtons.forEach(
				function( btn ) {
					btn.addEventListener( 'click', shoptimizerEachSideBtnListener );
				}
			);
			item.qtInput.addEventListener( 'change', shoptimizerUpdateMiniCart );
		}
	);
}
function shoptimizerEachSideBtnListener() {
	const item   = sidebarEl.find( ( el ) => el.qtButtons.includes( this ) );
	let value    = parseInt( item.qtInput.value, 10 );
	value        = isNaN( value ) ? 1 : value;
	let minValue = parseInt( item.qtInput.getAttribute( 'min' ), 10 );
	let maxValue = parseInt( item.qtInput.getAttribute( 'max' ), 10 );
	if ( this.classList.contains( 'quantity-up' ) ) {
		value++;
		if ( ! isNaN( maxValue ) && value > maxValue ) {
			value = maxValue;
		}
	} else {
		value--;
		if ( ! isNaN( minValue ) && value < minValue ) {
			value = minValue;
		}
		1 > value ? ( value = 1 ) : '';
	}
	if ( item.qtInput.value != value ) {
		item.qtInput.value = value;
		item.qtInput.dispatchEvent( changEv );
	}
}
function shoptimizerUpdateMiniCart() {
	shoptimizerDelayFunction(
		function() {
			var formData = new FormData();
			miniItems    = document.querySelectorAll( '.shoptimizer-custom-quantity-mini-cart' );
			miniItems.forEach(
				function( item ) {
					let input   = item.querySelector( 'input' );
					let qty     = parseInt( input.value, 10 );
					qty         = isNaN( qty ) ? 1 : qty;
					let itemKey = input.getAttribute( 'data-cart_item_key' );
					formData.append( 'data[' + itemKey + ']', qty );
				}
			);
			formData.append( 'action', 'cg_shoptimizer_update_mini_cart' );
			var ajax_loader = document.querySelector( '#ajax-loading' );
			if ( ajax_loader ) {
				ajax_loader.style.display = 'block';
			}
			fetch(
				woocommerce_params.ajax_url,
				{
					method: 'POST',
					body: formData
				}
			).then(
				response => response.json()
			).then(
				function( json ) {
					var wcfragment = new Event( 'wc_fragment_refresh' );
					document.body.dispatchEvent( wcfragment );
					var wccart = document.querySelectorAll( 'form.woocommerce-cart-form input.qty, form.woocommerce-checkout' );
					if ( 0 < wccart.length ) {
						window.location.reload();
					}
				}
			);
		},
		600
	);
}
jQuery( 'body' ).on( 'wc_fragments_refreshed wc_fragments_loaded', shoptimizerInitMiniCartQty );
shoptimizerInitMiniCartQty();
