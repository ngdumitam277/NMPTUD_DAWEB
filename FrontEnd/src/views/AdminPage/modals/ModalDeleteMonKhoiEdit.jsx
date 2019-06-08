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

class ModalDeleteMonKhoiEdit extends Component {
    constructor(props){
        super(props)

        this.state = {
            tenMon: "",
            keyMon: ""
        }
    }

    clickDeleteMonThi = (event) => {
        event.preventDefault()

        let keyMon = this.state.keyMon
        let tenKhoi = this.props.tenKhoi

        axios.delete(`${url}web/delete/khoimon/${tenKhoi}/${keyMon}`)
        .then((result) => {
            let data = result.data

            if(data.message === "ok"){
                alert("Xoá môn thành công!!!")

                this.props.getAllMonKhoi()
                this.props.closeModalDeleteMonKhoiEdit()
            }else{
                alert(data.message)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    setDataMonThi = (data) => {
        try{
            this.setState({
                tenMon: data.tenMon,
                keyMon: data.keyMon
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
        let { tenMon } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalDeleteMonKhoiEdit}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Xoá Môn Thi</h3>
                    </div>
                    <Typography variant="h6" gutterBottom>
                        {`Bạn có chắc chắn muốn xoá môn thi là ${tenMon} này không?`}
                    </Typography>

                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalDeleteMonKhoiEdit"
                            onClick={this.props.closeModalDeleteMonKhoiEdit}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#xoaMonThi"
                            onClick={this.clickDeleteMonThi}
                        >
                            Xoá
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalDeleteMonKhoiEdit)