import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, Tooltip, IconButton, Avatar, Menu, MenuItem, Container } from "@mui/material";
import GarageIcon from '@mui/icons-material/Garage';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';


const pages = ["View Insights", "Manage Lot Managers", "Manage Drivers", "Manage Admins"];
const settings = ["Logout"];
// const notifications = ["penality here 5$"];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNo, setAnchorElNo] = useState(null);
  const [notifications, setNotifications] = useState(null);

  const handleOpenNoMenu = (event) => setAnchorElNo(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNoMenu = () => setAnchorElNo(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    // Clear user authentication data (e.g., remove tokens from localStorage)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirect to registeration page
    navigate("/");
  };

  const getPagePath = (page) => `/system-admin-home-page/${page.toLowerCase().replace(" ", "-")}`;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333333'/*585858*/ }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GarageIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 45 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JustPark
          </Typography>

          {/* pages Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: "auto" }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  my: 2,
                  backgroundColor: location.pathname === getPagePath(page) ? "#585858" : "#333333",
                  color: "white",
                  '&:hover': {
                    backgroundColor: location.pathname === getPagePath(page) ? "#585858" : "#333333",
                  },
                }}
                onClick={() => navigate(getPagePath(page))}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Notifications */}
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                color="inherit"
                onClick={handleOpenNoMenu}
              >
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElNo}
              open={Boolean(anchorElNo)}
              onClose={handleCloseNoMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={notifications} onClick={handleCloseNoMenu}>
                  <Typography>{notifications}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* User Avatar */}
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="User Avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}>
                  <Typography>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
