import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftDropzoneRoot from "components/SoftDropzone/SoftDropzoneRoot";

function SoftDropzone({ options, onFilesUpload }) {
  const dropzoneRef = useRef();

  useEffect(() => {
    Dropzone.autoDiscover = false;

    const dropzone = new Dropzone(dropzoneRef.current, {
      url: '/file-upload', // Temporary URL
      autoProcessQueue: false, // Prevent automatic upload
      ...options,
      init: function() {
  const { t } = useTranslation();

        this.on("addedfile", function(file) {
          onFilesUpload([...this.files]); // Pass files as array
        });
      }
    });

    return () => {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach((dz) => dz.destroy());
    };
  }, [options, onFilesUpload]);

  return (
    <SoftDropzoneRoot
      component="div"
      ref={dropzoneRef}
      className="form-control dropzone"
    >
      <SoftBox className="fallback">
        <SoftBox component="input" name="file" type="file" multiple />
      </SoftBox>
    </SoftDropzoneRoot>
  );
}

SoftDropzone.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  onFilesUpload: PropTypes.func.isRequired,
};

export default SoftDropzone;
