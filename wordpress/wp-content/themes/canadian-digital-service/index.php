<?php
get_header();
?>
<div class="container mx-auto mb-10">
<?php 
if ( have_posts() ) :
	
	while ( have_posts() ) :
		the_post();
		the_title( '<h1>', '</h1>' );
		the_content();
	endwhile; // End of the loop.
	
endif;
?>
</div>
<?php
get_footer();