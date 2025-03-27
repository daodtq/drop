/**
=========================================================
* EGEAD Fulfilment POD - v2.2.0
=========================================================

* Product Page: https://www.egeadcompany.com/product/material-dashboard-react
* Copyright 2023 Dev Egead Company (https://www.egeadcompany.com)

Coded by www.egeadcompany.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// EGEAD Fulfilment POD components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// EGEAD Fulfilment POD example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { styled } from '@mui/material/styles';
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// EGEAD Fulfilment POD context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import MDTypography from "components/MDTypography";
import { useDispatch, useSelector } from "react-redux";
import { updateStartDate, updateEndDate } from "features/slices";
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import { setSearch } from "features/slices";
import { updateSearch } from "features/slices";
import { getOrders } from "features/slices";
import moment from "moment";
import { getDesign, updateStore } from "features/slices";
import { updateUTC } from "features/slices";

const CustomTextField = styled(TextField)(({ theme, search }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: search ? 'red' : '', // Màu border khi có search
    },
    '&:hover fieldset': {
      borderColor: search ? 'red' : '', // Màu border khi hover
    },
    '&.Mui-focused fieldset': {
      borderColor: search ? 'red' : '', // Màu border khi focus
    },
  },
}));

function DashboardNavbar({ absolute, light, isMini }) {
  const dispatch2 = useDispatch();
  const startDate = useSelector((state) => state.user.startDate);
  const endDate = useSelector((state) => state.user.endDate);
  const search = useSelector((state) => state.user.search);
  const currentPage = useSelector((state) => state.user.currentPage) || 1;
  const utc = useSelector((state) => state.user.utc);
  const filterStore = useSelector((state) => state.user.filterStore);
  const order_status = useSelector((state) => state.user.order_status);
  const store = useSelector((state) => state.user.store);
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const handleSwitchChange = async (event) => {
    const isChecked = event.target.checked;
    await dispatch2(updateUTC(isChecked))

  };
  const handleChange = async (event) => {
    await dispatch2(updateStore(event.target.value))
    await dispatch2(getOrders({
      store: event.target.value,
      startDate: moment(startDate).startOf("day").format("x"),
      endDate: moment(endDate).endOf("day").format("x"), currentPage: 1, search
    }));
  };
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleCloseMenu = () => setOpenMenu(false);
  const location = useLocation();
  const handleChangeDate = (type, value) => {
    if (type == "startDate") {
      dispatch2(updateStartDate(value));
    } else {
      dispatch2(updateEndDate(value));
    }
  };
  const handleSetSearch = (value) => {
    dispatch2(updateSearch(value));

  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (location.pathname == "/library") {
        dispatch2(getDesign({
          search
        }));
      } else {
        dispatch2(getOrders({
          store: filterStore, order_status,
          utc: utc,
          startDate: moment(startDate).startOf("day").format("x"),
          endDate: moment(endDate).endOf("day").format("x"), currentPage: 1, search
        }));
      }
    }
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)} >
        <MDBox
          sx={(theme) => navbarRow(theme, { isMini })}
          mb={{ xs: 1, md: 0 }}
        >
          <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </MDBox>

          <div className="form-group">
            <MDTypography variant="h6" style={{ marginRight: 5 }}>From </MDTypography>
            <DatePicker
              placeholderText="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
              id="start-date"
              autoComplete="off"
              selected={startDate}
              className="custom-datepicker"
              onChange={(e) => handleChangeDate("startDate", e)}
            />
          </div>
          <div className="form-group">
            <MDTypography variant="h6" style={{ marginRight: 5, marginLeft: 5 }}>To </MDTypography>
            <DatePicker
              placeholderText="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
              id="start-date"
              autoComplete="off"
              selected={endDate}
              className="custom-datepicker"
              onChange={(e) => handleChangeDate("endDate", e)}
            />
          </div>

        </MDBox>
        <FormControlLabel
          sx={{ display: 'flex', alignItems: 'center', flexDirection: "row", margin: 0.5 }}
          control={<Switch checked={utc} onChange={handleSwitchChange} />}
          label="UTC"
        />
        <MDBox sx={{ display: "flex", flexDirection: "row", width: "70%", alignItems: "center" }}>
          <FormControl fullWidth sx={{ margin: 1, width: "20%" }}>
            <InputLabel>Store</InputLabel>
            <Select
              search={filterStore}
              value={filterStore}
              onChange={handleChange}
              label="Store"
              sx={{ background: "white", height: 37 }}
            >
              <MenuItem value="All Store">All Store</MenuItem>
              {store.map(([store, isActive]) => (
                <MenuItem key={store} value={store}>
                  {store}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <CustomTextField
            className='inputText'
            style={{ width: "100%", background: "white" }}
            placeholder="Search"
            value={search}
            onChange={(e) => handleSetSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            search={search} // Truyền giá trị search vào
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <Link to="/authentication/log-out">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>login</Icon>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}

      </Toolbar>
    </AppBar >
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
