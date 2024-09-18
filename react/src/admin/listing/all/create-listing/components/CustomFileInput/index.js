import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SoftBox from "components/SoftBox";
import "./CustomFileInput.css"; // Import the custom styles

function CustomFileInput({ onFilesChange, oldFiles = [] }) {
  const [selectedFiles, setSelectedFiles] = useState([]);  // New files
  const [existingFiles, setExistingFiles] = useState([]);  // Old files
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (oldFiles.length) {
      setExistingFiles(oldFiles);  // Initialize with old images
    }
  }, [oldFiles]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    onFilesChange([...existingFiles, ...selectedFiles, ...files]);  // Combine old and new files
  };

  const handleRemoveFile = (index, isExisting = false) => {
    if (isExisting) {
      const updatedExistingFiles = [...existingFiles];
      updatedExistingFiles.splice(index, 1);
      setExistingFiles(updatedExistingFiles);
      onFilesChange([...updatedExistingFiles, ...selectedFiles]);
    } else {
      const updatedFiles = [...selectedFiles];
      updatedFiles.splice(index, 1);
      setSelectedFiles(updatedFiles);
      onFilesChange([...existingFiles, ...updatedFiles]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    onFilesChange([...existingFiles, ...selectedFiles, ...files]);
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
      <SoftBox
        className="file-drop-area"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {!existingFiles.length && !selectedFiles.length && (
          <SoftBox className="file-drop-text">
            {/* Your SVG and text */}
          </SoftBox>
        )}
        
        <SoftBox className="file-preview-container">
          {/* Display old (existing) files */}
          {existingFiles.map((file, index) => (
            <div
              key={`existing-${index}`}
              className="file-preview-wrapper"
              onClick={(e) => e.stopPropagation()}  // Prevents file input click
            >
              <img
                src={`${process.env.REACT_APP_IMAGE_LISTING_SMALL}${file}`}
                                  // Existing files have URLs
                alt={`existing preview ${index}`}
                className="file-preview-image"
              />
              <button
                type="button"
                className="remove-file-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index, true);  // Mark as existing
                }}
              >
                X
              </button>
            </div>
          ))}
          
          {/* Display newly uploaded files */}
          {selectedFiles.map((file, index) => (
            <div
              key={`new-${index}`}
              className="file-preview-wrapper"
              onClick={(e) => e.stopPropagation()}  // Prevents file input click
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`new preview ${index}`}
                className="file-preview-image"
              />
              <button
                type="button"
                className="remove-file-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index, false);  // Mark as new
                }}
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
  oldFiles: PropTypes.arrayOf(PropTypes.string),  // Expecting array of URLs for old images
};

export default CustomFileInput;
