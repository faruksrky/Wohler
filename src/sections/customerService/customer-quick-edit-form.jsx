import axios from 'axios';
import dayjs from 'dayjs';
import { z as zod } from 'zod';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import MuiAlert from '@mui/lab/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import { Alert, Snackbar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'; // Import the 'AdapterDateFns' module

import { LocalizationProvider } from 'src/locales';
import {
  CARGO_STATUS_OPTIONS,
  WARRANTY_STATUS_OPTIONS,
  SERVICE_COMPLETION_STATUS_OPTIONS,
} from 'src/_mock/_user';

import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { CONFIG } from '../../config-global';

// ----------------------------------------------------------------------

export const CustomerQuickEditSchema = zod.object({
  customerFirstName: zod.string().min(1, { message: 'İsim zorunludur!' }),
  customerLastName: zod.string().min(1, { message: 'Soyisim zorunludur!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  emailAddress: zod.string().email({ message: 'Geçerli bir e-posta girin!' }),
  address: zod.string().min(1, { message: 'Adres zorunludur!' }),
  productName: zod.string().min(1, { message: 'Ürün adı zorunludur!' }),
  faultDescription: zod.string().optional(),
  faultDate: zod.string().optional(),
  servicePersonnel: zod.string().optional(),
  serviceCompletionStatus: zod.string().optional(),
  operationPerformed: zod.string().optional(),
  warrantyStatus: zod.string().optional(),
  cargoStatus: zod.string().optional(),
  operationDate: zod.string().optional(),
  deliveryDate: zod.string().optional(),
  notes: zod.string().optional(),
});

// ----------------------------------------------------------------------

export function CustomerQuickEditForm({
  currentCustomer,
  open,
  onClose,
  fetchData,
  userNamesFromQuick,
  operationPerformedList,
}) {
  const defaultValues = useMemo(
    () => ({
      id: currentCustomer?.id || '',
      customerFirstName: currentCustomer?.customerFirstName || '',
      customerLastName: currentCustomer?.customerLastName || '',
      phoneNumber: currentCustomer?.phoneNumber ? `+90${currentCustomer?.phoneNumber}` : '',
      emailAddress: currentCustomer?.emailAddress || '',
      address: currentCustomer?.address || '',
      productName: currentCustomer?.productName || '',
      faultDescription: currentCustomer?.faultDescription || '',
      faultDate: currentCustomer?.faultDate || '',
      servicePersonnel: currentCustomer?.servicePersonnel || '',
      serviceCompletionStatus: currentCustomer?.serviceCompletionStatus || '',
      operationPerformed: currentCustomer?.operationPerformed || '',
      operationDate: currentCustomer?.operationDate || '',
      warrantyStatus: currentCustomer?.warrantyStatus || '',
      cargoStatus: currentCustomer?.cargoStatus || '',
      deliveryDate: currentCustomer?.deliveryDate || '',
      notes: currentCustomer?.notes || '',
    }),
    [currentCustomer]
  );

  const methods = useForm({
    resolver: zodResolver(CustomerQuickEditSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const {
    reset,
    control,
    formState: { isSubmitting },
    watch,
  } = methods;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const servicePersonnelValue = watch('servicePersonnel');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const onSubmit = (data) => {
    const readOnlyFields = [
      'customerLastName',
      'customerFirstName',
      'phoneNumber',
      'emailAddress',
      'address',
      'productName',
      'faultDescription',
      'faultDate',
    ];

    const updatedData = Object.keys(data)
      .filter((key) => !readOnlyFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    // Add readOnly fields from currentCustomer to updatedData
    readOnlyFields.forEach((field) => {
      if (currentCustomer[field]) {
        updatedData[field] = currentCustomer[field];
      }
    });
    const url = `${CONFIG.customerUpdateUrl}${currentCustomer.id}`;

    axios
      .put(url, updatedData)
      .then((response) => {
        setMessage('Güncelleme işlemi başarılı!');
        setSeverity('success');
        setOpenSnackbar(true);
        fetchData();
        onClose();
      })
      .catch((error) => {
        console.error('Güncelleme işleminde hata oluştu:', error);
        setMessage('Güncelleme işleminde hata oluştu!');
        setSeverity('error');
        setOpenSnackbar(true);
      });
  };

  return (
 

    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Müşteri Teknik Servis Bilgilerini Güncelle</DialogTitle>

        <DialogContent>
  <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
    Bilgileri girdikten sonra güncelle butonuna basınız
  </Alert>

  <Box
    rowGap={3}
    columnGap={2}
    display="grid"
    gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
  >
    <Field.Text name="customerFirstName" label="Ad" readOnly />
    <Field.Text name="customerLastName" label="Soyad" readOnly />
    <Field.Phone name="phoneNumber" label="Telefon" readOnly />
    <Field.Text name="emailAddress" label="E-posta" readOnly />
    <Field.Text
  name="address"
  label="Adres"
  readOnly
  multiline
  rows={1}
  fullWidth
  sx={{ gridColumn: 'span 2' }}
/>

    <Field.Text name="productName" label="Ürün Adı" readOnly />
    <Field.DatePicker name="faultDate" label="Arıza Tarihi" readOnly />
    <Field.Text
  name="faultDescription"
  label="Arıza Tanımı"
  readOnly
  multiline
  rows={1}
  fullWidth
  sx={{ gridColumn: 'span 2' }}
/>
    
    <Field.Select
      name="servicePersonnel"
      label="Servis Personeli"
      value={userNamesFromQuick.includes(servicePersonnelValue) ? servicePersonnelValue : ''}
    >
      {userNamesFromQuick.map((userName) => (
        <MenuItem key={userName} value={userName}>
          {userName}
        </MenuItem>
      ))}
    </Field.Select>

    <Field.Select name="serviceCompletionStatus" label="Servis Durumu">
      {SERVICE_COMPLETION_STATUS_OPTIONS.map((serviceCompletionStatus) => (
        <MenuItem key={serviceCompletionStatus.value} value={serviceCompletionStatus.value}>
          {serviceCompletionStatus.label}
        </MenuItem>
      ))}
    </Field.Select>

    <Controller
  name="operationPerformed"
  control={control}
  defaultValue={defaultValues.operationPerformed || ''} // Varsayılan değer string
  render={({ field }) => (
    <Field.Autocomplete
      {...field}
      label="Yapılan İşlem"
      sx={{ gridColumn: 'span 2' }}
      fullWidth
      disableCloseOnSelect
      options={Array.isArray(operationPerformedList) ? operationPerformedList : []}
      value={field.value || ''} // Değer string olarak tutuluyor
      getOptionLabel={(option) => (typeof option === 'string' ? option : '')}
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      freeSolo
      onInputChange={(event, value) => {
        // Kullanıcı manuel bir şey yazarsa
        field.onChange(value);
      }}
      onChange={(event, value) => {
        if (typeof value === 'string') {
          // Manuel yazılan değeri al
          field.onChange(value);
        } else if (value && typeof value === 'object') {
          // Listeden seçilen değeri al
          field.onChange(value.label || value);
        } else {
          // Hiçbir değer yoksa boş string olarak ayarla
          field.onChange('');
        }
      }}
    />
  )}
/>





    <Field.Select name="warrantyStatus" label="Garanti Durumu">
      {WARRANTY_STATUS_OPTIONS.map((warrantyStatus) => (
        <MenuItem key={warrantyStatus.value} value={warrantyStatus.value}>
          {warrantyStatus.label}
        </MenuItem>
      ))}
    </Field.Select>
    <Field.Select name="cargoStatus" label="Kargo Durumu">
      {CARGO_STATUS_OPTIONS.map((cargoStatus) => (
        <MenuItem key={cargoStatus.value} value={cargoStatus.value}>
          {cargoStatus.label}
        </MenuItem>
      ))}
    </Field.Select>
  
    <Field.DatePicker name="operationDate" label="İşlem Tarihi"/>
    <Field.DatePicker name="deliveryDate" label="Teslim Tarihi"/>
  </Box>

  {/* Notlar Alanı */}
  <Box mt={3}>
    <Field.Text
      name="notes"
      label="Notlar"
      multiline
      rows={2} // İki satır uzunluğunda
      fullWidth
    />
  </Box>
</DialogContent>


        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            İptal
          </Button>

          <LoadingButton type="submit" variant="contained" tabIndex={-1}>
            Güncelle
          </LoadingButton>
        </DialogActions>
      </Form>
      <Snackbar open={open} autoHideDuration={6000}>
        <MuiAlert severity={severity} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </Dialog>
    </LocalizationProvider>
  );
}
