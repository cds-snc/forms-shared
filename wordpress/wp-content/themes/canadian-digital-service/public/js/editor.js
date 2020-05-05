wp.domReady(() => {
    wp.blocks.unregisterBlockStyle( 'core/quote', 'default' );
	wp.blocks.unregisterBlockStyle( 'core/quote', 'large' );

	wp.blocks.unregisterBlockStyle( 'core/button', 'default' );
	wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );
    wp.blocks.unregisterBlockStyle( 'core/button', 'outline' );
    
    wp.blocks.registerBlockStyle( 'core/button', {
        name: 'custom-button-style',
        label: 'My Button Style'
    });
});