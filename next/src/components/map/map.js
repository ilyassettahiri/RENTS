import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import axios from 'axios'; // Moved axios import before './styles'
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import Typography from '@mui/material/Typography';
import Image from 'src/components/image';

import { GOOGLE_MAP_API } from 'src/config-global';
import ListingItem from 'src/sections/components/listings/list/listing-item';
import { mapStyle } from './styles';

// ----------------------------------------------------------------------

export default function Map({ offices, sx, ...other }) {
  const [tooltip, setTooltip] = useState(null);
  const [centerMap, setCenterMap] = useState({ lat: 0, lng: 0 }); // Initial state with default values

  useEffect(() => {
    // Function to get lat/lng from address using Google Maps Geocoding API
    const getLatLng = async (address) => {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: GOOGLE_MAP_API,
        },
      });

      if (response.data.status === 'OK') {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCenterMap({ lat, lng });
      } else {
        console.error('Geocoding failed:', response.data.status);
      }
    };

    // Construct full address from offices attributes
    const fullAddress = `${offices.attributes.address}, ${offices.attributes.city}, ${offices.attributes.zip}, ${offices.attributes.country}`;
    console.log('Full Address:', fullAddress);

    getLatLng(fullAddress);
  }, [offices]);

  const handleOpen = useCallback(
    (lat, lng, office) => {
      setCenterMap({ lat, lng });
      setTooltip(office);
    },
    []
  );

  return (
    <Box sx={{ height: 600, overflow: 'hidden', ...sx }} {...other}>
      <LoadScript googleMapsApiKey={GOOGLE_MAP_API}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={centerMap}
          zoom={12}
          options={{
            styles: mapStyle,
            zoomControl: true, // Enable zoom controls
            disableDefaultUI: false, // Enable default UI controls (includes zoom control)
          }}
        >
          <Marker
            position={centerMap}
            onClick={() => handleOpen(centerMap.lat, centerMap.lng, offices)}
          />

          {tooltip && (
            <InfoWindow
              position={centerMap}
              onCloseClick={() => setTooltip(null)}
            >
              <MapPopup offices={tooltip} />
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}

Map.propTypes = {
  offices: PropTypes.object.isRequired, // Assuming offices is now a single object
  sx: PropTypes.object,
};

function MapPopup({ offices, onClose }) {
  const handleClose = useCallback(
    (event) => {
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  return (





        <Paper
        sx={{
          width: 220,
          overflow: 'hidden',
          borderRadius: 1.5,

          position: 'relative',
        }}
        >


        {offices && <Image alt="photo" src={`${process.env.NEXT_PUBLIC_IMAGE_LISTING_SMALL}${offices.attributes.picture}`}  ratio="4/3" />}

        <Stack
          spacing={1}
          sx={{
            pt: 1,
            wordBreak: 'break-all',
            ...(!offices.attributes.picture && {


            }),
          }}
        >



          {offices.attributes.address && (
            <Stack direction="row" alignItems="flex-start" sx={{ typography: 'caption' }}>
              <Iconify icon="carbon:location" width={22} sx={{ mr: 0.5 }} />
              {offices.attributes.address} {offices.attributes.city} {offices.attributes.country} {offices.attributes.zip}


            </Stack>
          )}

          {offices.attributes.phone && (
            <Stack direction="row" alignItems="flex-start" sx={{ typography: 'caption' }}>
              <Iconify icon="carbon:phone" width={18} sx={{ mr: 0.5 }} />
              {offices.attributes.phone}
            </Stack>
          )}
        </Stack>
        </Paper>


  );
}

MapPopup.propTypes = {
  offices: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
