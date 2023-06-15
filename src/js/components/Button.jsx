import React from 'react';

function Button({ outline, className, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`button ${className ? className : ''} ${outline ? 'button--outline' : ''}`}>
            {children}
        </button>
    );
}

export default Button;
