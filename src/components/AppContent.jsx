import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

function AppContent() {
    const taskList = useSelector((state) => state.task.taskList);
    const sortedTaskList = [...taskList].sort((a, b) => {
        new Date(a.time) - new Date(b.time);
    });
    return (
        <div>
            {sortedTaskList && sortedTaskList.length > 0
                ? sortedTaskList.map((task) => (
                      <TaskItem key={task.id} task={task} />
                  ))
                : "No task added yet"}
        </div>
    );
}
export default AppContent;
