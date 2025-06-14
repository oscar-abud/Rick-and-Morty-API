import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';

const style = {
    height: '20px',
    color: 'gray',
    transition: 'ease -in -out .3s',
    margin: '0px 5px'
}

const IconoGithub = () => {
    return (
        <FontAwesomeIcon style={style} icon={faGithub} />
    );
};

export default IconoGithub;