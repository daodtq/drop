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

// EGEAD Fulfilment POD Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

// EGEAD Fulfilment POD Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { text, info, secondary, transparent } = colors;
const { size } = typography;

const buttonText = {
  base: {
    backgroundColor: transparent.main,
    minHeight: pxToRem(40),
    color: text.main,
    boxShadow: "none",
    padding: `${pxToRem(10)} ${pxToRem(24)}`,

    "&:hover": {
      backgroundColor: transparent.main,
      boxShadow: "none",
    },

    "&:focus": {
      boxShadow: "none",
    },

    "&:active, &:active:focus, &:active:hover": {
      opacity: 0.85,
      boxShadow: "none",
    },

    "&:disabled": {
      boxShadow: "none",
    },

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(16)} !important`,
    },
  },

  small: {
    minHeight: pxToRem(32),
    padding: `${pxToRem(6)} ${pxToRem(16)}`,
    fontSize: size.xs,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  large: {
    minHeight: pxToRem(47),
    padding: `${pxToRem(12)} ${pxToRem(28)}`,
    fontSize: size.sm,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  primary: {
    color: info.main,

    "&:hover": {
      color: info.main,
    },

    "&:focus:not(:hover)": {
      color: info.focus,
      boxShadow: "none",
    },
  },

  secondary: {
    color: secondary.main,

    "&:hover": {
      color: secondary.main,
    },

    "&:focus:not(:hover)": {
      color: secondary.focus,
      boxShadow: "none",
    },
  },
};

export default buttonText;
