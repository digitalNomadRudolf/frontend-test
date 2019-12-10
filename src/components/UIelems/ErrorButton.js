import React from 'react'

export default function ErrorButton(props) {
        
    let btn = '';

    if(props.onBtnClick && props.btnText){
        btn = <button style={{height:'40px'}} className='notify-btn ml-3 btn btn-outline-light' onClick={props.onBtnClick}>{props.btnText}</button>
    }
    

    return (  
        <div className={"mt-5 notify alert alert-dismissible fade show " + (props.color ? 'alert-'+props.color : '')}>
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <div className='row'>
                <p className='ml-3 mt-2'>{props.message}</p>
                {btn}
            </div>
        </div>
    );
}
