import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  Divider,
} from "@mui/material";
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  Article as ArticleIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import { logoutUser } from "../redux/slices/authSlice";

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
    navigate("/");
    handleClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "#000",
            fontWeight: 700,
            fontSize: "1.5rem",
            fontFamily:
              '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            "&:hover": {
              color: "#666",
            },
            transition: "color 0.2s ease",
          }}
        >
          JobSpring
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            component={Link}
            to="/jobs"
            startIcon={<WorkIcon sx={{ fontSize: 20 }} />}
            sx={{
              color: "#000",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1.5,
              borderRadius: 0,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000",
              },
            }}
          >
            Jobs
          </Button>
          <Button
            component={Link}
            to="/companies"
            startIcon={<BusinessIcon sx={{ fontSize: 20 }} />}
            sx={{
              color: "#000",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1.5,
              borderRadius: 0,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000",
              },
            }}
          >
            Companies
          </Button>
          <Button
            component={Link}
            to="/blogs"
            startIcon={<ArticleIcon sx={{ fontSize: 20 }} />}
            sx={{
              color: "#000",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1.5,
              borderRadius: 0,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000",
              },
            }}
          >
            Blog
          </Button>

          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/dashboard"
                startIcon={<DashboardIcon sx={{ fontSize: 20 }} />}
                sx={{
                  color: "#000",
                  textTransform: "none",
                  fontWeight: 500,
                  px: 3,
                  py: 1.5,
                  borderRadius: 0,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box sx={{ ml: 2 }}>
                <IconButton
                  size="large"
                  onClick={handleMenu}
                  sx={{
                    borderRadius: 0,
                    border: "1px solid #e0e0e0",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "#000",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "#000",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: 0,
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    mt: 1,
                    minWidth: 160,
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: "#000" }}
                  >
                    {user?.name || "User"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666" }}>
                    {user?.email || "user@example.com"}
                  </Typography>
                </Box>

                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleClose();
                  }}
                  sx={{ py: 1.5, fontSize: "0.95rem" }}
                >
                  <PersonIcon sx={{ mr: 2, fontSize: 20 }} />
                  My Profile
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/dashboard");
                    handleClose();
                  }}
                  sx={{ py: 1.5, fontSize: "0.95rem" }}
                >
                  <DashboardIcon sx={{ mr: 2, fontSize: 20 }} />
                  Dashboard
                </MenuItem>

                <Divider />

                <MenuItem
                  onClick={handleLogout}
                  sx={{ py: 1.5, fontSize: "0.95rem", color: "#000" }}
                >
                  <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2, ml: 2 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderColor: "#000",
                  color: "#000",
                  borderRadius: 0,
                  px: 4,
                  py: 1,
                  fontWeight: 500,
                  fontSize: "1rem",
                  "&:hover": {
                    borderColor: "#000",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: 0,
                  px: 4,
                  py: 1,
                  fontWeight: 500,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>

        {/* Mobile Menu - Simplified */}
        <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
          {isAuthenticated ? (
            <IconButton
              size="large"
              onClick={handleMenu}
              sx={{ borderRadius: 0 }}
            >
              <Avatar sx={{ width: 28, height: 28, bgcolor: "#000" }}>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
            </IconButton>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  borderColor: "#000",
                  color: "#000",
                  borderRadius: 0,
                  minWidth: "auto",
                  px: 2,
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#000",
                  borderRadius: 0,
                  minWidth: "auto",
                  px: 2,
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
