import React, { useState } from 'react';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, username }) => {
    const [inputValue, setInputValue] = useState('');

    if (!isOpen) {
        return null;
    }

    const isConfirmationMatching = inputValue === username;

    const handleConfirm = () => {
        if (isConfirmationMatching) {
            onConfirm();
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Delete Account</h2>
                <p className="delete-warning">
                    This action is irreversible. All your subjects and attendance data will be permanently deleted.
                </p>
                <p>
                    To confirm, please type your username: <span className="username-display-box">{username}</span>
                </p>

                <input
                    type="text"
                    className="delete-confirm-input"
                    placeholder="Type your username here"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                />

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="delete-account-btn"
                        onClick={handleConfirm}
                        disabled={!isConfirmationMatching}
                    >
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;