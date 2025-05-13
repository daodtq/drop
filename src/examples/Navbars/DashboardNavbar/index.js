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

import { useEffect, useState } from "react";
// react-router components
import { Link, useLocation, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @material-ui core components
import AddIcon from '@mui/icons-material/Add';
import AppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
// EGEAD Fulfilment POD components
import { FormControl } from '@mui/material';
import MDBox from "components/MDBox";
import "react-datepicker/dist/react-datepicker.css";
// EGEAD Fulfilment POD example components
import { FormControlLabel, Autocomplete, Radio, RadioGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import DatePicker from "react-datepicker";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarIconButton,
  navbarMobileMenu,
  navbarRow,
} from "examples/Navbars/DashboardNavbar/styles";

// EGEAD Fulfilment POD context
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import {
  setMiniSidenav,
  setOpenConfigurator,
  setTransparentNavbar,
  useMaterialUIController,
} from "context";
import { addProducts, getAds, getDashboard, getProducts, updateEndDate, updateStartDate, updateUpload } from "features/slices";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from 'xlsx';
import header from "./constants";
import cate from "./constants1";
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
  const name = useSelector((state) => state.drop.name);
  const products = useSelector((state) => state.drop.products);
  const startDate = useSelector((state) => state.drop.startDate);
  const endDate = useSelector((state) => state.drop.endDate);
  const order_status = useSelector((state) => state.drop.order_status);
  const [navbarType, setNavbarType] = useState("relative");
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);

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
  const navigate = useNavigate();

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

  //handle
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ title: "", url: "", gtin: "", brand: "", radius: "" });

  const handleOpen = (item) => {
    setCurrentItem(item);
    setFormData({ title: item.title || "", url: item.url || "", gtin: item.gtin || "", brand: item.brand || "", categories: item.brand || "", radius: "Curtscustoms" || "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, value) => {
    console.log(event, value)
    // console.log({ [e.target.name]: e.target.value })
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    if (event?.target) {
      const { name, value } = event.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        categories: value,
      }));
    }
  };

  const handleChangeDate = (type, value) => {
    if (type == "startDate") {
      dispatch2(updateStartDate(value));
    } else {
      dispatch2(updateEndDate(value));
    }
  };

  const handleSubmit = async () => {
    const res = await dispatch2(addProducts({ ...formData, name, status: false }))
    if (res.payload.status) {
      handleClose();
    }
  };


  const handleExport = async () => {

    const curtcustom = [];
    const zonemart = [];

    products.forEach(product => {
      product.store.forEach(([storeName]) => {
        if (storeName === "Curtscustoms") {
          curtcustom.push(product);
        }
        if (storeName === "Zonemart") {
          zonemart.push(product);
        }
      });
    });
    console.log("Curtscustoms:", curtcustom);
    console.log("Zonemarts:", zonemart);

    let newData = []
    for (const [indexData, row] of curtcustom.entries()) {
      if (row.link) {
        continue
      }
      if (!row.image || !row.variation || !row.variation.length || !row.image.length) {
        continue
      }
      let variable = row.variation
      for (let index = 0; index < variable.length; index++) {
        const _variable = variable[index]
        if (index == 0) {
          newData.push([row.variation[0].sku, row.variation[0].sku, row.variation[0].sku, row.title.replace(/\r|\n/g, ""), row?.description.replace(/\r|\n/g, ""), "", `${row.categories.replace(/\r|\n/g, "")}, Brand ${row.brand}`, `${row.categories.replace(/\r|\n/g, "")}, Brand ${row.brand}`, "", "TRUE", "", "", _variable.name, _variable.value, "", "", "", "", row.variation[0].sku, "0", "", "", "continue", "manual", _variable.sellerprice, "", "TRUE", "FALSE", "", row.image[0], 1, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", _variable.image, "kg", "", 0, "TRUE", "TRUE", "Default", "", "", "", "", "", "", ""])
        } else {
          let newValue = [row.variation[0].sku, row.variation[0].sku, row.variation[0].sku, "", "", "", "", "", "", "", "", "", "", _variable.value, "", "", "", "", _variable.sku, 0, "", "", "continue", "manual", _variable.sellerprice, "", "TRUE", "FALSE", "", row.image?.[index] || "", row.image?.[index] ? index + 1 : "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", _variable.image, "kg", "", 0, "TRUE", "TRUE", "Default", "", "", "", "", "", 0, 0]
          newData.push(newValue)
        }
      }
      if (row.image.length > variable.length) {
        for (let i = variable.length; i < row.image.length; i++) {
          let newValue = ["", "", row.variation[0].sku, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", row.image?.[i] || "", row.image?.[i] ? i + 1 : ""]
          newData.push(newValue)
        }
      }

    }
    const ws = XLSX.utils.aoa_to_sheet([header, ...newData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Curtcustoms_${moment().format("DD/MM")}_${moment().unix()}.csv`);

    let newData2 = []
    for (const [indexData, row] of zonemart.entries()) {
      if (row.link) {
        continue
      }
      if (!row.image || !row.variation || !row.variation.length || !row.image.length) {
        continue
      }
      let variable = row.variation
      for (let index = 0; index < variable.length; index++) {
        const _variable = variable[index]
        if (index == 0) {
          newData2.push([row.variation[0].sku, row.variation[0].sku, row.variation[0].sku, row.title.replace(/\r|\n/g, ""), row?.description.replace(/\r|\n/g, ""), "", `${row.categories.replace(/\r|\n/g, "")}, Brand ${row.brand}`, `${row.categories.replace(/\r|\n/g, "")}, Brand ${row.brand}`, "", "TRUE", "", "", _variable.name, _variable.value, "", "", "", "", row.variation[0].sku, "0", "", "", "continue", "manual", _variable.sellerprice, "", "TRUE", "FALSE", "", row.image[0], 1, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", _variable.image, "kg", "", 0, "TRUE", "TRUE", "Default", "", "", "", "", "", "", ""])
        } else {
          let newValue = [row.variation[0].sku, row.variation[0].sku, row.variation[0].sku, "", "", "", "", "", "", "", "", "", "", _variable.value, "", "", "", "", _variable.sku, 0, "", "", "continue", "manual", _variable.sellerprice, "", "TRUE", "FALSE", "", row.image?.[index] || "", row.image?.[index] ? index + 1 : "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", _variable.image, "kg", "", 0, "TRUE", "TRUE", "Default", "", "", "", "", "", 0, 0]
          newData2.push(newValue)
        }
      }
      if (row.image.length > variable.length) {
        for (let i = variable.length; i < row.image.length; i++) {
          let newValue = ["", "", row.variation[0].sku, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", row.image?.[i] || "", row.image?.[i] ? i + 1 : ""]
          newData2.push(newValue)
        }
      }

    }
    const ws2 = XLSX.utils.aoa_to_sheet([header, ...newData2]);
    const wb2 = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb2, ws2, 'Sheet1');
    XLSX.writeFile(wb2, `Zonemart_${moment().format("DD/MM")}_${moment().unix()}.csv`);
    await dispatch2(updateUpload())
  };

  const dispatch2 = useDispatch();
  useEffect(() => {
    dispatch2(getProducts({ name, status: false }))
  }, []);

  useEffect(() => {
    dispatch2(getDashboard({ name, startDate: moment(startDate).startOf("day").format("x"), endDate: moment(endDate).endOf("day").format("x"), }))
    dispatch2(
      getAds({ from: moment(startDate).format("DD/MM/YYYY"), to: moment(endDate).format("DD/MM/YYYY") })
    );
  }, [startDate, endDate]);

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

        </MDBox>
        <MDBox sx={{ display: "flex", flexDirection: "row", width: "70%", alignItems: "center" }}>
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
          {/* <FormControl sx={{ margin: 1, width: "15%" }}>
            <InputLabel>Fulfil Status</InputLabel>
            <Select
              label="Fulfil Status"
              value={order_status}
              sx={{ height: 37, background: "white" }}
              onChange={(e) => handleChangeOrderStatus(e)}
            >
              {[{ value: "", name: "None" }, { value: "not_fulfilled", name: "Not Fulfilled" }, { value: "fulfilled", name: "Fulfilled" }, { value: "refund", name: "Refund" }, { value: "tracking", name: "No Tracking" }, { value: "basecost", name: "No Basecost" }, { value: "deli", name: "Undelivered" }, { value: "case_item", name: "Case item not received" }, { value: "case_des", name: "Case not as described" }].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <MDButton sx={{ margin: 1 }} color={"dark"} onClick={handleOpen}>
            Add Product<AddIcon
              style={{ cursor: "pointer" }}
              fontSize="large"
              color={"warning"} handleExport

            /></MDButton>
          {name == "DAO" ? <MDButton sx={{ margin: 1 }} color={"dark"} onClick={handleExport}>
            Export<AddIcon
              style={{ cursor: "pointer" }}
              fontSize="large"
              color={"warning"}

            /></MDButton> : null}
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" name="title" label="Title" value={formData.title} onChange={handleChange} required />
          <TextField fullWidth margin="dense" name="url" label="URL" value={formData.url} onChange={handleChange} required />
          <FormControl fullWidth margin="dense" required>
            <RadioGroup
              row
              name="radius"
              value={formData.radius}
              onChange={handleChange}
            >
              <FormControlLabel value="Curtscustoms" control={<Radio />} label="Curtscustoms" />
              <FormControlLabel value="Zonemart" control={<Radio />} label="Zonemart" />
            </RadioGroup>
          </FormControl>
          <Autocomplete
            sx={{ marginTop: 1, marginBottom: 0.5 }}
            options={cate}
            value={formData.categories || null}
            onChange={(event, newValue) =>
              handleChange(event = {}, newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" />
            )}
          />
          <TextField fullWidth margin="dense" name="gtin" label="GTIN" value={formData.gtin} onChange={handleChange} />
          <TextField fullWidth margin="dense" name="brand" label="Brand" value={formData.brand} onChange={handleChange} />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Huỷ</Button>
          <Button onClick={handleSubmit} color="error" variant="contained">Thêm sản phẩm</Button>
        </DialogActions>
      </Dialog>
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
