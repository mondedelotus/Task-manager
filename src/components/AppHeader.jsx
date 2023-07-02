import Button, { SelectButton } from "./Button";
import TaskModal from "./TaskModal";
import { useState } from "react";
import styles from "../styles/modules/app.module.scss";

function AppHeader() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className={styles.appHeader}>
            <Button variant="primary" onClick={() => setModalOpen(true)}>
                Add task
            </Button>
            <SelectButton id="status" name="status">
                <option value="all">All</option>
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
            </SelectButton>
            <TaskModal
                type="add"
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    );
}
export default AppHeader;
