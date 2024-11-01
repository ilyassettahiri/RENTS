
import ReactQuill from "react-quill";


import "react-quill/dist/quill.snow.css";

import MDEditorRoot from "components/MDEditor/MDEditorRoot";


import { useSoftUIController } from "context";

function MDEditor(props) {
  const [controller] = useSoftUIController();
  const { darkMode } = controller;

  const toolbarOptions = [
    [{ header: [3, 4, 5, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];

  


  return (
    <MDEditorRoot ownerState={{ darkMode }}>
      <ReactQuill theme="snow" placeholder="Write something..."  {...props} 
      
      modules={{ toolbar: toolbarOptions }}
      />
    </MDEditorRoot>
  );
}

export default MDEditor;
