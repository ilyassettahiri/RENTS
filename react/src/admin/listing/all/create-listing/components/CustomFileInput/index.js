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
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85.04 85.04" style={{ width: '50px', height: '50px' }}>
              <defs>
                <style>
                  {`
                    .cls-1 { fill: #dbdbdb; }
                    .cls-2 { fill: #4e4c4c; }
                  `}
                </style>
              </defs>
              <path className="cls-1" d="M67.21,85H17.83A17.83,17.83,0,0,1,0,67.21V17.83A17.83,17.83,0,0,1,17.83,0H67.21A17.83,17.83,0,0,1,85,17.83V67.21A17.83,17.83,0,0,1,67.21,85Z" />
              <path className="cls-2" d="M42.52,60.06c-3.29,0-6.59,0-9.88,0a7.58,7.58,0,0,1-7.3-5.43,7.29,7.29,0,0,1-.33-2c0-2.29,0-4.58,0-6.87a1.63,1.63,0,0,1,1.44-1.63,1.6,1.6,0,0,1,1.71,1.2,2.15,2.15,0,0,1,.05.51v6.46a4.42,4.42,0,0,0,3.5,4.45,4.28,4.28,0,0,0,1.07.12H52.27a4.47,4.47,0,0,0,4.58-4.57V45.79a1.6,1.6,0,0,1,1.6-1.69,1.63,1.63,0,0,1,1.6,1.67c0,2.25,0,4.5,0,6.75A7.62,7.62,0,0,1,53.19,60c-.37,0-.75,0-1.12,0Z" />
              <path className="cls-2" d="M44.12,30.57V50.15a2.8,2.8,0,0,1-.07.77,1.58,1.58,0,0,1-1.7,1.15A1.55,1.55,0,0,1,41,50.7a4,4,0,0,1,0-.6V30.49l-.37.34-6.3,6.31a1.63,1.63,0,0,1-1.57.56,1.61,1.61,0,0,1-.82-2.7l9.53-9.53a1.55,1.55,0,0,1,2.29,0L53.15,35a1.6,1.6,0,1,1-2.28,2.23L44.67,31c-.16-.16-.29-.33-.44-.5Z" />
            </svg>
            <span>Drag and drop some files here, or click to select files</span>
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
