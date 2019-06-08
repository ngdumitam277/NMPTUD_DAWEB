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

class ModalXacNhanStudent extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: ""
        }
    }

    clickXacNhanStudent = (event) => {
        event.preventDefault()

        axios.get(`${url}web/xacnhan/taikhoan/${this.state.username}`)
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Xác nhận tài khoản thành công!")
            }else{
                alert(result.message)
            }

            this.props.closeModalXacNhanStudent()
            this.props.getAllStudent()
        })
        .catch((err) => {
            alert("Xác nhận tài khoản thất bại!")
            console.log(err)
        })
    }

    setDataStudent = (data) => {
        try{
            this.setState({
                username: data.username
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
        let { username } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalXacNhanStudent}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Xác nhận thí sinh</h3>
                    </div>
                    <Typography variant="h6" gutterBottom>
                        {`Bạn có chắc chắn muốn xác nhận thí sính có username là ${username} này không?`}
                    </Typography>

                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalXacNhanStudent"
                            onClick={this.props.closeModalXacNhanStudent}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#xoaStudent"
                            onClick={this.clickXacNhanStudent}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalXacNhanStudent)