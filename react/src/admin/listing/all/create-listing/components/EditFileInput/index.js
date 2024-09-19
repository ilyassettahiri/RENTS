import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import "./CustomFileInput.css"; // Import the custom styles

function CustomFileInput({ onFilesChange, oldFiles = [] }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [existingFiles, setExistingFiles] = useState([]);

  useEffect(() => {
    if (oldFiles.length) {
      setExistingFiles(oldFiles);
    }
  }, [oldFiles]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedSelectedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedSelectedFiles);
    onFilesChange({ existingFiles, updatedSelectedFiles });
  };

  const handleRemoveFile = (index, isOldFile = false, event) => {

    event.stopPropagation(); 


    if (isOldFile) {
      const updatedOldFiles = [...existingFiles];
      updatedOldFiles.splice(index, 1);
      setExistingFiles(updatedOldFiles);
      onFilesChange({ existingFiles: updatedOldFiles, selectedFiles });
    } else {
      const updatedFiles = [...selectedFiles];
      updatedFiles.splice(index, 1);
      setSelectedFiles(updatedFiles);
      onFilesChange({ existingFiles, selectedFiles: updatedFiles });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const updatedSelectedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedSelectedFiles);
    onFilesChange({ existingFiles, updatedSelectedFiles });
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <SoftBox className="file-input-container">
      {/* Old Files Section */}
      

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
        {!selectedFiles.length && (
          <SoftBox className="file-drop-text">
            <span>Drag and drop some files here, or click to select files</span>
          </SoftBox>
        )}
        <SoftBox className="file-preview-container">

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
                onClick={(e) => handleRemoveFile(index, true, e)} // Removing an old image
              >
                X
              </button>
            </div>
          ))}

          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="file-preview-wrapper"
              onClick={(e) => e.stopPropagation()} // Prevents file input click
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                className="file-preview-image"
              />
              <button
                type="button"
                className="remove-file-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
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

  oldFiles: PropTypes.arrayOf(PropTypes.string),

};

export default CustomFileInput;