import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import "./CustomFileInput.css"; // Import the custom styles
import SoftButton from "components/SoftButton";

function CustomFileInput({ onFilesChange, oldFiles = [] }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [existingFiles, setExistingFiles] = useState([]);

  const [filePreviews, setFilePreviews] = useState([]);


  useEffect(() => {
    if (oldFiles.length && JSON.stringify(oldFiles) !== JSON.stringify(existingFiles)) {
      setExistingFiles(oldFiles);
    }
  }, [oldFiles, existingFiles]);


  useEffect(() => {
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(newPreviews);

    // Clean up blob URLs to avoid memory leaks
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  
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
      updatedOldFiles.splice(index, 1); // Remove the old file at the index
      setExistingFiles(updatedOldFiles); // Update the state for old files
      onFilesChange({ existingFiles: updatedOldFiles, updatedSelectedFiles: selectedFiles }); // Pass the selectedFiles as updatedSelectedFiles
    } else {
      const updatedFiles = [...selectedFiles];
      updatedFiles.splice(index, 1); // Remove the new file at the index
      setSelectedFiles(updatedFiles); // Update the state for selected files
      onFilesChange({ existingFiles, updatedSelectedFiles: updatedFiles }); // Pass updatedFiles as updatedSelectedFiles
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
              <SoftButton  variant="gradient"  color="info">

                            
                upload  more 

              </SoftButton>
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

          {filePreviews.map((filePreview, index) => (
            <div
              key={index}
              className="file-preview-wrapper"
              onClick={(e) => e.stopPropagation()} // Prevents file input click
            >
              <img
                src={filePreview}
                alt={`preview ${index}`}
                className="file-preview-image"
              />
              <button
                type="button"
                className="remove-file-button"
                
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index, false, e); // Pass event `e`
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