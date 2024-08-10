import { Node } from '@tiptap/core';

const CustomImage = Node.create({
  name: 'image',
  
  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {},
    };
  },

  group: 'block',

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      align: {
        default: 'center', // Default alignment
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { align, ...rest } = HTMLAttributes;
    return [
      'img',
      { ...rest, class: `align-${align}` }, // Ensure `align-${align}` class is defined in CSS
    ];
  },
});

export default CustomImage;
