import { format } from "date-fns";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/reducers/taskReducer";
import styles from "../styles/modules/taskItem.module.scss";
import { getClasses } from "../utils/getClasses";
import CheckBox from "./CheckBox";
import TaskModal from "./TaskModal";

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

function TaskItem({ task }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    useEffect(() => {
        if (task.status === "complete") {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [task.status]);

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(
            updateTask({ ...task, status: checked ? "incomplete" : "complete" })
        );
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        toast.success("Task Deleted Successfully");
    };

    const handleUpdate = () => {
        setUpdateModalOpen(true);
    };

    return (
        <>
            <motion.div className={styles.item} variants={child}>
                <div className={styles.taskDetails}>
                    <CheckBox checked={checked} handleCheck={handleCheck} />
                    <div className={styles.texts}>
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
                        onClick={() => handleDelete()}
                        onKeyDown={() => handleDelete()}
                        tabIndex={0}
                        role="button"
                    >
                        <MdDelete />
                    </div>
                    <div
                        className={styles.icon}
                        onClick={() => handleUpdate()}
                        onKeyDown={() => handleUpdate()}
                        tabIndex={0}
                        role="button"
                    >
                        <MdEdit />
                    </div>
                </div>
            </motion.div>
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
