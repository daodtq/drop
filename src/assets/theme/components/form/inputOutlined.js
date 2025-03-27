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
import borders from "assets/theme/base/borders";
import typography from "assets/theme/base/typography";

// EGEAD Fulfilment POD helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { inputBorderColor, info, grey, transparent } = colors;
const { borderRadius } = borders;
const { size } = typography;

const inputOutlined = {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      fontSize: size.sm,
      borderRadius: borderRadius.md,

      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: inputBorderColor,
      },

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: info.main,
        },
      },
    },

    notchedOutline: {
      borderColor: inputBorderColor,
    },

    input: {
      color: grey[700],
      padding: pxToRem(12),
      backgroundColor: transparent.main,
    },

    inputSizeSmall: {
      fontSize: size.xs,
      padding: pxToRem(10),
    },

    multiline: {
      color: grey[700],
      padding: 0,
    },
  },
};

export default inputOutlined;
