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
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import moment from "moment";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import "./table.css";

function Tables() {
  const products = useSelector((state) => state.drop.products);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox pt={3}>
              <table className="table">
                <thead>
                  <tr className="table-header">
                    <th>Date</th>
                    <th>Title</th>
                    <th>Images</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Link</th>
                    <th>Note</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length ? (
                    products.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr className="table-row">
                          <td>{moment(item?.createdAt).format("HH:mm DD/MM/YYYY")}</td>
                          <td className="title"><a href={item?.url}>{item?.title}</a></td>
                          <td>
                            {item?.image ? <img src={item?.image?.[0]} alt={item?.title} className="image" /> : null}

                          </td>
                          <td className="title">{item?.categories}</td>

                          <td className="title">{item?.brand}</td>

                          <td>{item.link ? <a href={item?.link} target="_blank" rel="noopener noreferrer">Link Web</a> : null}</td>
                          <td className="note">{item?.note}</td>
                          <td className="variation">
                            <EditIcon onClick={() => onUpdate(item)} style={{ cursor: "pointer", color: "#1976d2" }} />
                          </td>
                        </tr>
                        {item?.variation.map((variant) => (
                          <tr key={variant.id} className={!variant?.sellerprice ? "variation-row alert-background" : variant?.price > variant?.oldprice ? "variation-row red-background" : variant?.price < variant?.oldprice ? "variation-row green-background" : "variation-row"}>
                            <td ></td>
                            <td></td>
                            <td className="name variation">{variant?.name}</td>
                            <td className="variation"> Giá mới <span className="price" >${variant?.price}</span></td>
                            <td className="variation"> Giá cũ <span className="old-price" >${variant?.oldprice}</span></td>
                            <td className="variation"> Giá bán <span className="seller-price" >${variant?.sellerprice}</span></td>
                            <td className={variant?.stock ? "stock in-stock variation" : "stock out-of-stock variation"}>
                              {variant?.stock ? "In Stock" : "Out of Stock"}
                            </td>
                            <td className="variation">
                              <EditIcon onClick={() => onUpdate(item)} style={{ cursor: "pointer", color: "#1976d2" }} />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="no-products">No products available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout >
  );
}

export default Tables;
