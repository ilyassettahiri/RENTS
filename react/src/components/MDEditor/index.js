import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MDEditorRoot from "components/MDEditor/MDEditorRoot";
import { useSoftUIController } from "context";

function MDEditor(props) {
  const [controller] = useSoftUIController();
  const { darkMode } = controller;
  const quillRef = useRef(null);

  const toolbarOptions = [
    [{ header: [3, 4, 5, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    const quill = quillRef.current.getEditor();

    // Listen for the paste event on the editor's root element
    quill.root.addEventListener("paste", (e) => {
      e.preventDefault();

      const clipboardData = e.clipboardData || window.clipboardData;
      const pastedHTML = clipboardData.getData("text/html") || clipboardData.getData("text/plain");

      // Create a temporary div to manipulate the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = pastedHTML;

      // Convert <h1> and <h2> to <h3>
      tempDiv.querySelectorAll("h1, h2").forEach((node) => {
        node.outerHTML = `<h3>${node.innerHTML}</h3>`;
      });

      // Remove <a> tags while keeping their inner text
      tempDiv.querySelectorAll("a").forEach((node) => {
        node.outerHTML = node.innerText;
      });

      // Convert the modified HTML back to Quill's Delta format and insert it
      const delta = quill.clipboard.convert(tempDiv.innerHTML);
      quill.updateContents(delta, "user");
    });
  }, []);

  return (
    <MDEditorRoot ownerState={{ darkMode }}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="Write something..."
        modules={modules}
        {...props}
      />
    </MDEditorRoot>
  );
}

export default MDEditor;
