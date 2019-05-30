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

class ModalEditBangDiem extends Component {
    constructor(props){
        super(props)

        this.state = {
            tenMon: "",
            diem: 0,
            phach: 0,
            id: ""
        }
    }

    clickEditBangDiem = (event) => {
        event.preventDefault()

        axios.put(`${url}web/diemthi/${this.state.id}`, {
            mon: this.state.tenMon,
            diem: this.state.diem,
            phach: this.state.phach
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Sửa điểm thi thành công!")
            }else{
                alert(result.message)
            }

            this.props.closeModalEditBangDiem()
            this.props.getAllBangDiem()
        })
        .catch((err) => {
            alert("Sửa điểm thi thất bại!")
            console.log(err)
        })
    }

    onChangeTenMon = (event) => {
        this.setState({tenMon: event.target.value})
    }

    onChangeDiem = (event) => {
        if(Number(event.target.value) >= 0 && Number(event.target.value) <= 10){
            this.setState({diem: Number(event.target.value)})
        }
    }

    onChangePhach = (event) => {
        this.setState({phach: Number(event.target.value)})
    }

    componentDidMount = () => {
        this.props.onRef(this)
    }

    setDataBangDiem = (data) => {
        try{
            this.setState({
                tenMon: data.mon,
                diem: data.diem,
                phach: data.phach,
                id: data._id
            })
        }catch(err){
            console.log(err)
        }
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { tenMon, diem, phach } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalEditBangDiem}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Sửa Ngành Thi</h3>
                    </div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="ten-mon"
                            label="Tên Môn"
                            value={tenMon}
                            onChange={this.onChangeTenMon}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="diem"
                            label="Điểm"
                            value={diem}
                            onChange={this.onChangeDiem}
                            className={classes.textField}
                            type="number"
                            margin="normal"
                            variant="outlined"
                        />
                    </form>

                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalEditBangDiem"
                            onClick={this.props.closeModalEditBangDiem}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#editBangDiem"
                            onClick={this.clickEditBangDiem}
                        >
                            Sửa
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalEditBangDiem)