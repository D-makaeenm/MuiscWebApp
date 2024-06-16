import React, { useState, useEffect } from 'react';
import './feedback.css';

const Feedback = () => {
    const [feedbackType, setFeedbackType] = useState('góp ý');
    const [description, setDescription] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId === '1') {
            setIsAdmin(true);
            fetchFeedbacks();
        }
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost/WebMusic/chucnang/feedback.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFeedbacks(data.feedbacks);
            } else {
                alert('Failed to fetch feedbacks');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

        if (!userId) {
            alert('User not logged in');
            return;
        }

        try {
            const response = await fetch('http://localhost/WebMusic/chucnang/feedback.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    feedbackType: feedbackType,
                    description: description
                })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                alert('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id="feedback">
            <h1>Gửi nội dung báo lỗi hoặc góp ý tại đây</h1>
            {isAdmin ? (
                <div>
                    <h2>Feedback List</h2>
                    <table id="table_feedback">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Loại</th>
                                <th>Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback, index) => (
                                <tr key={`${feedback.userId}-${index}`}>
                                    <td>{feedback.UserName}</td>
                                    <td>{feedback.feedbackType}</td>
                                    <td>{feedback.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div id="bentren">
                        <label htmlFor="feedbackType">Loại:</label>
                        <select 
                            id="feedbackType" 
                            value={feedbackType} 
                            onChange={(e) => setFeedbackType(e.target.value)}
                        >
                            <option value="góp ý">Góp ý</option>
                            <option value="báo lỗi">Báo lỗi</option>
                        </select>
                    </div>
                    <div id="benduoi">
                        <label htmlFor="description">Mô tả:</label>
                        <textarea 
                            id="description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button id="feedback_submit" type="submit">Gửi</button>
                </form>
            )}
        </div>
    );
}

export default Feedback;
