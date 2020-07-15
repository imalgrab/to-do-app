import React, { useState } from 'react'
import { PENDING, ALL, DONE } from '../constants';

interface Props {
    filterTodos: (state: string) => void;
    numOfTodos: number;
    numOfDone: number;
}

export const TodoFilter: React.FC<Props> = ({ filterTodos, numOfDone, numOfTodos }) => {
    const [btnActive, setBtnActive] = useState(ALL);
    const pending = numOfTodos - numOfDone;
    const numInfo =
        <span>
            {btnActive === ALL ?
                (pending + '/' + numOfTodos) :
                btnActive === PENDING ?
                    pending :
                    numOfDone}
        </span>
    const buttons = [ALL, PENDING, DONE].map((state, i) =>
        <button
            key={i}
            className="waves-effect waves-light btn-flat"
            onClick={() => { filterTodos(state); setBtnActive(state); }}>{state}</button>)
    return (
        <div className="filter-wrapper">
            {buttons}
            {numInfo}
        </div>
    );
}