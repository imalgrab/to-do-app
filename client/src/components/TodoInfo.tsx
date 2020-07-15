import React from 'react'

interface Props {
    count: number;
}

export const TodoInfo: React.FC<Props> = ({ count }) =>
    (
        <h2>You have {count} todos</h2>
    );