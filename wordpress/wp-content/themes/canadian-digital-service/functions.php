<?php
/**
 * Canadian Digital Service functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Canadian_Digital_Service
 */

if ( ! function_exists( 'canadian_digital_service_setup' ) ) :
	function canadian_digital_service_setup() {
		load_theme_textdomain( 'canadian-digital-service', get_template_directory() . '/languages' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );

		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'canadian-digital-service' ),
		) );

	}
endif;

add_action( 'after_setup_theme', 'canadian_digital_service_setup' );

/**
 * Enqueue scripts and styles.
 */
function canadian_digital_service_scripts() {
	#wp_enqueue_script( 'script-name', get_template_directory_uri() . '/js/example.js', array(), '1.0.0', true );
	wp_enqueue_style( 'canadian-digital-service-style', get_template_directory_uri(). "/public/dist/main.css" );
}

add_action( 'wp_enqueue_scripts', 'canadian_digital_service_scripts' );

function get_image_directory($image) {
	return get_template_directory_uri()."/public/img/".$image;
}

function get_favicon($icon) {
	return get_template_directory_uri()."/public/".$icon;
}