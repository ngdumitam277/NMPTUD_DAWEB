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

class ModalEditNganhKhoi extends Component {
    constructor(props){
        super(props)

        this.state = {
            tenKhoi: "",
            diemChuan: 0,
            id: ""
        }
    }

    clickEditKhoiThi = (event) => {
        event.preventDefault()

        axios.put(`${url}web/nganhkhoi/${this.state.id}`, {
            tenKhoi: this.state.tenKhoi,
            diemChuan: this.state.diemChuan,
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Sửa khối thi thành công!")
            }else{
                alert(result.message)
            }

            this.props.closeModalEditKhoiThi()
            this.props.getAllNganhThi()
        })
        .catch((err) => {
            alert("Sửa khối thi thất bại!")
            console.log(err)
        })
    }

    onChangeTenKhoi = (event) => {
        this.setState({tenKhoi: event.target.value})
    }

    onChangeDiemChuan = (event) => {
        let diemChuan = Number(event.target.value)

        if(diemChuan >= 0 && diemChuan <= 100){
            this.setState({diemChuan: diemChuan})
        }
    }

    componentDidMount = () => {
        this.props.onRef(this)
    }

    setDataKhoiThi = (data) => {
        try{
            this.setState({
                tenKhoi: data.tenKhoi,
                diemChuan: data.diemChuan,
                id: data._id
            })
        }catch(err){
            console.log(err)
        }
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { tenKhoi, diemChuan } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalEditNganhKhoi}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Sửa Khối Thi</h3>
                    </div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="ten-khoi"
                            label="Tên Khối"
                            value={tenKhoi}
                            onChange={this.onChangeTenKhoi}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="diem-chuan"
                            label="Điểm chuẩn"
                            value={diemChuan}
                            type="number"
                            onChange={this.onChangeDiemChuan}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </form>

                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalEditNganhKhoi"
                            onClick={this.props.closeModalEditKhoiThi}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themKhoiThi"
                            onClick={this.clickEditKhoiThi}
                        >
                            Sửa
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalEditNganhKhoi)