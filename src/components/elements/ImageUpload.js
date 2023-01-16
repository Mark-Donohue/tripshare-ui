import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

function ImageUpload(props) {
  const [image, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const selectImageRef = useRef();

  useEffect(() => {
    if (!image) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(image);
  }, [image]);

  const selectImageHandler = () => {
    selectImageRef.current.click();
  };

  const previewImageHandler = (event) => {
    let image;
    let isImageValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      image = event.target.files[0];
      setImage(image);
      setIsValid(true);
      isImageValid = true;
    } else {
      setIsValid(false);
      isImageValid = false;
    }

    props.onInput(props.id, image, isImageValid);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={selectImageRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={(event) => previewImageHandler(event)}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please select an image.</p>}
        </div>
        <Button type="button" onClick={selectImageHandler}>
          SELECT IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default ImageUpload;
