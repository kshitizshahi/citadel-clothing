import { Icon } from "@iconify/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/dropZone.scss";

const DropZone = forwardRef(({ onImagesChange, showPreview }, ref) => {
  useImperativeHandle(ref, () => ({
    deleteImage(file, index) {
      let fileIndex;
      const filterImage = PreviewImagesList(dropFiles).filter((element, i) => {
        if (i === index) {
          fileIndex = i;
        }

        return i !== index;
      });

      onImagesChange(filterImage);

      const setDrag = () => {
        for (let i = 0; i < dropFiles.length; i++) {
          for (let j = 0; j < dropFiles[i].length; j++) {
            const elem = dropFiles[i][j];
            const name = elem.name;
            if (name === file.name && fileIndex === index) {
              fileIndex = null;
              dropFiles[i].splice(j, 1);
            }
          }
        }
        return dropFiles;
      };

      setDropFiles(setDrag());
    },
  }));
  const [dropFiles, setDropFiles] = useState([]);

  const deleteImage = (file, index) => {
    let fileIndex;
    const filterImage = PreviewImagesList(dropFiles).filter((element, i) => {
      if (i === index) {
        fileIndex = i;
      }

      return i !== index;
    });

    onImagesChange(filterImage);

    const setDrag = () => {
      for (let i = 0; i < dropFiles.length; i++) {
        for (let j = 0; j < dropFiles[i].length; j++) {
          const elem = dropFiles[i][j];
          const name = elem.name;
          if (name === file.name && fileIndex === index) {
            fileIndex = null;
            dropFiles[i].splice(j, 1);
          }
        }
      }
      return dropFiles;
    };

    setDropFiles(setDrag());
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop: (acceptedFiles) => {
      onImagesChange(PreviewImagesList([...dropFiles, acceptedFiles]));
      setDropFiles((prevArray) => [...prevArray, acceptedFiles]);
    },
  });

  const PreviewImagesList = (dropFiles) => {
    let finalImage = [];
    dropFiles.map((elem) => {
      elem.map((file) => finalImage.push(file));
    });

    return finalImage;
  };

  const previewImages = PreviewImagesList(dropFiles).map(
    (previewFile, index) => (
      <div key={index} className="preview-single-image">
        <img src={URL.createObjectURL(previewFile)} className="image-style" />

        <Icon
          icon="ci:close-big"
          className="preview-close"
          onClick={() => deleteImage(previewFile, index)}
        />
      </div>
    )
  );

  return (
    <div className="dropzone-container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="dropzone-uploader">
          <Icon icon="bi:cloud-upload" className="drop-file-icon" />
          <p className="drop-text">Drop or Select file</p>
        </div>
      </div>
      {showPreview && <div className="image-preview">{previewImages}</div>}
    </div>
  );
});

export default DropZone;
