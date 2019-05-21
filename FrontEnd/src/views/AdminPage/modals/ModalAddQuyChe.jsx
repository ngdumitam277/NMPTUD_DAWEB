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

class ModalAddQuyChe extends Component {
    constructor(props){
        super(props)

        this.state = {
            maKhuVuc: "",
            diemCong: 0
        }
    }

    clickAddQuyChe = (event) => {
        event.preventDefault()

        axios.post(`${url}web/create/khuvuc`, {
            maKhuVuc: this.state.maKhuVuc,
            diemCong: this.state.diemCong
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Tạo khu vực thành công!")
            }else{
                alert(result.message)
            }

            this.props.getAllQuyChe()
        })
        .catch((err) => {
            alert("Tạo khu vực thất bại!")
            console.log(err)
        })
    }

    onChangeMaKhuVuc = (event) => {
        this.setState({maKhuVuc: event.target.value})
    }

    onChangediemCong = (event) => {
        if(event.target.value >= 0 && event.target.value <= 99){
            this.setState({diemCong: event.target.value})
        }
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { maKhuVuc, diemCong } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalAddQuyChe}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Thêm Quy Chế</h3>
                    </div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="ten-khu-vuc"
                            label="Tên Khu Vực"
                            value={maKhuVuc}
                            onChange={this.onChangeMaKhuVuc}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="diem-cong"
                            label="Điểm Cộng"
                            value={diemCong}
                            onChange={this.onChangediemCong}
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
                            href="#huyModalAddQuyChe"
                            onClick={this.props.closeModalAddQuyChe}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themNganhThi"
                            onClick={this.clickAddQuyChe}
                        >
                            Thêm
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalAddQuyChe)