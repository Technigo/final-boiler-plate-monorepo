import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../transitions.css';

export const Fade = ({ children, ...props }) => (
    <CSSTransition {...props} timeout={{ enter: 500, exit: 500 }} classNames="fade">
        {children}
    </CSSTransition>
);
