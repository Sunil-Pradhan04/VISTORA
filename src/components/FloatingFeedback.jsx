import { Link } from 'react-router-dom';
import './FloatingFeedback.css';

const FloatingFeedback = () => {
  return (
    <Link to="/feedback" className="floating-feedback-btn">
      <div className="feedback-content">
        <span className="feedback-icon">💬</span>
        <span className="feedback-text">Feedback</span>
      </div>
    </Link>
  );
};

export default FloatingFeedback;
