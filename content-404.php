<?php
/**
 * The template part for displaying a 404 page.
 *
 * Learn more: https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package shoptimizer
 */

?>

<div class="site-main">
<?php 

	$query = new WP_Query(
	    array(
	        'post_type'              => 'wp_block',
	        'title'                  => '404',
	        'post_status'            => 'publish',
	        'posts_per_page'         => 1
	    )
	);

	if ( $query->have_posts() == NULL ) {
	?>

	<header class="page-header">
		<h1 class="page-title"><?php esc_html_e( 'That page can&rsquo;t be found.', 'shoptimizer' ); ?></h1>
	</header><!-- .page-header -->

	<p><?php esc_html_e( 'Nothing was found at this location. Try searching, or check out the popular items below.', 'shoptimizer' ); ?></p>

	<?php
	if ( shoptimizer_is_woocommerce_activated() ) {

		echo '<section class="site-main" aria-label="' . esc_html__( 'Popular Products', 'shoptimizer' ) . '">';

			echo '<h2>' . esc_html__( 'Popular Products', 'shoptimizer' ) . '</h2>';

			echo shoptimizer_do_shortcode( 'best_selling_products', array(
				'per_page' => 8,
				'columns'  => 4,
			) );

		echo '</section>';

	}
	?>

	<?php } else {

		$object = $query->post;
    	echo apply_filters('the_content', $object->post_content);
		wp_reset_postdata();
	}

?>
</div>
