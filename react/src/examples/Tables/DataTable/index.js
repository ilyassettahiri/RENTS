import { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import SoftSelect from "components/SoftSelect";
import Grid from "@mui/material/Grid";
import { useTranslation } from 'react-i18next';

import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftPagination from "components/SoftPagination";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const [filteredData, setFilteredData] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const { t } = useTranslation();


  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const tableInstance = useTable(
    { columns, data: filteredData, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  const [selectedColumn, setSelectedColumn] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = ({ value }) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <SoftPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </SoftPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // settings value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // settings the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // settings the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const applyFilter = () => {
    let newData = data;

    if (selectedColumn && selectedOperator && filterValue) {
      newData = data.filter((row) => {
        const rowValue = row[selectedColumn]?.toString().toLowerCase();
        const filterVal = filterValue.toLowerCase();

        switch (selectedOperator) {
          case "contains":
            return rowValue.includes(filterVal);
          case "equals":
            return rowValue === filterVal;
          case "startsWith":
            return rowValue.startsWith(filterVal);
          case "endsWith":
            return rowValue.endsWith(filterVal);
          default:
            return true;
        }
      });
    }

    setFilteredData(newData);
  };

  const resetFilter = () => {
    setFilteredData(data);
    setSelectedColumn("");
    setSelectedOperator("");
    setFilterValue("");
  };

  const toggleRowSelected = (rowId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  const deleteSelectedRows = () => {
    const newData = filteredData.filter((row) => !selectedRows.includes(row.id));
    setFilteredData(newData);
    setSelectedRows([]);
  };

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {canSearch ? (
        <SoftBox p={3}>
          <Grid container spacing={2} alignItems="center">
            {/* Search input on the left */}
            <Grid item xs={12} sm={4}>
              <SoftInput
                placeholder="Search..."
                value={search}
                icon={{ component: "search", direction: "left" }}
                onChange={({ currentTarget }) => {
                  setSearch(currentTarget.value);
                  onSearchChange(currentTarget.value);
                }}
              />
            </Grid>

            {/* Container for all other filter components on the right */}
            <Grid item xs={12} sm={8}>
              <SoftBox display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
                {/* Select Column */}
                <SoftSelect
                  value={selectedColumn ? { value: selectedColumn, label: selectedColumn } : null}
                  onChange={(option) => setSelectedColumn(option.value)}
                  options={columns.map((column) => ({ value: column.accessor, label: column.Header }))}
                  placeholder=" column"
                  sx={{ minWidth: 120 }} // Optional: set a minimum width for consistency
                />

                {/* Select Operator */}
                <SoftSelect
                  value={selectedOperator ? { value: selectedOperator, label: selectedOperator } : null}
                  onChange={(option) => setSelectedOperator(option.value)}
                  options={[
                    { value: "contains", label: "contains" },
                    { value: "equals", label: "equals" },
                    { value: "startsWith", label: "starts with" },
                    { value: "endsWith", label: "ends with" },
                  ]}
                  placeholder=" operator"
                  sx={{ minWidth: 120 }} // Optional: set a minimum width for consistency
                />

                {/* Input Value */}
                <SoftInput
                  placeholder=" value"
                  value={filterValue}
                  onChange={({ currentTarget }) => setFilterValue(currentTarget.value)}
                  sx={{ maxWidth: 140 }} // Optional: set a minimum width for consistency
                />

                {/* Apply Button */}
                <SoftButton onClick={applyFilter} sx={{ px: 3 , py: 2 }} variant="gradient" type="submit" color="info">
                  <SoftTypography color="white" variant="caption" fontWeight="medium">
                    {t('Apply')}
                  </SoftTypography>
                </SoftButton>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>

      ) : null}

      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={1}>
        {selectedRows.length > 0 && (
          <SoftButton onClick={deleteSelectedRows} color="error">
            Delete Selected ({selectedRows.length})
          </SoftButton>
        )}

        {selectedColumn && selectedOperator && filterValue && (
          <SoftBox display="flex" alignItems="center">
            <SoftTypography variant="body2" color="secondary">
              Filter Applied: {selectedColumn} {selectedOperator} {filterValue}
            </SoftTypography>
            <IconButton onClick={resetFilter} size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </SoftBox>
        )}
      </SoftBox>

      <Table {...getTableProps()}>
        <SoftBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, key) => (
                <DataTableHeadCell
                  key={key}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                >
                  
                  
                        <SoftBox display="flex" alignItems="center">
                                  {key === 0 && (
                                    <Checkbox 
                                      indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                                      checked={selectedRows.length === rows.length}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedRows(rows.map((row) => row.id));
                                        } else {
                                          setSelectedRows([]);
                                        }
                                      }}
                                    />
                                  )}
                          <SoftBox ml={2}>
                             {column.render("Header")}
                          </SoftBox>
                        </SoftBox>
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </SoftBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            const isSelected = selectedRows.includes(row.id);
            return (
              <TableRow
                key={key}
                {...row.getRowProps()}
                sx={{
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#f8d7da" : "inherit",
                  "&:hover": {
                    backgroundColor: isSelected ? "#f8d7da" : "#f5f5f5",
                  },
                }}
              >
                {row.cells.map((cell, cellKey) => (
                  <DataTableBodyCell
                    key={cellKey}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    {...cell.getCellProps()}
                  >
                        <SoftBox display="flex" alignItems="center">
                                {cellKey === 0 && (
                                  <Checkbox
                                    checked={isSelected}
                                    onChange={() => toggleRowSelected(row.id)}
                                  />
                                )}
                          <SoftBox ml={1}>
                             {cell.render("Cell")}
                          </SoftBox>
                        </SoftBox>


                    
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <SoftBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {entriesPerPage && (
          <SoftBox display="flex" alignItems="center">
            <SoftSelect
              defaultValue={{ value: defaultValue, label: defaultValue }}
              options={entries.map((entry) => ({ value: entry, label: entry }))}
              onChange={setEntriesPerPage}
            />
            <SoftTypography variant="caption" color="secondary">
              &nbsp;&nbsp; per page
            </SoftTypography>
          </SoftBox>
        )}

        {showTotalEntries && (
          <SoftBox mb={{ xs: 3, sm: 0 }}>
            <SoftTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} - {entriesEnd} of {rows.length}
            </SoftTypography>
          </SoftBox>
        )}
        {pageOptions.length > 1 && (
          <SoftPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <SoftPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </SoftPagination>
            )}
            {renderPagination.length > 6 ? (
              <SoftBox width="5rem" mx={1}>
                <SoftInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </SoftBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <SoftPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </SoftPagination>
            )}
          </SoftPagination>
        )}
      </SoftBox>
    </TableContainer>
  );
}

// settings default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;
