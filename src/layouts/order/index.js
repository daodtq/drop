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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIcon from "@mui/icons-material/Edit";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { deleteProducts } from "features/slices";
import moment from "moment";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import "./table.css";
import { editProducts } from 'features/slices';

function Tables() {
  const products = useSelector((state) => state.drop.products);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditSimple, setOpenEditSimple] = useState(false);
  const [items, setItems] = useState({})
  const [variations, setVariations] = useState(items);
  const [variation, setVariation] = useState({});

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

  const handleOpenEdit = (items) => {
    setVariations(items.variation)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenEditSimple = (items) => {
    setVariation(items)
    setOpenEditSimple(true)
  }

  const handleCloseEditSimple = () => {
    setOpenEditSimple(false);
  };

  const handleSellerPriceChange = (index, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index].sellerprice = value;
    setVariations(updatedVariations);
  };

  const handleStockChange = (index) => {
    setVariations(prevVariations => {
      const newVariations = [...prevVariations]; // Tạo một bản sao mới
      newVariations[index] = { ...newVariations[index], stock: !newVariations[index].stock }; // Cập nhật thuộc tính stock
      return newVariations;
    });
  };

  const handleUpdate = async () => {
    await dispatch(editProducts({ variations }))
    handleCloseEdit();
  };

  const handleUpdateSimple = async () => {
    await dispatch(editProducts({ variation }))
    handleCloseEditSimple();
  };
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
                    <th>Setting</th>
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
                          <td rowSpan={item?.variation.length + 1}>{item?.image.length ? <img src={item?.image?.[0]} alt={item?.title} className="image" /> : item.note ? <span style={{ color: "red", fontWeight: "bold" }}>{item.note}</span> : <span>{item.note}</span>}</td>
                          <td rowSpan={item?.variation.length + 1}>{item?.link ? <a href={item?.link} target="_blank" rel="noopener noreferrer">Link Web</a> : "none"}</td>
                          <td rowSpan={item?.variation.length + 1}>
                            <BorderColorIcon fontSize="medium" onClick={() => handleOpenEdit(item)} style={{ cursor: "pointer", color: "#1976d2", marginRight: 10 }} />
                            <RemoveShoppingCartIcon fontSize="medium" onClick={() => handleOpen(item)} style={{ cursor: "pointer", color: "red" }} />
                          </td>
                        </tr>
                        {item?.variation.map((variant, vIndex) => (
                          <tr key={vIndex} className={variant?.sellerprice == variant?.price || variant?.sellerprice == variant?.oldprice ? "variation-row alert-background" : variant?.price > variant?.oldprice ? "variation-row red-background" : variant?.price < variant?.oldprice ? "variation-row green-background" : "variation-row"}>
                            <td className="name variation">{variant?.value}</td>
                            <td className="variation change-color"> <span className="price" >${variant?.price}</span></td>
                            <td className="variation change-color"> <span className="old-price" >${variant?.oldprice}</span></td>
                            <td className="variation change-color2"> <span className="seller-price" >${variant?.sellerprice}</span></td>
                            <td className={variant?.stock ? "stock in-stock variation" : "stock out-of-stock variation"}>
                              {variant?.stock ? "In Stock" : "Out of Stock"}
                            </td>
                            <td className="variation">
                              <EditIcon onClick={() => handleOpenEditSimple(variant)} style={{ cursor: "pointer", color: "#1976d2" }} />
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
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="md" fullWidth>
        <DialogTitle>Update Sản Phẩm</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Hành động này sẽ update toàn bộ dữ liệu sản phẩm trên website!
          </Typography>

          {/* Bảng hiển thị danh sách biến thể */}
          <table className="table" >
            <thead className="table-header">
              <tr>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Old Price ($)</th>
                <th>Seller Price ($)</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {variations.length ? variations.map((variant, vIndex) => (
                <tr key={vIndex} className={variant?.sellerprice == variant?.price || variant?.sellerprice == variant?.oldprice ? "variation-row alert-background" : variant?.price > variant?.oldprice ? "variation-row red-background" : variant?.price < variant?.oldprice ? "variation-row green-background" : "variation-row"}>
                  <td className="name variation">{variant?.value}</td>
                  <td className="variation change-color"> <span className="price" >${variant?.price}</span></td>
                  <td className="variation change-color"> <span className="old-price" >${variant?.oldprice}</span></td>
                  <td className="variation change-color2">
                    <input
                      type="number"
                      value={variant.sellerprice}
                      onChange={(e) => handleSellerPriceChange(vIndex, e.target.value)}
                    />
                  </td>
                  <td className="variation">
                    <input
                      type="checkbox"
                      checked={variant.stock}
                      onChange={() => handleStockChange(vIndex)}
                    />
                  </td>
                </tr>
              )) : null}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">Hủy</Button>
          <Button color="error" variant="contained" onClick={() => {
            const hasInvalidPrice = variations.some(variant => variant.sellerprice <= variant.price);
            if (hasInvalidPrice) {
              alert("Giá bán không thể nhỏ hơn hoặc bằng giá ban đầu được!");
              return;
            }
            handleUpdate()
          }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditSimple} onClose={handleCloseEditSimple} maxWidth="md" fullWidth>
        <DialogTitle>Update Sản Phẩm</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Hành động này sẽ update dữ liệu sản phẩm trên website!
          </Typography>

          {/* Bảng hiển thị danh sách biến thể */}
          <table className="table" >
            <thead className="table-header">
              <tr>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Old Price ($)</th>
                <th>Seller Price ($)</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr className={variation?.sellerprice == variation?.price || variation?.sellerprice == variation?.oldprice ? "variation-row alert-background" : variation?.price > variation?.oldprice ? "variation-row red-background" : variation?.price < variation?.oldprice ? "variation-row green-background" : "variation-row"}>
                <td className="name variation">{variation?.value}</td>
                <td className="variation change-color"> <span className="price" >${variation?.price}</span></td>
                <td className="variation change-color"> <span className="old-price" >${variation?.oldprice}</span></td>
                <td className="variation change-color2">
                  <input
                    type="number"
                    value={variation.sellerprice}
                    onChange={(e) => setVariation({ ...variation, sellerprice: e.target.value })}
                  />
                </td>
                <td className="variation">
                  <input
                    type="checkbox"
                    checked={variation.stock}
                    onChange={(e) => setVariation({ ...variation, stock: !variation.stock })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditSimple} color="secondary">Hủy</Button>
          <Button color="error" variant="contained" onClick={() => {
            const hasInvalidPrice = variation.sellerprice <= variation.price
            if (hasInvalidPrice) {
              alert("Giá bán không thể nhỏ hơn hoặc bằng giá ban đầu được!");
              return;
            }
            handleUpdateSimple()
          }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </DashboardLayout >
  );
}

export default Tables;
