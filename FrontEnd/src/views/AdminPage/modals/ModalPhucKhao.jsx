import React, { Component } from 'react'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import axios from 'axios'
import { url } from 'variable/general.jsx'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      width: 400,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 68,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflow:'scroll'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    ...componentsStyle
});

class ModalPhucKhao extends Component {
    constructor(props){
        super(props)
        this.state = {
            diemPhucKhao:'',
        }
    }



    render() {
        let { isModal, classes, ...rest } = this.props
        console.log("AAAAA==="+isModal)
        return (
            <Modal 
                open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Phúc khảo</h3>
                    </div>
                    <form className={classes.container}>
                        <div>
                        <label>Bạn đang phúc khảo môn: Lý</label>
                        </div>
                        
                        <TextField
                            id="a"
                            type="number"
                            label="Nhập số điểm"
                            value={this.state.diemPhucKhao}
                            onChange={(e) => { this.setState({diemPhucKhao: e.target.value})}}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </form>
                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalAddNganhKhoi"
                            onClick={this.props.closeModalPhucKhao}
                        >
                            Huỷ
                        </Button>
                        <Button
                             color="primary"
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themKhoiThi"
                        >
                            Đồng ý
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalPhucKhao)