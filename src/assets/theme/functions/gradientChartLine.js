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

/**
  The gradientChartLine() function helps you to create a gradient color for the chart line
 */

// EGEAD Fulfilment POD helper functions
import rgba from "assets/theme/functions/rgba";

function gradientChartLine(chart, color, opacity = 0.2) {
  const ctx = chart
  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  const primaryColor = rgba(color, opacity).toString();
  gradientStroke.addColorStop(1, primaryColor);
  gradientStroke.addColorStop(0.2, "rgba(72, 72, 176, 0.0)");
  gradientStroke.addColorStop(0, "rgba(203, 12, 159, 0)");

  return gradientStroke;
}

export default gradientChartLine;
