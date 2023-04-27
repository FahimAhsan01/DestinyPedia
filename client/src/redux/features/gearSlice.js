import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createGear = createAsyncThunk(
  "gear/createGear",
  async ({ updatedGearData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createGear(updatedGearData);
      toast.success("Gear Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getGears = createAsyncThunk(
  "gear/getGears",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getGears(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getGear = createAsyncThunk(
  "gear/getGear",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getGear(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeGear = createAsyncThunk(
  "gear/likeGear",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeGear(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getGearsByUser = createAsyncThunk(
  "gear/getGearsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getGearsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteGear = createAsyncThunk(
  "gear/deleteGear",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteGear(id);
      toast.success("Gear Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateGear = createAsyncThunk(
  "gear/updateGear",
  async ({ id, updatedGearData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateGear(updatedGearData, id);
      toast.success("Gear Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchGears = createAsyncThunk(
  "gear/searchGears",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getGearsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getGearsByTag = createAsyncThunk(
  "gear/getGearsByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagGears(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedGears = createAsyncThunk(
  "gear/getRelatedGears",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedGears(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const gearSlice = createSlice({
  name: "gear",
  initialState: {
    gear: {},
    gears: [],
    userGears: [],
    tagGears: [],
    relatedGears: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createGear.pending]: (state, action) => {
      state.loading = true;
    },
    [createGear.fulfilled]: (state, action) => {
      state.loading = false;
      state.gears = [action.payload];
    },
    [createGear.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getGears.pending]: (state, action) => {
      state.loading = true;
    },
    [getGears.fulfilled]: (state, action) => {
      state.loading = false;
      state.gears = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getGears.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getGear.pending]: (state, action) => {
      state.loading = true;
    },
    [getGear.fulfilled]: (state, action) => {
      state.loading = false;
      state.gear = action.payload;
    },
    [getGear.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getGearsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getGearsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userGears = action.payload;
    },
    [getGearsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteGear.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteGear.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userGears = state.userGears.filter((item) => item._id !== id);
        state.gears = state.gears.filter((item) => item._id !== id);
      }
    },
    [deleteGear.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateGear.pending]: (state, action) => {
      state.loading = true;
    },
    [updateGear.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userGears = state.userGears.map((item) =>
          item._id === id ? action.payload : item
        );
        state.gears = state.gears.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateGear.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeGear.pending]: (state, action) => {},
    [likeGear.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.gears = state.gears.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeGear.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [searchGears.pending]: (state, action) => {
      state.loading = true;
    },
    [searchGears.fulfilled]: (state, action) => {
      state.loading = false;
      state.gears = action.payload;
    },
    [searchGears.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getGearsByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getGearsByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagGears = action.payload;
    },
    [getGearsByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getRelatedGears.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedGears.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedGears = action.payload;
    },
    [getRelatedGears.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = gearSlice.actions;

export default gearSlice.reducer;
