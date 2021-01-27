import React from 'react';

interface IButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
    canClick,
    loading,
    actionText
}) => (
    <button>
        {loading? "Loading..." : actionText}
    </button>
)