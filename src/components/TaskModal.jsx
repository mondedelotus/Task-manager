import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import styles from "../styles/modules/modal.module.scss";
import { addTask } from "../redux/reducers/taskReducer";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { updateTask } from "../redux/reducers/taskReducer";
import { useEffect } from "react";

function TaskModal({ type, modalOpen, setModalOpen, task }) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("incomplete");
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === "update" && task) {
            setTitle(task.title);
            setStatus(task.status);
        } else {
            setTitle("");
            setStatus("incomplete");
        }
    }, [type, task, modalOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "") {
            toast.error("Please enter a title");
            return;
        }
        if (title && status) {
            if (type === "add") {
                dispatch(
                    addTask({
                        id: uuid(),
                        title,
                        status,
                        time: new Date().toLocaleString(),
                    })
                );
                toast.success("Task added successfully");
            }
            if (type === "update") {
                if (task.title !== title || task.status !== status) {
                    dispatch(updateTask({ ...task, title, status }));
                    toast.success("Task Updated successfully");
                } else {
                    toast.error("No changes made");
                    return;
                }
            }
            setModalOpen(false);
        }
    };
    return (
        modalOpen && (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div
                        className={styles.closeButton}
                        onClick={() => setModalOpen(false)}
                        onKeyDown={() => setModalOpen(false)}
                    >
                        <MdOutlineClose />
                    </div>
                    <form
                        className={styles.form}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <h1 className={styles.formTitle}>
                            {type === "add" ? "Add" : "Update"} Task
                        </h1>
                        <label htmlFor="title">
                            Title
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label htmlFor="status">
                            Status
                            <select
                                name="status"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="incomplete">Incomplete</option>
                                <option value="complete">Complete</option>
                            </select>
                        </label>
                        <div className={styles.buttonContainer}>
                            <Button type="submit" variant="primary">
                                {type === "add" ? "Add" : "Update"} Task
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setModalOpen(false)}
                                onKeyDown={() => setModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}
export default TaskModal;
