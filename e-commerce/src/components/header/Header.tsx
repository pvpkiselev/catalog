import { selectIsAuth } from '@/store/auth/auth-selectors';
import { AppBar, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '@public/logo/logo.svg';
import BasketButton from './buttons/basket-button';
import LogoutButton from './buttons/logout-button';
import LoginButton from './buttons/login-button';
import AppLink from '../common/text-link';
import { useAppSelector } from '@/store/store';
import SearchButton from '../search/search-button';

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
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={{ xs: 6, md: 10 }}
        >
          <Stack direction="row" alignItems="center">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={Logo} alt="Logo" style={{ height: 42 }} />
            </Link>
          </Stack>

          <Stack direction="row" alignItems="center" gap={6}>
            <AppLink to="/">Home</AppLink>
            <AppLink to="/catalog">Catalog</AppLink>
            <AppLink to="#" disabled={true}>
              About
            </AppLink>
          </Stack>

          <Stack direction="row" alignItems="center" gap={4}>
            <SearchButton />
            <BasketButton />
            {isAuth ? <LogoutButton /> : <LoginButton />}
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
}

export default Header;
