import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TKNganh_Table from './TKNganh_Table';

function TKNganh(props) {
    const { classes } = props;

    return (
        <>
            {Array.from(new Array(5)).map((_, i) =>
                <TKNganh_Table key={i} data="Truyen data vào đây"/>
            )}
        </>
    );
}

export default TKNganh;