import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:8080/api/tasks') 
                .then(response => {
                    setTasks(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(`Error fetching tasks: ${error.message}`);
                    setLoading(false);
                });
        }, 1000);
    }, []);

    return (
        <div className="all-tasks-container">
            <h1 className="all-tasks-title">All Tasks</h1>
            {loading && <p className="loading">Loading...</p>}
            {!loading && !error && (
                <>
                    {tasks.length === 0 ? (
                        <p className="no-tasks-message">No tasks available</p>
                    ) : (
                        <ul className="task-list">
                            {tasks.map((task) => (
                                <li key={task.id} className="task-item">
                                    <Link to={`/task-details/${task.id}`} className="task-link">
                                        {task.title} - Click here to see details
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default AllTasks;

