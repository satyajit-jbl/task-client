

import TaskBoard from "../../../components/TaskBoard";
import useAuth from "../../../hooks/useAuth";




const Home = () => {
    const {user} = useAuth();
    
    return (
        <div>
            <h2>This is Home</h2>
            <TaskBoard></TaskBoard>
            
        </div>
    );
};

export default Home;