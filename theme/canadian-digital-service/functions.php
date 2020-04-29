<?php
/**
 * Canadian Digital Service functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Canadian_Digital_Service
 */

if ( ! function_exists( 'canadian_digital_service_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function canadian_digital_service_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Canadian Digital Service, use a find and replace
		 * to change 'canadian-digital-service' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'canadian-digital-service', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
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
	wp_enqueue_style( 'canadian-digital-service-style', get_template_directory_uri(). "/public/dist/css/styles.css" );
}
add_action( 'wp_enqueue_scripts', 'canadian_digital_service_scripts' );

function get_image_directory($image) {
	return get_template_directory_uri()."/public/img/".$image;
}

function get_favicon($icon) {
	return get_template_directory_uri()."/public/".$icon;
}

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

add_filter( 'ninja_forms_field_template_file_paths', 'my_custom_file_path' );
function my_custom_file_path( $paths ){

  $paths[] = dir( __FILE__ );
  
  return $paths;
}

add_filter( 'ninja_forms_field_template_file_paths', 'custom_field_file_path' );
function custom_field_file_path( $paths ){

	$paths[] =  get_template_directory() . '/ninja-forms/templates/';
	
	return $paths;
}