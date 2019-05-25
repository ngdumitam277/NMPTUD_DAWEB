import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TKNganh_Table from './TKNganh_Table';
import axios from 'axios'
import { url } from 'variable/general.jsx'

class TKNganh extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        axios.get(`${url}web/thongke/nganh`)
        .then((result) => {
            let data = result.data

            if(data.length > 0){
                this.setState({data: data})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

  render() {
    const { classes } = this.props;
    let { data } = this.state

    return (
        <>
            {data.map((row, i) =>
                <TKNganh_Table key={i} data={row}/>
            )}
        </>
    )
  }
}

export default TKNganh;