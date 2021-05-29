import React from 'react';
import './styles.css';

const LabelContainer = ({children, width}) => {

    return <label className={"container"} style={{width: width ? width : '480px'}}>
        {children}
    </label>
}

export default LabelContainer;


