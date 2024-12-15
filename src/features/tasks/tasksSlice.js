import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const tokenn = JSON.parse(localStorage.getItem("userToken"));
// const userIdddd = JSON.parse(localStorage.getItem("userId"));
const BASE_URL=process.env.BASE_URL;
const initialState = {
  tasks: [],
  tasksTemp: [],
  taskToUpdate: {},
  isDeleteSuccessfull: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTQ1YzMzOGVlNTMyZGRiNzdkM2RlNCIsImlhdCI6MTY5MjY4NzQ4MX0.UV2M8_M4qBt41VCU7NG6sMUhmTj7tbuCNufFKoxE1h4";

const uId = "64e45c338ee532ddb77d3de4";

// Create Task
export const createTask = createAsyncThunk(
  `${BASE_URL}/task/create`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/tasks/createtask`,
        data.finalTask,
        {
          headers: {
            "Auth-token": data.token,
          },
        }
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get all tasks
export const getAllTasks = createAsyncThunk(
  `${BASE_URL}/task/getalltasks`,
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks/getalltasks`, {
        headers: {
          "Auth-token": data.token,
          "userId": data.userId,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get single task
export const getTask = createAsyncThunk(
  `${BASE_URL}/task/gettask`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks/gettask/${data.id}`, {
        headers: {
          "Auth-token": data.token,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  `${BASE_URL}/task/updatetask`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/tasks/updatetask/${data.task._id}`,
        data.task,
        {
          headers: {
            "Auth-token": data.token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  `${BASE_URL}/task/deletetask`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/tasks/deletetask/${data.id}`, {
        headers: {
          "Auth-token": data.token,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    AllTasks: (state) => {
      state.tasks = state.tasksTemp;
    },
    PendingTask: (state) => {
      state.tasks = state.tasksTemp.filter((task) => task.status === "To-do");
    },
    ProgressTask: (state) => {
      state.tasks = state.tasksTemp.filter(
        (task) => task.status === "In-progress"
      );
    },
    CompletedTask: (state) => {
      state.tasks = state.tasksTemp.filter(
        (task) => task.status === "Completed"
      );
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Add all tasks
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get all tasks
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasksTemp = action.payload === "Error" ? [] : action.payload;
        state.tasks = action.payload === "Error" ? [] : action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get task
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true;
        state.taskToUpdate = action.payload.foundTask;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.taskToUpdate = {};
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleteSuccessfull = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isDeleteSuccessfull = false;
        state.message = action.payload;
      });
  },
});

export const { reset, PendingTask, AllTasks, ProgressTask, CompletedTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
