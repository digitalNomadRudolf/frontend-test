import React from 'react';

export default function SearchInputField({ value, onChange }) {
    return (
        <div className="row flex-nowrap search-box">
            <div className="pre-input pt-2">
                <i className="fa fa-search"></i>
            </div>
            <input type="text" className="form-control" placeholder="What movie are you looking for?..." value={value} onChange={(e) => {
                const text = e.target.value;
                onChange(text);
            }} />
        </div>
    )
}
