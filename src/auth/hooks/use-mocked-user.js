import { _mock } from 'src/_mock';

// To get the user from the <AuthContext/>, you can use

// Change:
// import { useMockedUser } from 'src/auth/hooks';
// const { user } = useMockedUser();

// To:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();


// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    displayName: sessionStorage.getItem('decoded_token') ? JSON.parse(sessionStorage.getItem('decoded_token')).name : '',
    email: sessionStorage.getItem('decoded_token') ? JSON.parse(sessionStorage.getItem('decoded_token')).email : '',
    photoURL: _mock.image.avatar(24),
    isPublic: true,
  };

  return { user };
}
