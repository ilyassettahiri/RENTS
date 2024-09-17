import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import SoftBox from '@mui/material/Box'; 

const TableSkeleton = () => {
  return (
    <TableContainer sx={{ boxShadow: 'none' }}>
      {/* Search and filter skeletons */}
      <SoftBox p={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rectangular" height={40} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <SoftBox display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
              <Skeleton variant="rectangular" width={120} height={40} />
              <Skeleton variant="rectangular" width={120} height={40} />
              <Skeleton variant="rectangular" width={140} height={40} />
              <Skeleton variant="rectangular" width={90} height={40} />
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>

      {/* Table skeleton */}
      <Table>
        <TableHead>
          <TableRow>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" width="80%" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant="rectangular" height={30} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination skeleton */}
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <Skeleton variant="rectangular" width={100} height={30} />
        <Skeleton variant="rectangular" width={200} height={30} />
      </SoftBox>
    </TableContainer>
  );
};

export default TableSkeleton;
