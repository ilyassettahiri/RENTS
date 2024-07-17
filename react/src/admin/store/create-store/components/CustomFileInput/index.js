import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SoftBox from "components/SoftBox";
import "./CustomFileInput.css"; // Import the custom styles

function CustomFileInput({ onFilesChange }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    onFilesChange([...selectedFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    onFilesChange([...selectedFiles, ...files]);
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
        {!selectedFiles.length && (
          <SoftBox className="file-drop-text">
            Drag and drop some files here, or click to select files
          </SoftBox>
        )}
        <SoftBox className="file-preview-container">
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
};

export default CustomFileInput;
