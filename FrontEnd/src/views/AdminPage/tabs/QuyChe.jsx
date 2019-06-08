import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
import InputLabel from "@material-ui/core/InputLabel";
import axios from 'axios'
import { url } from 'variable/general.jsx'
import ModalAddQuyChe from '../modals/ModalAddQuyChe';
import ModalDeleteQuyChe from '../modals/ModalDeleteQuyChe';
import ModalEditQuyChe from '../modals/ModalEditQuyChe';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(name, diem) {
    id += 1;
    return { id, name, diem };
}

class QuyChe extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: [],
            isModalAddQuyChe: false,
            isModalDeleteQuyChe: false,
            isModalEditQuyChe: false
        }
    }

    getAllQuyChe = () => {
        axios.get(`${url}web/khuvuc`)
        .then((result) => {
            let data = result.data

            this.setState({data: data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getAllQuyChe()
    }

    setModalAddQuyChe = (isModal) => this.setState({isModalAddQuyChe: isModal})

    openModalAddQuyChe = (event) => {
        event.preventDefault()
        this.setModalAddQuyChe(true)
    }

    closeModalAddQuyChe = () => {
        this.setModalAddQuyChe(false)
    }

    setModalEditQuyChe = (isModal) => this.setState({isModalEditQuyChe: isModal})

    openModalEditQuyChe = (data) => {
        this.modalEditQuyCheRef.setDataQuyChe(data)
        this.setModalEditQuyChe(true)
    }

    closeModalEditQuyChe = () => {
        this.setModalEditQuyChe(false)
    }

    setModalDeleteQuyChe = (isModal) => this.setState({isModalDeleteQuyChe: isModal})

    openModalDeleteQuyChe = (data) => {
        this.modalDeleteQuyCheRef.setDataQuyChe(data)
        this.setModalDeleteQuyChe(true)
    }

    closeModalDeleteQuyChe = () => {
        this.setModalDeleteQuyChe(false)
    }

    onRefModalDeleteQuyChe = (ref) => this.modalDeleteQuyCheRef = ref

    onRefModalEditQuyChe = (ref) => this.modalEditQuyCheRef = ref

    render() {
        const { data, isModalAddQuyChe, isModalDeleteQuyChe, isModalEditQuyChe } = this.state
        const { classes } = this.props;

        return (
            <div className={classes.container}>
            <div className={classes.title}>
                <h3>Quản lý quy chế</h3>
            </div>
            <Button onClick={this.openModalAddQuyChe} variant="contained" color="green" className={classes.button}>
                <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
                    add_circle
            </Icon>
            </Button>
            &nbsp;
            <InputLabel className={classes.label}>
                    Thêm Khu Vực
            </InputLabel>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên khu vực</TableCell>
                            <TableCell align="right">Điểm</TableCell>
                            <TableCell align="right">Tùy chỉnh</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.maKhuVuc}
                                </TableCell>
                                <TableCell align="right">{row.diemCong}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => this.openModalDeleteQuyChe(row)} variant="contained" color="secondary" className={classes.button}>
                                        Xóa
                                    </Button>
                                    &nbsp;
                                    <Button onClick={() => this.openModalEditQuyChe(row)} variant="contained" color="primary" className={classes.button}>
                                        Sửa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <ModalAddQuyChe isModal={isModalAddQuyChe} 
                closeModalAddQuyChe={this.closeModalAddQuyChe}
                getAllQuyChe={this.getAllQuyChe}/>

            <ModalEditQuyChe isModal={isModalEditQuyChe} 
                onRef={this.onRefModalEditQuyChe}
                closeModalEditQuyChe={this.closeModalEditQuyChe}
                getAllQuyChe={this.getAllQuyChe}/>
            
            <ModalDeleteQuyChe isModal={isModalDeleteQuyChe} 
                onRef={this.onRefModalDeleteQuyChe}
                closeModalDeleteQuyChe={this.closeModalDeleteQuyChe}
                getAllQuyChe={this.getAllQuyChe}/>
        </div>
        )
    }
}

QuyChe.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuyChe);