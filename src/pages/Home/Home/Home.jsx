

import TaskBoard from "../../../components/TaskBoard";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import Login from "../../Login/Login";




const Home = () => {
    const { user } = useAuth();

    return (
        <div>
            <div className="flex items-center justify-center h-[100px] px-4 bg-white dark:bg-gray-900">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="border-2 border-blue-500 rounded-lg shadow-md shadow-blue-300 dark:shadow-blue-800 bg-white dark:bg-gray-800 px-6 py-2"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
                        Your Personal Task Companion
                    </h2>
                </motion.div>
            </div>
            {
                (user) ? <> <TaskBoard></TaskBoard> </> : <> <Login></Login></>
            }

            {/* <TaskBoard></TaskBoard> */}

        </div>
    );
};

export default Home;