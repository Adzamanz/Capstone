
import React, { useState} from "react";

import "./ImageForm.css"

export default function ImageForm(props) {
  // Initialize state to hold the uploaded image and form data
  const {images, setImages} = props;
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newImages = {...images};
    if(newImages[name]){
        alert("you've already used that name!")
    }else{
        newImages[name] = image;
        name ? setImages(newImages) : alert("Please enter a name.")
        setName("");
        setImage()
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
        <div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={handleFileChange}
          />
        </div>
        <div>
            Image Name:
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div className="add_image" onClick={handleSubmit}>Add to Post</div>
      {/* </form> */}
    </div>
  );
}
