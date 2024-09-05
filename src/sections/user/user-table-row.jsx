import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';


// ----------------------------------------------------------------------

export function UserTableRow({ row, selected, onSelectRow }) {
  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.email}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.customerFirstName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.customerLastName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phoneNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.emailAddress}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.address}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.productName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.model}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.serialNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.purchaseDate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.faultDescription}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.faultDate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.preliminaryDiagnosis}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.servicePersonnel}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.operationDate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.performedOperations}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.replacedParts}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.warrantyStatus}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.paymentStatus}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.serviceCompletionStatus}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.deliveryDate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.notes}</TableCell>

      </TableRow>

{/*
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        {/*
        <MenuList>
          
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
        
          </MenuItem>
        </MenuList>
          
      </CustomPopover>
      */}
    </>
  );
}
