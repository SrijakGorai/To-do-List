import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://localhost:8080/api/tasks/${id}`)
            .then(response => {
                setTask(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(`Error fetching task: ${error.message}`);
                setLoading(false);
            });
        }, 1000);
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/tasks/${id}`);
            navigate("/");
        } catch (error) {
            setError(`Error deleting task: ${error.message}`);
        }
    };

    return (
        <div className="task-details-container">
            <h2 className="task-details-title">Task Details</h2>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && task && (
                <div className="task-details-content">
                    <h3 className="task-details-name fade-in delay-1">{task.title}</h3>
                    <p className="task-details-desc fade-in delay-2">{task.description}</p>
                    <div className="task-details-buttons fade-in delay-5">
                        <Link to={`/edit-task/${id}`}>
                            <button className="update-task-button">Update Task</button>
                        </Link>
                        <button onClick={handleDelete} className="delete-task-button">Delete Task</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetails;
