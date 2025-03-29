import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import { GET, POST } from "../api";
const userSlice = createSlice({
  name: "drop",
  initialState: { type: false, datauser: [], status: "idle", user: "", isLoggedIn: false, time: null, hash: null, isLoading: false, name: "", startDate: new Date().toISOString(), endDate: new Date().toISOString(), products: [], dashboard: {} },
  reducers: {
    // IMMER
    addTodo: (state, action) => {
      state.push(action.payload);
    }, // action creators
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    }, setLoading: (state, action) => {
      state.isLoading = action.payload;
    }, stopLoading: (state) => {
      state.isLoading = false;
    }, loginSuccess: (state) => {
      state.isLoggedIn = true;
    }, logout: (state) => {
      state.isLoading = false;;
      state.time = null;
      state.hash = null;
    }, setTimeHash: (state, action) => {
      state.time = action.payload.time;
      state.hash = action.payload.hash;
      state.email = action.payload.email;
    }, setEndDate(state, action) {
      state.endDate = action.payload;
    }, setStartDate(state, action) {
      state.startDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginGG.fulfilled, (state, action) => {
        const res = action.payload;
        if (res.status == 0) {
          NotificationManager.success("Login thành công ", "Alert", 1000);
          state.isLoggedIn = true
          state.user = res.user
          state.name = res.name
        } else {
          NotificationManager.error("Login Fail ", "Error", 1000);

        }
      })
      .addCase(loginGG.pending, (state, action) => {
        NotificationManager.success("Đang Login !", "Alert", 1000);
        state.isLoggedIn = false
      })
      .addCase(loginGG.rejected, (state, action) => {
        state.isLoading = false
        NotificationManager.error('Login Fail !', 'Error', 1000);
        state.isLoggedIn = false
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const res = action.payload;
        state.products = res.products;
        state.isLoading = false
      })
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        NotificationManager.error('Server not responding!', 'Error', 1000);
        state.products = []
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        const res = action.payload;
        if (res.status == true) {
          state.products = res.products;
        } else {
          NotificationManager.error(res.message, 'Error', 1000);
        }
        state.isLoading = false
      })
      .addCase(addProducts.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.isLoading = false
        NotificationManager.error('Server not responding!', 'Error', 1000);
        state.products = []
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        const res = action.payload;
        if (res.status == true) {
          state.dashboard = res.result;
        } else {
          NotificationManager.error(res.message, 'Error', 1000);
        }
        state.isLoading = false
      })
      .addCase(getDashboard.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.isLoading = false
        NotificationManager.error('Server not responding!', 'Error', 1000);
        state.products = []
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        const res = action.payload;
        if (res.status == true) {
          state.products = res.products;
        } else {
          NotificationManager.error(res.message, 'Error', 1000);
        }
        state.isLoading = false
      })
      .addCase(deleteProducts.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false
        NotificationManager.error('Server not responding!', 'Error', 1000);
        state.products = []
      })
      .addCase(editProducts.fulfilled, (state, action) => {
        const res = action.payload;
        if (res.status == true) {
          state.products = res.products;
        } else {
          NotificationManager.error(res.message, 'Error', 1000);
        }
        state.isLoading = false
      })
      .addCase(editProducts.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(editProducts.rejected, (state, action) => {
        state.isLoading = false
        NotificationManager.error('Server not responding!', 'Error', 1000);
        state.products = []
      })
      .addCase(updateUpload.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(updateUpload.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateUpload.rejected, (state, action) => {
        state.isLoading = false
        NotificationManager.error('Server not responding!', 'Error', 1000);
        state.products = []
      })
  },
});


export const addProducts = createAsyncThunk("drop/addProducts", async (newTodo, { dispatch }) => {
  try {
    const res = await POST("/addproducts", newTodo);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const editProducts = createAsyncThunk("drop/editProducts", async (newTodo, { dispatch }) => {
  try {
    const res = await POST("/editproducts", newTodo);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const deleteProducts = createAsyncThunk("drop/deleteProducts", async (newTodo, { dispatch }) => {
  try {
    const res = await POST("/deleteproducts", newTodo);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const loginGG = createAsyncThunk("drop/logingg", async (newTodo, { dispatch }) => {
  try {
    const res = await POST("/logingg", { hash: newTodo });
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const getProducts = createAsyncThunk("drop/getproducts", async (newTodo) => {
  const res = await GET("/getproducts", newTodo);
  return res.data;
});

export const getDashboard = createAsyncThunk("drop/getDashboard", async (newTodo) => {
  const res = await GET("/getdashboard", newTodo);
  return res.data;
});

export const updateUpload = createAsyncThunk("drop/updateUpload", async (newTodo, { dispatch }) => {
  const res = await GET("/updateupload", newTodo);
  return res.data;
});

export const updateLoading = (date) => (dispatch) => {
  dispatch(setLoading(date));
};

export const updateStartDate = (date) => (dispatch) => {
  dispatch(setStartDate(date));
};

export const updateEndDate = (date) => (dispatch) => {
  dispatch(setEndDate(date));
};


export const { loginSuccess, logout, setTimeHash, setLoading, setStartDate, setEndDate } = userSlice.actions;
export default userSlice;
