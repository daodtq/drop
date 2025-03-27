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
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import "./table.css";
import { deleteProducts } from "features/slices";

function Tables() {
  const products = useSelector((state) => state.drop.products);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState({})
  const dispatch = useDispatch()
  const handleDelete = async () => {
    await dispatch(deleteProducts({ id: items.id, status: false }))
    setOpen(false);
  }

  const handleOpen = (items) => {
    setItems(items)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);
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
                    <th>Link</th>
                    <th>Delete</th>
                    <th>Variant</th>
                    <th>New Price</th>
                    <th>Old Price</th>
                    <th>Seller Price</th>
                    <th>Stock</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length ? (
                    products.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr className="table-row">
                          <td rowSpan={item?.variation.length + 1}>{moment(item?.createdAt).format("HH:mm DD/MM/YYYY")}</td>
                          <td rowSpan={item?.variation.length + 1} className="title"><a href={item?.url}>{item?.title}</a><br />
                            <div className="category-brand"><span className="category">Categories: </span>{item?.categories}<br /><span className="brand">Brand: </span>{item?.brand}</div>
                          </td>
                          <td rowSpan={item?.variation.length + 1}>{item?.image ? <img src={item?.image?.[0]} alt={item?.title} className="image" /> : null}</td>
                          <td rowSpan={item?.variation.length + 1}>{item?.link ? <a href={item?.link} target="_blank" rel="noopener noreferrer">Link Web</a> : "none"}</td>
                          <td rowSpan={item?.variation.length + 1}> <RemoveShoppingCartIcon fontSize="medium" onClick={() => handleOpen(item)} style={{ cursor: "pointer", color: "red" }} /></td>
                        </tr>
                        {item?.variation.map((variant, vIndex) => (
                          <tr key={vIndex} className={variant?.sellerprice == variant?.price || variant?.sellerprice == variant?.oldprice ? "variation-row alert-background" : variant?.price > variant?.oldprice ? "variation-row red-background" : variant?.price < variant?.oldprice ? "variation-row green-background" : "variation-row"}>
                            <td className="name variation">{variant?.name}</td>
                            <td className="variation"> <span className="price" >${variant?.price}</span></td>
                            <td className="variation"> <span className="old-price" >${variant?.oldprice}</span></td>
                            <td className="variation"> <span className="seller-price" >${variant?.sellerprice}</span></td>
                            <td className={variant?.stock ? "stock in-stock variation" : "stock out-of-stock variation"}>
                              {variant?.stock ? "In Stock" : "Out of Stock"}
                            </td>
                            <td className="variation">
                              <EditIcon onClick={() => handleOpen(item)} style={{ cursor: "pointer", color: "#1976d2" }} />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={12} className="no-products">No products available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xoá sản phẩm</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Hành động này sẽ xoá toàn bộ dữ liệu sản phẩm khỏi website. Bạn có chắc chắn muốn tiếp tục?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Hủy</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout >
  );
}

export default Tables;
