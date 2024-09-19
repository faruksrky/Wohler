import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { signInWithPassword } from '../../context/jwt';

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  username: zod
    .string()
    .min(1, { message: 'Email bilgisi gereklidir!' })
    .email({ message: 'Geçerli bir Email adresi girilmelidir!' }),
  password: zod
    .string()
    .min(1, { message: 'Şifre bilgisi gereklidir!' })
    .min(6, { message: 'Şifre 6 karakterden oluşmalıdır!' }),
});


// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const defaultValues = {
    username: 'sinan@gmail.com',
    password: '123456',
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ username: data.username, password: data.password });
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text name="username" label="Email" InputLabelProps={{ shrink: true }} />
      <Box gap={1.5} display="flex" flexDirection="column">
        {/* 
        <Link
          component={RouterLink}
          href={paths.auth.jwt.updatePassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          Şifremi unuttum
        </Link>
        */}
        <Field.Text
          name="password"
          label="Şifre"
          placeholder="6+ characters"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Giriş Yapılıyor..."
      >
        Giriş
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Kullanıcı Girişi"
      /*
        description={
          <>
            {`Henüz hesabınız yok mu? `}
            <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
               Şimdi Kaydolun
            </Link>
          </>
          
        }
      */
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />
    
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
    
  );
}