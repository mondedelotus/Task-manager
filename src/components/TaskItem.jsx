import { format } from "date-fns";
import styles from "../styles/modules/taskItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/reducers/taskReducer";
import { toast } from "react-hot-toast";
import TaskModal from "./TaskModal";

function TaskItem({ task }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        toast.success("Task Deleted Successfully");
    };

    const handleUpdate = () => {
        setUpdateModalOpen(true);
    };

    return (
        <>
            <div className={styles.item}>
                <div className="styles taskDetails">
                    <div className="styles texts">
                        <p
                            className={getClasses([
                                styles.taskText,
                                task.status === "complete" &&
                                    styles["taskText--completed"],
                            ])}
                        >
                            {task.title}
                        </p>
                        <p className={styles.time}>
                            {format(new Date(task.time), "p, MM/dd/yyyy")}
                        </p>
                    </div>
                </div>
                <div className={styles.taskActions}>
                    <div
                        className={styles.icon}
                        onClick={handleDelete}
                        onKeyDown={handleDelete}
                        role="button"
                        tabIndex={0}
                    >
                        <MdDelete />
                    </div>
                    <div
                        className={styles.icon}
                        onClick={handleUpdate}
                        onKeyDown={handleUpdate}
                        role="button"
                        tabIndex={0}
                    >
                        <MdEdit />
                    </div>
                </div>
            </div>

            <TaskModal
                type="update"
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
                task={task}
            />
        </>
    );
}
export default TaskItem;
