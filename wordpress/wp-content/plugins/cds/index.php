<?php
/*
Plugin Name: Canadian Digital Service
Text Domain: canadian-digital-service
*/

require __DIR__ . '/vendor/autoload.php';

/*
$notifyClient = new \Alphagov\Notifications\Client([
	'baseUrl' => "https://api.notification.alpha.canada.ca",
	'apiKey' => '',
    'httpClient' => new \Http\Adapter\Guzzle6\Client
]);

try {
    $response = $notifyClient->sendEmail(
        'to-email-here',
        'template-id-here', [
            'name' => '',
            'dob'  => ''
        ],
        'unique_ref123'
        );

} catch (NotifyException $e){}
*/


function cds_block_register_block() {

	// Register JavaScript File build/index.js
	wp_register_script(
		'cds-block-js',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	// Register editor style src/editor.css
	wp_register_style(
		'cds-block-editor-style',
		plugins_url( 'src/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' )
	);

	// Register front end block style src/style.css
	wp_register_style(
		'cds-block-frontend-style',
		plugins_url( 'src/style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' )
	);

	// Register your block
	register_block_type( 'cds/callout-block', array(
		'editor_script' => 'cds-block-js',
		'editor_style' => 'cds-block-editor-style',
		'style' => 'cds-block-frontend-style',
	) );

}

add_action( 'init', 'cds_block_register_block' );