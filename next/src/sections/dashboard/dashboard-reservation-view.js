'use client';

import { useState, useEffect, useCallback,useMemo   } from 'react';
import CrudService from "src/services/cruds-service";
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { stableSort, getComparator } from '../components/dashboard/account/utils';
import EcommerceAccountOrdersTableRow from '../components/dashboard/account/dashboard-orders-table-row';
import EcommerceAccountOrdersTableHead from '../components/dashboard/account/dashboard-orders-table-head';
import EcommerceAccountOrdersTableToolbar from '../components/dashboard/account/dashboard-orders-table-toolbar';

const TABS = ['All', 'Completed', 'To Process', 'Cancelled'];

export const TABLE_HEAD = [
  { id: 'id', label: ' ID' },
  { id: 'title', label: 'Title' },
  { id: 'price', label: 'Price' },
  { id: 'reservationstart', label: ' Start' },
  { id: 'reservationsend', label: ' End' },
  { id: 'created_at', label: 'Created at' },
  { id: '' },
];

export default function DashboardReservationPage({ params }) {

  const { id } = params;

  const [tab, setTab] = useState('All');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);



    // Fetch data using useQuery
    const { data: rawOrdersData, isLoading: isOrdersLoading, error: ordersError } = useQuery({
      queryKey: ['orders'],
      queryFn: () => CrudService.getReservations(),
      onError: (error) => {
        console.error('Failed to fetch listing:', error);
      },
    });

    // Memorize and format the data using useMemo
    const ordersData = useMemo(() => {
      if (!rawOrdersData) return []; // Return an empty array if no data

      // Format the data
      return rawOrdersData.data.map((item) => ({
        id: item.id,
        title: item.attributes.title,
        price: item.attributes.price,
        reservationstart: item.attributes.reservationstart,
        reservationsend: item.attributes.reservationsend,
        created_at: item.attributes.created_at,
      }));
    }, [rawOrdersData]);

  const handleChangeTab = useCallback((event, newValue) => {
    setTab(newValue);
  }, []);

  const handleSort = useCallback(
    (id) => {
      const isAsc = orderBy === id && ordersData === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [ordersData, orderBy]
  );

  const handleSelectAllRows = useCallback((event) => {
    if (event.target.checked) {
      const newSelected = ordersData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, [ordersData]);

  const handleSelectRow = useCallback(
    (id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleChangeDense = useCallback((event) => {
    setDense(event.target.checked);
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ordersData.length) : 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Reservations
      </Typography>

      <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {TABS.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 5, mb: 3 }}>
        <TextField
          fullWidth
          hiddenLabel
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="carbon:search" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems="center">
          <DatePicker label="Start Date" sx={{ width: 1, minWidth: 180 }} />
          <DatePicker label="End Date" sx={{ width: 1, minWidth: 180 }} />
        </Stack>
      </Stack>

      <TableContainer
        sx={{
          overflow: 'unset',
          [`& .${tableCellClasses.head}`]: {
            color: 'text.primary',
          },
          [`& .${tableCellClasses.root}`]: {
            bgcolor: 'background.default',
            borderBottomColor: (theme) => theme.palette.divider,
          },
        }}
      >
        <EcommerceAccountOrdersTableToolbar
          rowCount={ordersData.length}
          numSelected={selected.length}
          onSelectAllRows={handleSelectAllRows}
        />

        <Scrollbar>
          <Table
            sx={{
              minWidth: 720,
            }}
            size={dense ? 'small' : 'medium'}
          >
            <EcommerceAccountOrdersTableHead
              order={order}
              orderBy={orderBy}
              onSort={handleSort}
              headCells={TABLE_HEAD}
              rowCount={ordersData.length}
              numSelected={selected.length}
              onSelectAllRows={handleSelectAllRows}
            />

            <TableBody>
              {stableSort(ordersData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <EcommerceAccountOrdersTableRow
                    key={row.id}
                    row={row}
                    selected={selected.includes(row.id)}
                    onSelectRow={() => handleSelectRow(row.id)}
                  />
                ))}

              {emptyRows > 0 && (
                <TableRow
                  sx={{
                    height: (dense ? 36 : 57) * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          page={page}
          component="div"
          count={ordersData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: 'absolute',
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}


DashboardReservationPage.propTypes = {
  params: PropTypes.shape({

    id: PropTypes.number.isRequired,
  }).isRequired,
};
