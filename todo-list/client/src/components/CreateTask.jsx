import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/tasks", { title, description });
            setMessage("Task created successfully!");
            setError("");
            setTitle("");
            setDescription("");
            navigate('/');
        } catch (error) {
            setError(`Task Creation Failed: ${error.message}`);
            setMessage("");
        }
    };

    return (
        <div className="create-task-container">
            <h2 className="create-task-title">Create Task</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form className="create-task-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    className="create-task-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    className="create-task-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button type="submit" className="create-task-button">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;
