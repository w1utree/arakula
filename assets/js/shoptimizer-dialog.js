const shoptimizerdialog = document.querySelector( 'dialog.shoptimizer-modal' );
document.addEventListener( 'click', event => {
    const shoptimizertrigger = event.target.dataset.trigger;
    if ( shoptimizertrigger ) {
        const modalElement = document.querySelector( `[data-shoptimizermodal-id="${shoptimizertrigger}"]` );
        if ( modalElement ) {
            modalElement.showModal();
        }
    }
} );

Array.from( document.querySelectorAll( 'dialog.shoptimizer-modal' ) ).forEach( shoptimizerdialog => {
  shoptimizerdialog.addEventListener( 'click', function( event ) {
    if ( event.target.closest( '.shoptimizer-modal-close' ) ) {
      event.preventDefault();
      shoptimizerdialog.close();
    }
  } );
} );