import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    //https://event-management-backend-self.vercel.app
    setLoading(true);
    try {
      const response = await fetch("https://event-management-backend-self.vercel.app/api/EVENT/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comments }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to submit feedback.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        {success ? (
          <div className="feedback-success">
            <h2>🎉 Thank You!</h2>
            <p>Your feedback helps make Vistora better.</p>
            <p className="redirect-text">Returning to home...</p>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <h2>Rate Your Experience</h2>
            <p className="feedback-subtitle">Let me know what you think of Vistora!</p>

            <div className="input-group">
              <label>Your Name *</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="rating-text">
              {rating === 0 ? "Select a rating" : rating === 5 ? "Loved it!" : rating >= 3 ? "It was okay" : "Needs improvement"}
            </p>

            <div className="input-group">
              <label>Tell me more (Optional)</label>
              <textarea
                placeholder="What did you like? What can be improved?"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => navigate('/home')}>Cancel</button>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Submitting..." : "Send Feedback"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
