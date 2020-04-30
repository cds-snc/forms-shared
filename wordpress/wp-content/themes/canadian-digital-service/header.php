<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <!-- Required meta tags-->
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<?php $canadian_digital_service_description = get_bloginfo( 'description', 'display' ); ?>
		<meta name="description" content="<?php echo $canadian_digital_service_description; ?>">
        <link rel="shortcut icon" href="<?php echo get_favicon("favicon.png") ?>" type="image/x-icon" sizes="32x32">
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
        <link href="https://fonts.googleapis.com/css?family=Lato:700|Noto+Sans:400,700&amp;display=fallback" rel="stylesheet">
		<?php wp_head(); ?>
		<title><?php bloginfo( 'name' ); ?></title>	
    </head>
    <body>
        <a class="skip-link" href="#content"><?php esc_html_e( 'Skip to content', 'canadian-digital-service' ); ?></a>
        <div class="outer-container">
        <header>
        <!-- phase banner start -->
        <div class="phase-banner">
            <div>
                <span>ALPHA</span><span>Forms</span>
            </div>
        </div>
        <!-- phase banner end -->
        
        <div class="page--container">
            <!-- FIP start -->
            <div class="fip-container">
                <!-- gov canada -->
                <div class="canada-flag">
                    <a href="<?php echo home_url("/"); ?>" aria-label="{{__('Government of Canada')}}">
                        <img src="<?php echo get_image_directory("sig-blk-en.svg") ?>" alt="{{__('Government of Canada')}}">
                    </a>
                </div>
                <!-- end gov canada -->
                
                <!-- lang -->
                <div class="language-link"> 
                    <a href="#" lang="fr">Français</a>
                </div>
                <!-- end lang -->
            </div>
            <!-- FIP end -->
        </div>

        </header>
        <main id="content">