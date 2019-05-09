import React, { Component, PureComponent } from 'react'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'
import { url } from 'variable/general.jsx'
import Button from "components/CustomButtons/Button.jsx";
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import ModalDeleteKhoiThi from '../modals/ModalDeleteKhoiThi';
import ModalEditKhoiThi from '../modals/ModalEditKhoiThi';
import ModalAddKhoiThi from '../modals/ModalAddKhoiThi';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    fab: {
        margin: theme.spacing.unit,
    },
});

class KhoiThiTab extends PureComponent {
    constructor(props){
        super(props)

        this.state = {
            data: [],
            isModalAddKhoiThi: false,
            isModalEditKhoiThi: false,
            isModalDeleteKhoiThi: false
        }

        this.modalEditKhoiThiRef = React.createRef()
        this.modalDeleteKhoiThiRef = React.createRef()
    }

    getAllKhoiThi = () => {
        axios.get(`${url}web/khoi`)
        .then((response) => {
            let result = response.data
            this.setState({data: result})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getAllKhoiThi()
    }

    setModalAddKhoiThi = (isModal) => this.setState({isModalAddKhoiThi: isModal})

    openModalAddKhoiThi = (event) => {
        event.preventDefault()
        this.setModalAddKhoiThi(true)
    }

    closeModalAddKhoiThi = () => {
        this.setModalAddKhoiThi(false)
    }

    setModalEditKhoiThi = (isModal) => this.setState({isModalEditKhoiThi: isModal})

    openModalEditKhoiThi = (data) => {
        this.modalEditKhoiThiRef.setDataKhoiThi(data)
        this.setModalEditKhoiThi(true)
    }

    closeModalEditKhoiThi = () => {
        this.setModalEditKhoiThi(false)
    }

    setModalDeleteKhoiThi = (isModal) => this.setState({isModalDeleteKhoiThi: isModal})

    openModalDeleteKhoiThi = (data) => {
        this.modalDeleteKhoiThiRef.setDataKhoiThi(data)
        this.setModalDeleteKhoiThi(true)
    }

    closeModalDeleteKhoiThi = () => {
        this.setModalDeleteKhoiThi(false)
    }

    onRefModalDeleteKhoiThi = (ref) => this.modalDeleteKhoiThiRef = ref

    onRefModalEditKhoiThi = (ref) => this.modalEditKhoiThiRef = ref
    
    render() {
        const { classes, ...rest } = this.props;
        let { data, isModalAddKhoiThi, isModalEditKhoiThi, isModalDeleteKhoiThi } = this.state

        return (
            <Paper className={classes.root}>
                <Button
                    href="#addKhoiThi"
                    onClick={this.openModalAddKhoiThi}
                >
                    Thêm khối thi
                </Button>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Khối</TableCell>
                        <TableCell className={classes.textCenter}>Điểm TB khối</TableCell>
                        <TableCell className={classes.textCenter}>Số lượng thí sinh</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                    <TableRow className={classes.row} key={index}>
                        <TableCell component="th" scope="row">{row.tenKhoi}</TableCell>
                        <TableCell className={classes.textCenter}>{row.diemTBkhoi}</TableCell>
                        <TableCell className={classes.textCenter}>{row.slThiSinh}</TableCell>
                        <Fab onClick={() => this.openModalEditKhoiThi(row)} color="primary" aria-label="Edit" className={classes.fab}>
                            <Icon>edit_icon</Icon>
                        </Fab>
                        <Fab onClick={() => this.openModalDeleteKhoiThi(row)} color="secondary" aria-label="Delete" className={classes.fab}>
                            <DeleteIcon/>
                        </Fab>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>

                <ModalAddKhoiThi isModal={isModalAddKhoiThi} 
                    closeModalAddKhoiThi={this.closeModalAddKhoiThi}
                    getAllKhoiThi={this.getAllKhoiThi}/>

                <ModalEditKhoiThi isModal={isModalEditKhoiThi} 
                    onRef={this.onRefModalEditKhoiThi}
                    closeModalEditKhoiThi={this.closeModalEditKhoiThi}
                    getAllKhoiThi={this.getAllKhoiThi}/>
                
                <ModalDeleteKhoiThi isModal={isModalDeleteKhoiThi} 
                    onRef={this.onRefModalDeleteKhoiThi}
                    closeModalDeleteKhoiThi={this.closeModalDeleteKhoiThi}
                    getAllKhoiThi={this.getAllKhoiThi}/>
            </Paper>
        )
    }
}

export default withStyles(styles)(KhoiThiTab)
