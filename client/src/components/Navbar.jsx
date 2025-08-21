import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  Article as ArticleIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { logoutUser } from '../redux/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
    handleClose();
  };

  return (
    <AppBar position="sticky" elevation={1} sx={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
      <Toolbar className="container mx-auto">
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700,
            fontSize: '1.5rem',
          }}
        >
          JobSpring
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/jobs"
            startIcon={<WorkIcon />}
            sx={{ color: 'text.primary', textTransform: 'none' }}
          >
            Jobs
          </Button>
          <Button
            component={Link}
            to="/companies"
            startIcon={<BusinessIcon />}
            sx={{ color: 'text.primary', textTransform: 'none' }}
          >
            Companies
          </Button>
          <Button
            component={Link}
            to="/blogs"
            startIcon={<ArticleIcon />}
            sx={{ color: 'text.primary', textTransform: 'none' }}
          >
            Blogs
          </Button>

          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/dashboard"
                startIcon={<DashboardIcon />}
                sx={{ color: 'text.primary', textTransform: 'none' }}
              >
                Dashboard
              </Button>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{ textTransform: 'none' }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{ textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
