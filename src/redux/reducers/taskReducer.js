import { createSlice } from "@reduxjs/toolkit";

const getInitialTask = () => {
    const localTaskList = window.localStorage.getItem("taskList");
    if (localTaskList) {
        return JSON.parse(localTaskList);
    }
    window.localStorage.setItem("taskList", JSON.stringify([]));
    return [];
};

const initialValue = {
    taskList: getInitialTask(),
};

export const taskSlice = createSlice({
    name: "task",
    initialState: initialValue,
    reducers: {
        addTask: (state, action) => {
            state.taskList.push(action.payload);
            const taskList = window.localStorage.getItem("taskList");
            if (taskList) {
                const taskListArr = JSON.parse(taskList);
                taskListArr.push({
                    ...action.payload,
                });
                window.localStorage.setItem(
                    "taskList",
                    JSON.stringify(taskListArr)
                );
            } else {
                window.localStorage.setItem(
                    "taskList",
                    JSON.stringify([{ ...action.payload }])
                );
            }
        },
        updateTask: (state, action) => {
            const taskList = window.localStorage.getItem("taskList");
            if (taskList) {
                const taskListArr = JSON.parse(taskList);
                taskListArr.forEach((task) => {
                    if (task.id === action.payload.id) {
                        task.status = action.payload.status;
                        task.title = action.payload.title;
                    }
                });
                window.localStorage.setItem(
                    "taskList",
                    JSON.stringify(taskListArr)
                );
                state.taskList = [...taskListArr];
            }
        },
        deleteTask: (state, action) => {
            const taskList = window.localStorage.getItem("taskList");
            if (taskList) {
                const taskListArr = JSON.parse(taskList);
                taskListArr.forEach((task, index) => {
                    if (task.id === action.payload) {
                        taskListArr.splice(index, 1);
                    }
                });
                window.localStorage.setItem(
                    "taskList",
                    JSON.stringify(taskListArr)
                );
                state.taskList = taskListArr;
            }
        },
    },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
