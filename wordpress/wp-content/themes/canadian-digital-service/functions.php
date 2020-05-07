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
	wp_enqueue_script( 'cds-js', get_template_directory_uri() . '/public/js/main.js', array(), '1.0.0', true );
	wp_register_style('cds-style', get_template_directory_uri(). "/public/dist/main.css" );
	wp_enqueue_style('cds-style');
}

add_action( 'wp_enqueue_scripts', 'canadian_digital_service_scripts' );

function get_image_directory($image) {
	return get_template_directory_uri()."/public/img/".$image;
}

function get_favicon($icon) {
	return get_template_directory_uri()."/public/".$icon;
}


function remove_block_style() {
    // Register the block editor script.
    wp_register_script( 'editor-js', get_stylesheet_directory_uri() . "/public/js/editor.js", [ 'wp-blocks', 'wp-edit-post' ] );
    // register block editor script.
    register_block_type( 'remove/block-style', [
        'editor_script' => 'editor-js',
    ] );
}
add_action( 'init', 'remove_block_style' );

//
if( !is_admin() ){
	add_filter( 'gform_field_container', 'my_field_container', 10, 6 );
	function my_field_container( $field_container, $field, $form, $css_class, $style, $field_content ) {
		$class = "form-group";
		if ($field->failed_validation) {
			$class.=" form-group-error";
		}

		return sprintf('<div class="%s">{FIELD_CONTENT}</div>', $class);
	}
}

//
if( !is_admin() ){
	
	add_filter(
		'gform_field_content', function ( $content, $field, $value, $lead_id, $form_id ) {
			// Add .form-control to most inputs.
			$exclude_formcontrol = array(
				'hidden',
				'post_image',
				'email',
				'fileupload',
				'list',
				'multiselect',
				'select',
				'html',
				'address',
				'post_category',
			);

			$class = "";

			if ( ! in_array( $field['type'], $exclude_formcontrol, true ) ) {
				
				// do something
				// echo "=== ".$field['type'] ."===";

				if ( $field->failed_validation ) {
					$class.="form-control-error ";
				}
				
			}

			// Select.
			if ( 'select' === $field['type'] || 'multiselect' === $field['type'] ) {
				$dom = new domDocument();
				$dom->loadHTML( '<?xml encoding="utf-8" ?>'. $content );
				$xpath = new DomXPath($dom);
				$el = $xpath->query('//div[contains(@class, "ginput_container_select")]')->item(0);
				$select = $el->firstChild;
				$select->setAttribute("class", "input lg:w-3/6");
				$label = $el->previousSibling;
				$label->setAttribute("class", "");
				$content = $dom->saveHTML($label).$dom->saveHTML($select);
			}

			// Text
			if ( 'text' === $field['type'] ) {

				$error = "";

				
				$class.="input w-full lg:w-3/6";

				$dom = new domDocument();
				$dom->loadHTML( '<?xml encoding="utf-8" ?>'.$content );
				$xpath = new DomXPath($dom);
				$label = $xpath->query('//label[contains(@class, "gfield_label")]' )->item(0);
				$el = $xpath->query('//div[contains(@class, "ginput_container_text")]')->item(0)->firstChild;
				$el->setAttribute("class", $class);
				$content = $error.$dom->saveHTML($label).$dom->saveHTML($el);
			}

			// Website
			if ( 'website' === $field['type']  ) {
				$dom = new domDocument();
				$dom->loadHTML( '<?xml encoding="utf-8" ?>'.$content );
				$xpath = new DomXPath($dom);
				$el = $xpath->query('//div[contains(@class, "ginput_container_website")]//input')->item(0);
				$label = $xpath->query('//label[contains(@class, "gfield_label")]' )->item(0);
				$class.="input w-full lg:w-3/6";
				$el->setAttribute("class", $class);
				$content = $dom->saveHTML($label).$dom->saveHTML($el);
			}

			// Phone
			if ( 'phone' === $field['type']  ) {
				$dom = new domDocument();
				$dom->loadHTML( '<?xml encoding="utf-8" ?>'.$content );
				$xpath = new DomXPath($dom);
				$el = $xpath->query('//div[contains(@class, "ginput_container_phone")]//input')->item(0);
				$label = $xpath->query('//label[contains(@class, "gfield_label")]' )->item(0);
				$class.="input w-full lg:w-3/6";
				$el->setAttribute("class", $class);
				$content = $dom->saveHTML($label).$dom->saveHTML($el);
			}

			// Number i.e. extension
			if ( 'number' === $field['type']  ) {
				$dom = new domDocument();
				$dom->loadHTML( '<?xml encoding="utf-8" ?>'.$content );
				$xpath = new DomXPath($dom);
				$el = $xpath->query('//div[contains(@class, "ginput_container_number")]//input')->item(0);
				$label = $xpath->query('//label[contains(@class, "gfield_label")]' )->item(0);
				$class.="input w-full lg:w-3/6";
				$el->setAttribute("class", $class);
				$content = $dom->saveHTML($label).$dom->saveHTML($el);
			}

			// Phone
			if ( 'email' === $field['type']  ) {
				$dom = new domDocument();
				$dom->loadHTML( '<?xml encoding="utf-8" ?>'.$content );
				$xpath = new DomXPath($dom);
				$el = $xpath->query('//div[contains(@class, "ginput_container_email")]//input')->item(0);
				$label = $xpath->query('//label[contains(@class, "gfield_label")]' )->item(0);
				$class.="input w-full lg:w-3/6";
				$el->setAttribute("class", $class);
				$content = $dom->saveHTML($label).$dom->saveHTML($el);
			}

			// Textarea.
			if ( 'textarea' === $field['type']) {
				$dom = new domDocument();
				$dom->loadHTML( '<?xml encoding="utf-8" ?>'.$content );
				$xpath = new DomXPath($dom);
				$label = $xpath->query('//label[contains(@class, "gfield_label")]' )->item(0);
				$el = $xpath->query('//div[contains(@class, "ginput_container_textarea")]')->item(0)->firstChild;
				$class.="input focus:shadow-outline w-full lg:w-3/6";
				$el->setAttribute("class", $class);
				$content = $dom->saveHTML($label).$dom->saveHTML($el);
			}
			
			// Checkbox.
			if ( 'checkbox' === $field['type'] ) {	
				$dom = new domDocument();
				$dom->loadHTML( '<?xml encoding="utf-8" ?>'.$content);
				$xpath = new DomXPath($dom);
				$checkboxes = $xpath->query('//ul[contains(@class, "gfield_checkbox")]//li//input[@type="checkbox"]');
				$checkboxes_out = "";
				$label= $xpath->query('//label', $checkboxes->item(0));
				$checkboxes_out = "<label>".$label->item(0)->nodeValue."</label>";

				foreach ($checkboxes as $checkboxItem) {
					$checkboxes_out.= "<div>";
					$checkboxes_out.= "<label class='inline-flex items-center'>";
					$label = $checkboxItem->nextSibling->nodeValue;
					$checkboxItem->setAttribute("class", "text-blue form-checkbox h-6 w-6");
					$checkboxes_out.=$dom->saveHTML($checkboxItem);
					$checkboxes_out.="<span class='ml-3 text-lg'>".$label."</span>";
					$checkboxes_out.= "</label>";
					$checkboxes_out.= "</div>";
				}
				
				$content = $checkboxes_out;
				
			}
			
			// Radio.
			if ( 'radio' === $field['type'] ) {
				$dom = new domDocument();
				$dom->loadHTML( '<?xml encoding="utf-8" ?>'.$content);
				$xpath = new DomXPath($dom);
				$radios = $xpath->query('//ul[contains(@class, "gfield_radio")]//li' );
				$radio_out = "";
				$label= $xpath->query('//label', $radios->item(0));
				$radio_out = "<label>".$label->item(0)->nodeValue."</label>";

				foreach ($radios as $radioItem) {
					$radio_out.= "<div>";
					$radio_out.= "<label class='inline-flex items-center'>";
					$label = $radioItem->lastChild;
					$radio = $radioItem->firstChild;
					$radio->setAttribute("class", "text-blue form-radio h-6 w-6");
					$radio_out.=$dom->saveHTML($radio);
					$radio_out.="<span class='ml-3 text-lg'>".$label->nodeValue."</span>";
					$radio_out.= "</label>";
					$radio_out.= "</div>";
				}

				$content = $radio_out;
			}


			// Date
			if ( 'date' === $field['type'] ) {
				$content = str_replace(
					'<input', 
					'<input class="input focus:shadow-outline w-full lg:w-3/6"', 	
					$content
				  );
				
			}

			return $content;
		}, 10, 5
	);
};

//

add_filter( 'gform_validation_message', function ( $message, $form ) {
	
	
	if ( gf_upgrade()->get_submissions_block() ) {
        return $message;
	}
	
	/*
	<div class="border-l-4 border-solid border-red bg-red-100 p-5 mb-10" role="alert">
		<h3>Please correct the errors on the page</h3>
			<ol class="list-decimal list-inside ml-2 py-3" id="formErrors">
				<li><a href="#email">Email is required</a></li>
				<li><a href="#notify_type">Please select a notification type.</a></li>
			</ol>
		</div>
	*/
 
	$message = "<div class='border-l-4 border-solid border-red bg-red-100 p-5 mb-10' role='alert'><h3>Please correct the errors on the page</h3>";
    $message .= "<ol class='list-decimal list-inside ml-2 py-3' id='formErrors'>";
 
    foreach ( $form['fields'] as $field ) {
        if ( $field->failed_validation ) {
			$field_id =   'input_' . $form["id"] . "_".$field["id"];
            $message .= sprintf( '<li><a href="#%s">%s - %s</a></li>',$field_id,  GFCommon::get_label( $field ), $field->validation_message );
        }
    }
 
    $message .= '</ol></div>';
 
    return $message;
}, 10, 2 );
//