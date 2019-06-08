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

class ModalEditQuyChe extends Component {
    constructor(props){
        super(props)

        this.state = {
            maKhuVuc: "",
            diemCong: 0
        }
    }

    clickEditQuyChe = (event) => {
        event.preventDefault()

        axios.put(`${url}web/khuvuc/${this.state.maKhuVuc}`, {
            diemCong: this.state.diemCong
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Sửa quy chế thành công!")
            }else{
                alert(result.message)
            }

            this.props.closeModalEditQuyChe()
            this.props.getAllQuyChe()
        })
        .catch((err) => {
            alert("Sửa quy chế thất bại!")
            console.log(err)
        })
    }

    onChangeMaKhuVuc = (event) => {
        this.setState({maKhuVuc: event.target.value})
    }

    onChangeDiemCong = (event) => {
        if(Number(event.target.value) >= 0 && Number(event.target.value) <= 10){
            this.setState({diemCong: Number(event.target.value)})
        }
    }

    componentDidMount = () => {
        this.props.onRef(this)
    }

    setDataQuyChe = (data) => {
        try{
            this.setState({
                maKhuVuc: data.maKhuVuc,
                diemCong: data.diemCong
            })
        }catch(err){
            console.log(err)
        }
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { maKhuVuc, diemCong } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalEditQuyChe}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Sửa Ngành Thi</h3>
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
                            onChange={this.onChangeDiemCong}
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
                            href="#huyModalEditQuyChe"
                            onClick={this.props.closeModalEditQuyChe}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themNganhThi"
                            onClick={this.clickEditQuyChe}
                        >
                            Sửa
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalEditQuyChe)