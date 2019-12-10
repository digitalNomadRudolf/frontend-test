import React from 'react';
import { CSSTransition } from 'react-transition-group';

const FadeAnims = FadePage => {
    return props => 

    <CSSTransition 
        transitionAppear={true}
        transitionName="fadein"
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>

        <FadePage {...props} />

        </CSSTransition>
}

export default FadeAnims;