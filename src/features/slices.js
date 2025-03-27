import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import { GET, POST } from "../api";
const userSlice = createSlice({
  name: "drop",
  initialState: { type: false, datauser: [], status: "idle", user: "", isLoggedIn: false, time: null, hash: null, isLoading: false, name: "", products: [] },
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

export const updateLoading = (date) => (dispatch) => {
  dispatch(setLoading(date));
};



export const { loginSuccess, logout, setTimeHash, setLoading } = userSlice.actions;
export default userSlice;
