import PageTitle from "./components/PageTitle";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import { Toaster } from "react-hot-toast";
import styles from "./styles/modules/app.module.scss";

const App = () => {
    return (
        <>
            <div>
                <PageTitle>Task Manager</PageTitle>
                <div className={styles.app__wrapper}>
                    <AppHeader />
                    <AppContent />
                </div>
            </div>
            <Toaster
                position="bottom-right"
                toastOptions={{ style: { fontSize: "1.4rem" } }}
            />
        </>
    );
};

export default App;
