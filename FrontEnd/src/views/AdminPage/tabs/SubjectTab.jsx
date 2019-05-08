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
import ModalAddMonThi from '../modals/ModalAddMonThi';
import ModalEditMonThi from '../modals/ModalEditMonThi';
import ModalDeleteMonThi from '../modals/ModalDeleteMonThi';

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

class SubjectTab extends PureComponent {
    constructor(props){
        super(props)

        this.state = {
            data: [],
            isModalAddMonThi: false,
            isModalEditMonThi: false,
            isModalDeleteMonThi: false
        }

        this.modalEditMonThiRef = React.createRef()
        this.modalDeleteMonThiRef = React.createRef()
    }

    getAllMonThi = () => {
        axios.get(`${url}web/mon`)
        .then((response) => {
            let result = response.data
            this.setState({data: result})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getAllMonThi()
    }

    setModalAddMonThi = (isModal) => this.setState({isModalAddMonThi: isModal})

    openModalAddMonThi = (event) => {
        event.preventDefault()
        this.setModalAddMonThi(true)
    }

    closeModalAddMonThi = () => {
        this.setModalAddMonThi(false)
    }

    setModalEditMonThi = (isModal) => this.setState({isModalEditMonThi: isModal})

    openModalEditMonThi = (data) => {
        this.modalEditMonThiRef.setDataMonThi(data)
        this.setModalEditMonThi(true)
    }

    closeModalEditMonThi = () => {
        this.setModalEditMonThi(false)
    }

    setModalDeleteMonThi = (isModal) => this.setState({isModalDeleteMonThi: isModal})

    openModalDeleteMonThi = (data) => {
        this.modalDeleteMonThiRef.setDataMonThi(data)
        this.setModalDeleteMonThi(true)
    }

    closeModalDeleteMonThi = () => {
        this.setModalDeleteMonThi(false)
    }

    onRefModalDeleteMonThi = (ref) => this.modalDeleteMonThiRef = ref

    onRefModalEditMonThi = (ref) => this.modalEditMonThiRef = ref
    
    render() {
        const { classes, ...rest } = this.props;
        let { data, isModalAddMonThi, isModalEditMonThi, isModalDeleteMonThi } = this.state

        return (
            <Paper className={classes.root}>
                <Button
                    href="#addMonThi"
                    onClick={this.openModalAddMonThi}
                >
                    Thêm môn thi
                </Button>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Môn</TableCell>
                        <TableCell className={classes.textCenter}>Điểm TB môn</TableCell>
                        <TableCell className={classes.textCenter}>Phòng thi</TableCell>
                        <TableCell className={classes.textCenter}>Thời gian thi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                    <TableRow className={classes.row} key={index}>
                        <TableCell component="th" scope="row">{row.tenMon}</TableCell>
                        <TableCell className={classes.textCenter}>{row.diemTBmon}</TableCell>
                        <TableCell className={classes.textCenter}>{row.phongThi}</TableCell>
                        <TableCell className={classes.textCenter}>{moment(row.tgThi).format("DD-MM-YYYY")}</TableCell>
                        <Fab onClick={() => this.openModalEditMonThi(row)} color="primary" aria-label="Edit" className={classes.fab}>
                            <Icon>edit_icon</Icon>
                        </Fab>
                        <Fab onClick={() => this.openModalDeleteMonThi(row)} color="secondary" aria-label="Delete" className={classes.fab}>
                            <DeleteIcon/>
                        </Fab>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>

                <ModalAddMonThi isModal={isModalAddMonThi} 
                    closeModalAddMonThi={this.closeModalAddMonThi}
                    getAllMonThi={this.getAllMonThi}/>

                <ModalEditMonThi isModal={isModalEditMonThi} 
                    onRef={this.onRefModalEditMonThi}
                    closeModalEditMonThi={this.closeModalEditMonThi}
                    getAllMonThi={this.getAllMonThi}/>
                
                <ModalDeleteMonThi isModal={isModalDeleteMonThi} 
                    onRef={this.onRefModalDeleteMonThi}
                    closeModalDeleteMonThi={this.closeModalDeleteMonThi}
                    getAllMonThi={this.getAllMonThi}/>
            </Paper>
        )
    }
}

export default withStyles(styles)(SubjectTab)
