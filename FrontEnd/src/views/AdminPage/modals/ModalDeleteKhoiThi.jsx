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
import moment from 'moment';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
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

class ModalDeleteKhoiThi extends Component {
    constructor(props){
        super(props)

        this.state = {
            tenKhoi: "",
            diemTBkhoi: "",
            slThiSinh: "",
            key: ""
        }
    }

    clickDeleteKhoiThi = (event) => {
        event.preventDefault()

        axios.delete(`${url}web/khoi/${this.state.key}`)
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                axios.delete(`${url}web/delete/multiple/khoimon/${this.state.tenKhoi}`)
                .then((result) => {
                    let data = result.data

                    if(data.message === "ok"){
                        alert("Xoá khối thi thành công!")

                        this.props.closeModalDeleteKhoiThi()
                        this.props.getAllKhoiThi()
                    }else{
                        alert(result.message)
                    }
                })
            }else{
                alert(result.message)
            }
        })
        .catch((err) => {
            alert("Xoá khối thi thất bại!")
            console.log(err)
        })
    }

    setDataKhoiThi = (data) => {
        try{
            this.setState({
                tenKhoi: data.tenKhoi,
                diemTBkhoi: data.diemTBkhoi,
                slThiSinh: data.slThiSinh,
                key: data.key
            })
        }catch(err){
            console.log(err)
        }
    }

    componentDidMount = () => {
        this.props.onRef(this)
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { tenKhoi } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalDeleteKhoiThi}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Xoá Khối Thi</h3>
                    </div>
                    <Typography variant="h6" gutterBottom>
                        {`Bạn có chắc chắn muốn xoá khối thi là ${tenKhoi} này không?`}
                    </Typography>

                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalDeleteKhoiThi"
                            onClick={this.props.closeModalDeleteKhoiThi}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#xoaKhoiThi"
                            onClick={this.clickDeleteKhoiThi}
                        >
                            Xoá
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalDeleteKhoiThi)