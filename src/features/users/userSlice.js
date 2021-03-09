import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../services/axios";

export const createUser = createAsyncThunk("user/createUser", async (data) => {
  console.log("TEST");
  let response = await axios.post("api/users", data);
  return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete(`api/users/${id}`);
  return id;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }) => {
    const response = await axios.put(`api/users/${id}`, data);
    response.data.id = id;
    return response.data;
  }
);

export const getUsers = createAsyncThunk("user/getUsers", async (id) => {
  const response = await axios.get(`api/users?per_page=20`);
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    usersList: {
      data: [],
    },
    action: "",
    isSuccess: false,
    isLoading: false,
  },
  reducers: {
    cleanUp: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.action = "";
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },

    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.usersList.data.push(action.payload);
      state.action = "create";
      state.isLoading = false;
      state.isSuccess = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.action = "delete";
      state.usersList.data = state.usersList.data.filter(
        (user) => action.payload !== user.id
      );
    },
    [getUsers.fulfilled]: (state, action) => {
      state.usersList = action.payload;
      state.isLoading = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.usersList.data = state.usersList.data.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
      state.action = "update";
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});
export const { cleanUp } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
