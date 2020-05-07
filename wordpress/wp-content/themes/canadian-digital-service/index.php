<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Canadian_Digital_Service
 */

get_header();
?>
<div class="container mx-auto mb-10">
<?php 
if ( have_posts() ) :
	
	while ( have_posts() ) :
		the_post();
		// the_title( '<h2 class="text-4xl font-bold pb-5 font-sans">', '</h2>' );
		the_content();
	endwhile; // End of the loop.
	
endif;
?>
</div>
<?php
get_footer();