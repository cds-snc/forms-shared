import icon from "./icon";
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType("cds/callout-block", {
  title: "CDS callout",
  category: "layout",
  icon: {
    background: "rgba(254, 243, 224, 0.52)",
    src: icon,
  },
  keywords: [],
  attributes: {
    text: {
      type: "html",
    },
  },
  edit: (props) => {
    const {
      attributes: { text },
      className,
      setAttributes,
      isSelected,
    } = props;

    const style = `banner ${className}`;

    return (
      <div className={`${style}`}>
        <Fragment>
          <RichText
            value={text}
            placeholder={__("Call-out text", "canadian-digital-service")}
            onChange={(text) => setAttributes({ text })}
          />
        </Fragment>
      </div>
    );
  },
  save: (props) => {
    const {
      attributes: { text },
      className,
    } = props;

    const style = `banner ${className}`;

    return (
      <div className={`${style}`}>
        <RichText.Content value={text} tagName="p" />
      </div>
    );
  },
});
