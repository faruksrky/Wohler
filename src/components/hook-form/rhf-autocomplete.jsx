import React, { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const RHFAutocomplete = forwardRef(({ name, label, variant, helperText, placeholder, ...other }, ref) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          ref={ref}
          id={`rhf-autocomplete-${name}`}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              variant={variant}
              error={!!error}
              helperText={error ? error.message : helperText}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // Disable autocomplete
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
});
