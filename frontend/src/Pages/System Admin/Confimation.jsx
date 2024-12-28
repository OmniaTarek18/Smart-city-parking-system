import './Confirmation.css';

const Confirmation = ({ message, onSuccess, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Confirmation</h3>
                <p>{message}</p>
                <div className="popup-actions">
                    <button className="confirm-button" onClick={onSuccess}>
                        Confirm
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;