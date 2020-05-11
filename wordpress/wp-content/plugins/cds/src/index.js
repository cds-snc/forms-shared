// src/index.js
const { registerBlockType } = wp.blocks;


const {
  element: {
      useState,
  },
} = wp;

registerBlockType("cds/callout-block", {
  title: "CDS callout",
  icon: "megaphone",
  category: "layout",
  edit: ({ className }) => (
    <div className={className}>
      This application is only a demonstration of the Shared Forms project
    </div>
  ),
  save: () => (
    <div className="border-l-4 border-solid border-blue-400 bg-blue-200 p-5 mb-10">
      <div className="text-xl mb-0 pb-0">This application is only a demonstration of the Shared Forms project</div>
    </div>
  ),
});
