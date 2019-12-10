import React from 'react';

export default function ViewToggle({view, onChange}) {
    return (
        <div className="toggle-view row mt-4">
            <strong className="mr-3">
                Toggle the list view:
            </strong>
            <div className="btn-group">
                <button type="button" onClick={() => onChange('row')} className={"btn bg-black " + (view === 'row' ? 'toggle-active' : '')}><i className="fas fa-th-list"></i></button>
                <button type="button" onClick={() => onChange('grid')} className={"btn bg-black " + (view === 'grid' ? 'toggle-active' : '')}><i className="fas fa-th"></i></button>
            </div>
        </div>
    )
}
