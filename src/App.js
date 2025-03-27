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

import { useEffect, useMemo, useState } from "react";
import "./App.css"
// react-router components
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import { ThemeProvider } from "@mui/material/styles";

// EGEAD Fulfilment POD components
import MDBox from "components/MDBox";

// EGEAD Fulfilment POD example components
import Configurator from "examples/Configurator";
import Sidenav from "examples/Sidenav";

// EGEAD Fulfilment POD themes
import theme from "assets/theme";

// EGEAD Fulfilment POD Dark Mode themes
import themeDark from "assets/theme-dark";
import { useSelector } from 'react-redux';
// RTL plugins
import createCache from "@emotion/cache";
import { useNavigate } from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
// EGEAD Fulfilment POD routes
import routes from "routes";
import routesForDesign from "routesForDesign";
import routesBeforeLogin from "routesBeforeLogin";

// EGEAD Fulfilment POD contexts
import { setMiniSidenav, setOpenConfigurator, useMaterialUIController } from "context";

// Images
import brandDark from "assets/images/logo-ct-dark.png";
import brandWhite from "assets/images/logo-ct.png";
import LoadingScreen from "Loading";

export default function App() {
  const isLoggedIn = useSelector((state) => state.drop.isLoggedIn);
  const isLoading = useSelector((state) => state.drop.isLoading);

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    navigate("/dashboard")
  }, [isLoggedIn]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });
  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      {isLoading && <LoadingScreen />}
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="EGEAD Fulfilment POD"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {isLoggedIn ? (
          <>
            {/* {permission.includes("design_link") ? getRoutes(routesForDesign) : getRoutes(routes)} */}
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            {getRoutes(routesBeforeLogin)}
            <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
          </>
        )}
      </Routes>
    </ThemeProvider >
  );
}
