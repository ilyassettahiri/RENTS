import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SoftBox from "components/SoftBox";
import "./CustomFileInput.css"; // Import the custom styles

function CustomFileInput({ onFilesChange, oldFiles = [] }) {
  const [selectedFiles, setSelectedFiles] = useState([]); // New uploaded files
  const [existingFiles, setExistingFiles] = useState(oldFiles); // Old files (URLs)
  const fileInputRef = useRef(null);

  // Handle new file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    onFilesChange([...existingFiles, ...selectedFiles, ...files]); // Send both old and new files
  };

  // Handle removing files (either old or new)
  const handleRemoveFile = (index, isExisting) => {
    if (isExisting) {
      const updatedExistingFiles = [...existingFiles];
      updatedExistingFiles.splice(index, 1); // Remove the old file from the list
      setExistingFiles(updatedExistingFiles);
      onFilesChange([...updatedExistingFiles, ...selectedFiles]); // Send the updated list
    } else {
      const updatedNewFiles = [...selectedFiles];
      updatedNewFiles.splice(index, 1); // Remove the new file
      setSelectedFiles(updatedNewFiles);
      onFilesChange([...existingFiles, ...updatedNewFiles]); // Send the updated list
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    onFilesChange([...existingFiles, ...selectedFiles, ...files]); // Update on drop
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <SoftBox className="file-input-container">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        className="custom-file-input"
      />

      <SoftBox className="file-drop-area" onClick={handleClick} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {/* Old Files Section */}
        <SoftBox className="file-preview-container">
          <h3>Existing Files</h3>
          {existingFiles.map((file, index) => (
            <div key={`old-${index}`} className="file-preview-wrapper">
              <img
                
                src={`${process.env.REACT_APP_IMAGE_LISTING_LARGE}${file}`}
                alt={`Old file preview ${index}`}
                className="file-preview-image"
              />
              <button
                type="button"
                className="remove-file-button"
                onClick={() => handleRemoveFile(index, true)} // Removing an old image
              >
                X
              </button>
            </div>
          ))}
        </SoftBox>

        {/* New Files Section */}
        <SoftBox className="file-preview-container">
          <h3>New Files</h3>
          {selectedFiles.map((file, index) => (
            <div key={`new-${index}`} className="file-preview-wrapper">
              <img
                src={URL.createObjectURL(file)}
                alt={`New file preview ${index}`}
                className="file-preview-image"
              />
              <button
                type="button"
                className="remove-file-button"
                onClick={() => handleRemoveFile(index, false)} // Removing a new image
              >
                X
              </button>
            </div>
          ))}
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

CustomFileInput.propTypes = {
  onFilesChange: PropTypes.func.isRequired,
  oldFiles: PropTypes.arrayOf(PropTypes.string),
};

export default CustomFileInput;
