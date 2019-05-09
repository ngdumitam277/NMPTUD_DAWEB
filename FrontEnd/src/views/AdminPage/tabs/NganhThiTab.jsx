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
import ModalDeleteNganhThi from '../modals/ModalDeleteNganhThi';
import ModalEditNganhThi from '../modals/ModalEditNganhThi';
import ModalAddNganhThi from '../modals/ModalAddNganhThi';

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

class NganhThiTab extends PureComponent {
    constructor(props){
        super(props)

        this.state = {
            data: [],
            isModalAddNganhThi: false,
            isModalEditNganhThi: false,
            isModalDeleteNganhThi: false
        }

        this.modalEditNganhThiRef = React.createRef()
        this.modalDeleteNganhThiRef = React.createRef()
    }

    getAllNganhThi = () => {
        axios.get(`${url}web/nganh`)
        .then((response) => {
            let result = response.data
            this.setState({data: result})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getAllNganhThi()
    }

    setModalAddNganhThi = (isModal) => this.setState({isModalAddNganhThi: isModal})

    openModalAddNganhThi = (event) => {
        event.preventDefault()
        this.setModalAddNganhThi(true)
    }

    closeModalAddNganhThi = () => {
        this.setModalAddNganhThi(false)
    }

    setModalEditNganhThi = (isModal) => this.setState({isModalEditNganhThi: isModal})

    openModalEditNganhThi = (data) => {
        this.modalEditNganhThiRef.setDataNganhThi(data)
        this.setModalEditNganhThi(true)
    }

    closeModalEditNganhThi = () => {
        this.setModalEditNganhThi(false)
    }

    setModalDeleteNganhThi = (isModal) => this.setState({isModalDeleteNganhThi: isModal})

    openModalDeleteNganhThi = (data) => {
        this.modalDeleteNganhThiRef.setDataNganhThi(data)
        this.setModalDeleteNganhThi(true)
    }

    closeModalDeleteNganhThi = () => {
        this.setModalDeleteNganhThi(false)
    }

    onRefModalDeleteNganhThi = (ref) => this.modalDeleteNganhThiRef = ref

    onRefModalEditNganhThi = (ref) => this.modalEditNganhThiRef = ref
    
    render() {
        const { classes, ...rest } = this.props;
        let { data, isModalAddNganhThi, isModalEditNganhThi, isModalDeleteNganhThi } = this.state

        return (
            <Paper className={classes.root}>
                <Button
                    href="#addNganhThi"
                    onClick={this.openModalAddNganhThi}
                >
                    Thêm ngành thi
                </Button>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Ngành</TableCell>
                        <TableCell className={classes.textCenter}>Chỉ tiêu ngành</TableCell>
                        <TableCell className={classes.textCenter}>Thông tin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                    <TableRow className={classes.row} key={index}>
                        <TableCell component="th" scope="row">{row.maNganh}</TableCell>
                        <TableCell className={classes.textCenter}>{row.chiTieuNganh}</TableCell>
                        <TableCell className={classes.textCenter}>{row.thongTin}</TableCell>
                        <Fab onClick={() => this.openModalEditNganhThi(row)} color="primary" aria-label="Edit" className={classes.fab}>
                            <Icon>edit_icon</Icon>
                        </Fab>
                        <Fab onClick={() => this.openModalDeleteNganhThi(row)} color="secondary" aria-label="Delete" className={classes.fab}>
                            <DeleteIcon/>
                        </Fab>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>

                <ModalAddNganhThi isModal={isModalAddNganhThi} 
                    closeModalAddNganhThi={this.closeModalAddNganhThi}
                    getAllNganhThi={this.getAllNganhThi}/>

                <ModalEditNganhThi isModal={isModalEditNganhThi} 
                    onRef={this.onRefModalEditNganhThi}
                    closeModalEditNganhThi={this.closeModalEditNganhThi}
                    getAllNganhThi={this.getAllNganhThi}/>
                
                <ModalDeleteNganhThi isModal={isModalDeleteNganhThi} 
                    onRef={this.onRefModalDeleteNganhThi}
                    closeModalDeleteNganhThi={this.closeModalDeleteNganhThi}
                    getAllNganhThi={this.getAllNganhThi}/>
            </Paper>
        )
    }
}

export default withStyles(styles)(NganhThiTab)
