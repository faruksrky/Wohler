import React from 'react';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { CustomerQuickEditForm } from './customer-quick-edit-form';

// ----------------------------------------------------------------------

function calculateWidth(text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '16px Arial'; // Bu değeri uygulamanızın font boyutuna ve tipine göre ayarlayın
  return context.measureText(text).width;
}

export function CustomerTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  userNames,
  fetchData,
  operationPerformedList,
}) {
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const invoiceView = useBoolean(); // Fatura görüntüleme durumu
  const popover = usePopover();

  const handleDoubleClick = () => {
    quickEdit.onTrue(); // Çift tıklama ile düzenleme modunu aç
  };

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id.toString()} checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.customerFirstName) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.customerFirstName}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.customerLastName) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.customerLastName}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.phoneNumber) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.phoneNumber}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.emailAddress) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.emailAddress}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.address) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.address}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.productName) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.productName}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.faultDescription) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.faultDescription}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.faultDate) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.faultDate}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.servicePersonnel) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.servicePersonnel}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.operationPerformed) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.operationPerformed}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.warrantyStatus) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.warrantyStatus}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.cargoStatus) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.cargoStatus}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.serviceCompletionStatus) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.serviceCompletionStatus}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.operationDate) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.operationDate}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.deliveryDate) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.deliveryDate}
        </TableCell>
        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.invoiceUrl) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          <Tooltip title="Faturayı Görüntüle" placement="top" arrow>
            <IconButton onClick={invoiceView.onTrue}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>

        <TableCell
          onDoubleClick={quickEdit.onTrue}
          style={{ width: calculateWidth(row.notes) }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {row.notes}
        </TableCell>
      </TableRow>

      {/* Düzenleme Formu */}
      <CustomerQuickEditForm
        currentCustomer={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        userNamesFromQuick={userNames}
        operationPerformedList={operationPerformedList}
        fetchData={fetchData}
      />

      {/* Fatura Görüntüleme Modal */}
      <Dialog open={invoiceView.value} onClose={invoiceView.onFalse} maxWidth="md" fullWidth>
        <DialogTitle>Fatura Görüntüleme</DialogTitle>
        <DialogContent>
          {row.invoiceUrl ? (
            <img src={row.invoiceUrl} alt="Fatura" style={{ width: '100%', maxHeight: '400px' }} />
          ) : (
            <p>Fatura bulunamadı.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={invoiceView.onFalse}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
