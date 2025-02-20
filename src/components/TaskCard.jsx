import { motion } from "framer-motion";

const TaskCard = ({ task, onDragStart }) => {
    return (
        <motion.div
            className="bg-white p-3 rounded-lg shadow-md mb-2 cursor-grab"
            draggable
            onDragStart={onDragStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
        >
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-400">{new Date(task.timestamp).toLocaleString()}</p>
        </motion.div>
    );
};

export default TaskCard;
