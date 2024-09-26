/* eslint-disable react/prop-types */

import { forwardRef } from 'react';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SoftTypography from "components/SoftTypography";


import  Iconify  from 'components/iconify';

export const Incrementer = forwardRef(
  ({ name, quantity, onIncrease, onDecrease, disabledDecrease, sx, ...other }, ref) => (

    <Stack direction="row" spacing={5} sx={{  py: 5, px: 2 }}>

            <SoftTypography  component="label" variant="caption"  textTransform="capitalize">
                {name}:
            </SoftTypography>


            <Stack spacing={1}>
                        


                        <Stack
                        ref={ref}
                        flexShrink={0}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            p: 0.8,
                            width: 110,
                            borderRadius: 1,
                            
                            border: (theme) => `solid 1px gray`,
                            ...sx,
                        }}
                        {...other}
                        >
                        <IconButton
                            size="small"
                            onClick={() => onDecrease(name)}
                            disabled={disabledDecrease}
                            sx={{ borderRadius: 0.75 }}
                        >
                            <Iconify icon="eva:minus-fill" width={16} />
                        </IconButton>

                        {quantity}

                        <IconButton
                            size="small"
                            onClick={() => onIncrease(name)}
                            
                            sx={{ borderRadius: 0.75 }}
                        >
                            <Iconify icon="mingcute:add-line" width={16} />
                        </IconButton>
                        </Stack>



            </Stack>




  </Stack>



  )
);
