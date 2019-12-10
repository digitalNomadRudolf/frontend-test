import React from 'react';
import '../../styles/loading.css';

export default function Loading(props) {
    return (
        <div style={props.visible ? {display:'block'} : {display:'none'}} className='loading'>
        <div className="cssload-loader-inner">
		<div className="cssload-cssload-loader-line-wrap-wrap">
			<div className="cssload-loader-line-wrap"></div>
		</div>
		<div className="cssload-cssload-loader-line-wrap-wrap">
			<div className="cssload-loader-line-wrap"></div>
		</div>
		<div className="cssload-cssload-loader-line-wrap-wrap">
			<div className="cssload-loader-line-wrap"></div>
		</div>
		<div className="cssload-cssload-loader-line-wrap-wrap">
			<div className="cssload-loader-line-wrap"></div>
		</div>
		<div className="cssload-cssload-loader-line-wrap-wrap">
			<div className="cssload-loader-line-wrap"></div>
		</div>
	</div>
    </div>
    );
}
