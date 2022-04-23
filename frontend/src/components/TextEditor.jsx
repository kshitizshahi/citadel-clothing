import { Editor } from "@tinymce/tinymce-react";
import { forwardRef } from "react";

const TextEditor = forwardRef(({ ...props }, ref) => {
  return (
    <div>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE}
        onInit={(evt, editor) => (ref.current = editor)}
        value={props.value}
        onEditorChange={props.onChange}
        init={{
          min_height: 175,
          height: 210,
          menubar: false,
          placeholder: "Product description",
          max_height: 225,
          skin: "material-outline",
          icons: "small",
          statusbar: false,
          // skin: "oxide-dark",

          content_css: ["/tinyMce.css"],

          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          // content_style:
          // // "color {}"
          // "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
});

export default TextEditor;
