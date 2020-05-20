<?php
/**
 * Canadian Digital Service functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Canadian_Digital_Service
 */

$inc = get_template_directory()."/inc/";
require_once($inc."forms.php");

if ( ! function_exists( 'canadian_digital_service_setup' ) ) :
	function canadian_digital_service_setup() {
		load_theme_textdomain( 'canadian-digital-service', get_template_directory() . '/languages' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'disable-custom-colors' );
		add_theme_support('disable-custom-gradients');
    	add_theme_support('editor-gradient-presets', array());

		add_theme_support( 'editor-color-palette', array(
			array(
				'name'  => __( 'Blue', 'canadian-digital-service' ),
				'slug'  => 'blue',
				'color'	=> '#26374A',
			),
			array(
				'name'  => __( 'White', 'canadian-digital-service' ),
				'slug'  => 'white',
				'color'	=> '#FFF',
			),
			array(
				'name'  => __( 'Red', 'canadian-digital-service' ),
				'slug'  => 'red',
				'color'	=> '#b10e1e',
			),
			array(
				'name'  => __( 'Green', 'canadian-digital-service' ),
				'slug'  => 'green',
				'color' => '#00703C',
			),
		) );

		register_nav_menus( array(
			'primary' => esc_html__( 'Primary', 'canadian-digital-service' ),
			'footer' => esc_html__( 'Footer', 'canadian-digital-service' ),
		) );

	}
endif;

add_action( 'after_setup_theme', 'canadian_digital_service_setup' );

/**
 * Enqueue scripts and styles.
 */

function canadian_digital_service_scripts() {
	wp_enqueue_script( 'cds-js', get_template_directory_uri() . '/public/js/main.js', array("jquery"), '1.0.0', true );
	wp_register_style('cds-style', get_template_directory_uri(). "/public/dist/main.css" );
	wp_register_style('theme-style', get_template_directory_uri(). "/public/css/theme.css" );
	wp_enqueue_style('cds-style');
	wp_enqueue_style('theme-style');
}

add_action( 'wp_enqueue_scripts', 'canadian_digital_service_scripts' );

/**
 * Path utils
 */

function get_image_directory($image) {
	return get_template_directory_uri()."/public/img/".$image;
}

function get_favicon($icon) {
	return get_template_directory_uri()."/public/".$icon;
}

/**
 * Gutenburg cleanup
 */

function remove_block_style() {
    // Register the block editor script.
    wp_register_script( 'editor-js', get_stylesheet_directory_uri() . "/public/js/editor.js", [ 'wp-blocks', 'wp-edit-post' ] );
    // register block editor script.
    register_block_type( 'remove/block-style', [
        'editor_script' => 'editor-js',
    ] );
}

add_action( 'init', 'remove_block_style' );

// wp.blocks.getBlockTypes()

add_filter( 'allowed_block_types', 'cds_allowed_block_types' );
 
function cds_allowed_block_types( $allowed_blocks ) {
 
	return array(
		'core/image',
		'core/paragraph',
		'core/heading',
		'core/list',
		'core/html',
		'core/code',
		'core/buttons',
		'gravityforms/form',
		'cds/callout-block',
		'cds/start-page'
	);
}



/**
 * Multi-site
 */
/*
add_filter( 'allow_subdirectory_install',
    create_function( '', 'return true;' )
);
*/

	function show_lang($lang){

		if(strtolower($lang) == "french"){
			return "Français";
		}

		return "English";
	}

	function icl_post_languages(){
		if ( function_exists('icl_get_languages' ) ) {
		
			$languages = icl_get_languages('skip_missing=1');
			if(1 < count($languages)){
				foreach($languages as $l){
					if(!$l['active']) $langs[] = '<a href="'.$l['url'].'">'.show_lang($l['translated_name']).'</a>';
			}
			echo join(', ', $langs);
		}
	}

}
