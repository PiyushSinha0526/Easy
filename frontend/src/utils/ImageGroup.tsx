import { Node } from "@tiptap/core";

const ImageGroup = Node.create({
  name: "imageGroup",
  group: "block",
  content: "image{1,3}",
  parseHTML() {
    return [{ tag: "span.image-group" }];
  },
  renderHTML() {
    return ["span", { class: "image-group" }, 0];
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement("span");
      container.classList.add("image-group-container");

      node.content.forEach((child, index) => {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.display = "inline-block";
        wrapper.style.margin = "5px";

        const imageElement = document.createElement("img");
        imageElement.src = child.attrs.src;
        imageElement.style.cursor = "pointer";

        wrapper.appendChild(imageElement);

        const input = document.createElement("input");
        input.type = "text";
        input.value = child.attrs.src;
        input.style.position = "absolute";
        input.style.top = "0";
        input.style.left = "0";
        input.style.width = "100%";
        input.style.display = "none";

        imageElement.addEventListener("click", () => {
          input.style.display = "block";
          input.focus();
        });

        input.addEventListener("blur", () => {
          input.style.display = "none";
        });

        input.addEventListener("change", () => {
          const newUrls = node.content.map((c, idx) =>
            idx === index ? { ...c.attrs, src: input.value } : c.attrs.src,
          );

          editor.commands.updateAttributes("imageGroup", {
            ...node.attrs,
            content: newUrls,
          });

          imageElement.src = input.value;
        });

        wrapper.appendChild(input);
        container.appendChild(wrapper);
      });

      return {
        dom: container,
        contentDOM: container,
      };
    };
  },
  addCommands() {
    return {
      insertImageGroup: (urls) => {
        console.log(urls);
        const imageNodes = urls.urls.map((url) => ({
          type: "image",
          attrs: { src: url },
        }));

        return ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: imageNodes,
          });
        };
      },
      updateImageGroupUrls: (newUrls) => {
        return ({ tr, state, dispatch }) => {
          const { selection } = state;
          const node = selection.node;
          if (node && node.type.name === "imageGroup") {
            const newContent = newUrls.map((url) => ({
              type: "image",
              attrs: { src: url },
            }));
            const pos = selection.from;
            const newNode = node.type.create(node.attrs, newContent);
            tr.setNodeMarkup(pos, null, newNode.attrs, newNode.content);
            if (dispatch) dispatch(tr);
            return true;
          }
          return false;
        };
      },
    };
  },
});

export default ImageGroup;
