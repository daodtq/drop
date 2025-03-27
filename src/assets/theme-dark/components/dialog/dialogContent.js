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

// EGEAD Fulfilment POD base styles
import typography from "assets/theme-dark/base/typography";
import borders from "assets/theme-dark/base/borders";
import colors from "assets/theme-dark/base/colors";

// EGEAD Fulfilment POD helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";
import rgba from "assets/theme-dark/functions/rgba";

const { size } = typography;
const { white } = colors;
const { borderWidth, borderColor } = borders;

const dialogContent = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.md,
      color: rgba(white.main, 0.8),
    },

    dividers: {
      borderTop: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
      borderBottom: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
    },
  },
};

export default dialogContent;
