import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import GarageIcon from "@mui/icons-material/Garage";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


const pages = ["My Lot", "Profile"];
const settings = ["Logout"];
// const notifications = ["penality here 5$"];

function Header() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNo, setAnchorElNo] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const handleOpenNoMenu= (event) => setAnchorElNo(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNoMenu = () => setAnchorElNo(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

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
              cursor: "pointer"
            }}
          >
            JustPark
          </Typography>

          {/* pages Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: "auto" }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white" }}
                onClick={() =>
                  navigate(`/lot-manager-home-page/${page.toLowerCase()}`)
                }
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
