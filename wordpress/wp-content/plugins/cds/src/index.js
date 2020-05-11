// src/index.js
/**
 * Block dependencies
 */
import icon from "./icon";

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { URLInput } = wp.editor;
const { IconButton, Tooltip, TextControl } = wp.components;

import { ColorPalette } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const MyColorPalette = withState( {
  color: '#f00',
} )( ( { color, setState } ) => {
  const colors = [
      { name: 'red', color: '#f00' },
      { name: 'blue', color: '#00f' },
  ];

  return (
      <ColorPalette
          colors={ colors }
          value={ color }
          onChange={ ( color ) => setState( { color } ) }
      />
  )
} );

registerBlockType("cds/callout-block", {
  title: "CDS callout",
  icon: "megaphone",
  category: "layout",
  icon: {
    background: "rgba(254, 243, 224, 0.52)",
    src: icon,
  },
  keywords: [
    __("Link", "jsforwpblocks"),
    __("Post", "jsforwpblocks"),
    __("Search", "jsforwpblocks"),
  ],
  attributes: {
    text: {
      type: "string",
      source: "text",
      selector: "a",
    },
    color: {
      type: "string",
      source: "attribute",
      attribute: "button",
      selector: "value",
    },
  },
  edit: (props) => {
    const {
      attributes: { text },
      setAttributes,
    } = props;
    return (
      <div>
          <Fragment>
            <TextControl
              id="example-input-field"
              label={__("Call-out text", "cds")}
              value={text}
              onChange={(text) => setAttributes({ text })}
            />
            {/*
            <MyColorPalette 
              value={color}
              onChange={(color) => setAttributes({ color })}
            />

            */ }

          </Fragment>
        
      </div>
    );
  },
  save: (props) => {
    const {
      attributes: { text},
    } = props;

    return (
      <p>
        {text}
      </p>
    );
  },
});
