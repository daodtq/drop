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

// EGEAD Fulfilment POD helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

// EGEAD Fulfilment POD base styles
import colors from "assets/theme-dark/base/colors";
import boxShadows from "assets/theme-dark/base/boxShadows";
import borders from "assets/theme-dark/base/borders";

const { transparent } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const popover = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: md,
      padding: pxToRem(8),
      borderRadius: borderRadius.md,
    },
  },
};

export default popover;
