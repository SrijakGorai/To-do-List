import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tasks');
                setTitle(response.data.title);
                setDescription(response.data.description);
            } catch (error) {
                setError(`Error fetching task: ${error.message}`);
            }
        };
        fetchTask();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/tasks/${id}`, { title, description });
            setMessage("Task updated successfully! redirecting to Home");
            setError("");
            navigate("/");
        } catch (error) {
            setError(`Error updating task: ${error.message}`);
            setMessage("");
        }
    };

    return (
        <div className="update-task-container">
            <h2 className="update-task-title">Update Task</h2>
            {message && <p className="update-task-message success-message">{message}</p>}
            {error && <p className="update-task-message error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="update-task-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button type="submit" className="update-task-button">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;
