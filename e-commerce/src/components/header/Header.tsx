import { selectIsAuth } from '@/store/auth/authSelectors';
import { useAppSelector } from '@/store/redux';
import { AppBar, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '@public/logo/logo.svg';
import Search from '../filters/search/Search';
import BasketButton from './buttons/BasketButton';
import LogoutButton from './buttons/LogoutButton';
import LoginButton from './buttons/LoginButton';
import AppLink from '../common/TextLink';

function Header() {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 'none',
        bgcolor: 'transparent',
        paddingInline: 0,
        paddingTop: 6,
        paddingBottom: 3,
      }}
    >
      <Container maxWidth="xl" sx={{ minHeight: 80, paddingInline: { xs: 4, md: 6 } }}>
        <Stack
          direction="row"
          height="100%"
          alignItems="center"
          flexWrap="wrap"
          gap={{ xs: 6, md: 10 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            flexGrow={{ xs: 1, md: 0 }}
            order={{ xs: 1, md: 1 }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={Logo} alt="Logo" style={{ height: 42 }} />
            </Link>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width={{ xs: '100%', md: 'inherit' }}
            gap={6}
            order={{ xs: 3, md: 2 }}
          >
            <AppLink to="/">Home</AppLink>
            <AppLink to="/catalog">Catalog</AppLink>
            <AppLink to="#" disabled={true}>
              About
            </AppLink>
          </Stack>

          <Stack direction="row" alignItems="center" flexGrow={1} order={{ xs: 4, md: 3 }}>
            <Search />
          </Stack>

          <Stack direction="row" alignItems="center" gap={4} order={{ xs: 2, md: 4 }}>
            <BasketButton />
            {isAuth ? <LogoutButton /> : <LoginButton />}
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
}

export default Header;
