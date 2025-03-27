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

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";

// EGEAD Fulfilment POD components
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Authentication layout components
import { GoogleLogin } from '@react-oauth/google';
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import moment from 'moment';
import { NotificationManager } from "react-notifications";
import { loginGG, setTimeHash } from 'features/slices';
import { useDispatch } from 'react-redux';
import { logout } from "features/slices";
function Basic(status) {

  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const dispatch = useDispatch()
  const saltRounds = 10;
  useEffect(() => {
    if (status.status == true) {
      dispatch(logout())
    }
  })
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="https://www.facebook.com/EGEADCompany" target="_blank" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="https://t.me/+84934982607" target="_blank" variant="body1" color="white">
                <TelegramIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" sx={{ textAlign: "-webkit-center" }}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                var decoded = jwtDecode(credentialResponse.credential);
                bcrypt.genSalt(saltRounds, (err, salt) => {
                  bcrypt.hash(decoded.email, salt, async (err, hash) => {
                    const time = moment().unix()
                    const res = await dispatch(loginGG(`${hash}${time}`))
                    if (res.payload?.status == 0) {
                      dispatch(setTimeHash({ time: parseInt(time), hash: hash, email: decoded.email }));
                    }
                  });
                });
              }}
              onError={() => {
                NotificationManager.error('Đăng nhập không thành công!', 'Error', 3000);
              }} />
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
