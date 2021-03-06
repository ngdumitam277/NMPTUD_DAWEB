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

class ModalAddMonThi extends Component {
    constructor(props){
        super(props)

        this.state = {
            tenMon: "",
            phongThi: "",
            tgThi: "",
            diemTBmon: 0,
            gioThi: ""
        }
    }

    getKeyFromString(str){
        if(str === "") return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/”|“|!|@|%|^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\\/g," ");
        str = str.replace(/ + /g," ");
        str = str.replace(/ – /g," ");
        str = str.trim();
        str = str.replace(/ /g, "-");
        return str; 
    }

    clickAddMonThi = (event) => {
        event.preventDefault()

        axios.post(`${url}web/create/mon`, {
            tenMon: this.state.tenMon,
            phongThi: this.state.phongThi,
            tgThi: this.state.tgThi,
            gioThi: this.state.gioThi,
            key: this.getKeyFromString(this.state.tenMon)
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Tạo môn thi thành công!")
            }else{
                alert(result.message)
            }

            this.props.getAllMonThi()
        })
        .catch((err) => {
            alert("Tạo môn thi thất bại!")
            console.log(err)
        })
    }

    onChangeTenMon = (event) => {
        this.setState({tenMon: event.target.value})
    }

    onChangePhongThi = (event) => {
        this.setState({phongThi: event.target.value})
    }

    onChangeTGThi = (event) => {
        this.setState({tgThi: event.target.value})
    }

    onChangeGioThi = (event) => {
        let gioThi = event.target.value
        this.setState({gioThi: gioThi})
    }

    componentDidMount = () => {
        this.props.onRef(this)
    }

    setDataMonThi = () => {
       this.setState({
            tenMon: "",
            phongThi: "",
            tgThi: "",
            diemTBmon: 0,
            gioThi: ""
       })
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { tenMon, tgThi, gioThi, phongThi } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalAddMonThi}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Thêm Môn Thi</h3>
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
                            id="phong-thi"
                            label="Phòng Thi"
                            value={phongThi}
                            onChange={this.onChangePhongThi}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                       <TextField
                            id="thoi-gian-thi"
                            label="Thời Gian Thi"
                            type="date"
                            value={tgThi}
                            onChange={this.onChangeTGThi}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="gio-thi"
                            label="Giờ thi"
                            value={gioThi}
                            onChange={this.onChangeGioThi}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </form>

                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalAddMonThi"
                            onClick={this.props.closeModalAddMonThi}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themMonThi"
                            onClick={this.clickAddMonThi}
                        >
                            Thêm
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalAddMonThi)