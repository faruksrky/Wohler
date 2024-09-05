import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { varAlpha } from 'src/theme/styles';
import { _roles, USER_STATUS_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { UserTableRow } from '../user/user-table-row';
import { UserTableToolbar } from '../user/user-table-toolbar';
import { UserTableFiltersResult } from '../user/user-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 90 },
  { id: 'customerFirstName', label: 'First Name', width: 150 },
  { id: 'customerLastName', label: 'Last Name', width: 150 },
  { id: 'phoneNumber', label: 'Phone Number', width: 150 },
  { id: 'emailAddress', label: 'Email Address', width: 200 },
  { id: 'address', label: 'Address', width: 250 },
  { id: 'productName', label: 'Product Name', width: 150 },
  { id: 'model', label: 'Model', width: 120 },
  { id: 'serialNumber', label: 'Serial Number', width: 150 },
  { id: 'purchaseDate', label: 'Purchase Date', width: 150 },
  { id: 'faultDescription', label: 'Fault Description', width: 250 },
  { id: 'faultDate', label: 'Fault Date', width: 150 },
  { id: 'preliminaryDiagnosis', label: 'Preliminary Diagnosis', width: 250 },
  { id: 'servicePersonnel', label: 'Service Personnel', width: 150 },
  { id: 'operationDate', label: 'Operation Date', width: 150 },
  { id: 'performedOperations', label: 'Performed Operations', width: 250 },
  { id: 'replacedParts', label: 'Replaced Parts', width: 250 },
  { id: 'warrantyStatus', label: 'Warranty Status', width: 150 },
  { id: 'paymentStatus', label: 'Payment Status', width: 150 },
  { id: 'serviceCompletionStatus', label: 'Service Completion Status', width: 250 },
  { id: 'deliveryDate', label: 'Delivery Date', width: 150 },
  { id: 'notes', label: 'Notes', width: 300 },
];

// ----------------------------------------------------------------------

export function CustomerServiceListView() {
  const table = useTable();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/service-requests');
        setTableData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching data', error);
        setTableData([]);
      }
    };

    fetchData();
  }, []);

  const filters = useSetState({
    customerFirstName: '',
    customerLastName: '',
    role: [],
    status: 'all',
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.customerFirstName ||
    !!filters.state.customerLastName ||
    filters.state.role.length > 0 ||
    filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  return (
    <>
      <DashboardContent maxWidth="xl">
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}
        >
          <CustomBreadcrumbs
            heading="Müşteri Teknik Servis Bilgileri"
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: 'Teknik Servis Listesi' },
            ]}
            sx={{ mb: { xs: 3, md: 5 } }}
          />

          <Card sx={{ width: '100%', overflowX: 'auto' }}>
            <Tabs
              value={filters.state.status}
              onChange={handleFilterStatus}
              sx={{
                px: 2.5,
                boxShadow: (theme) =>
                  `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
              }}
            >
              {STATUS_OPTIONS.map((tab) => (
                <Tab
                  key={tab.value}
                  iconPosition="end"
                  value={tab.value}
                  label={tab.label}
                  icon={
                    <Label
                      variant={
                        ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                        'soft'
                      }
                      color={
                        (tab.value === 'active' && 'success') ||
                        (tab.value === 'pending' && 'warning') ||
                        (tab.value === 'banned' && 'error') ||
                        'default'
                      }
                    >
                      {['active', 'pending', 'banned', 'rejected'].includes(tab.value)
                        ? tableData.filter((user) => user.status === tab.value).length
                        : tableData.length}
                    </Label>
                  }
                />
              ))}
            </Tabs>

            <UserTableToolbar
              filters={filters}
              onResetPage={table.onResetPage}
              options={{ roles: _roles }}
            />

            {canReset && (
              <UserTableFiltersResult
                filters={filters}
                totalResults={dataFiltered.length}
                onResetPage={table.onResetPage}
                sx={{ p: 2.5, pt: 0 }}
              />
            )}

            <Box sx={{ position: 'relative' }}>
              <TableSelectedAction
                dense={table.dense}
                numSelected={table.selected.length}
                rowCount={dataFiltered.length}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
              />

              <Box
                sx={{
                  position: 'relative',
                  height: '500px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '100%', // Box genişliği %100 olarak ayarlandı
                  overflowX: 'auto', // Yatay kaydırma çubuğu ekler
                }}
              >
                <Scrollbar>
                  <Table
                    size={table.dense ? 'small' : 'medium'}
                    sx={{ minWidth: 1500, width: '100%' }}
                  >
                    <TableHeadCustom
                      order={table.order}
                      orderBy={table.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={dataFiltered.length}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          dataFiltered.map((row) => row.id)
                        )
                      }
                    />

                    <TableBody>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <UserTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                          />
                        ))}

                      <TableEmptyRows
                        height={table.dense ? 56 : 56 + 20}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                      />

                      <TableNoData notFound={notFound} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </Box>
            </Box>

            <TablePaginationCustom
              page={table.page}
              dense={table.dense}
              count={dataFiltered.length}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onChangeDense={table.onChangeDense}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          </Card>
        </Box>
      </DashboardContent>

      <ConfirmDialog open={confirm.value} onClose={confirm.onFalse} />
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { customerFirstName, customerLastName, status, role } = filters;

  // inputData'nın bir dizi olup olmadığını kontrol edin
  if (!Array.isArray(inputData)) {
    console.error('inputData is not an array:', inputData);
    return [];
  }

  console.log('Before filtering:', inputData);

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (customerFirstName) {
    inputData = inputData.filter((user) =>
      user.customerFirstName.toLowerCase().includes(customerFirstName.toLowerCase())
    );
  }

  if (customerLastName) {
    inputData = inputData.filter((user) =>
      user.customerLastName.toLowerCase().includes(customerLastName.toLowerCase())
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
