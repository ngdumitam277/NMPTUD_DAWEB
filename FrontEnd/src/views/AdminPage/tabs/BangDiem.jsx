import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
import InputLabel from "@material-ui/core/InputLabel";
import axios from 'axios'
import { url } from 'variable/general.jsx'
import ModalAddBangDiem from '../modals/ModalAddBangDiem';
import ModalEditBangDiem from '../modals/ModalEditBangDiem';

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

class TableDiem extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

TableDiem.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TableDiemWrapped = withStyles(actionsStyles, { withTheme: true })(
    TableDiem,
);

let counter = 0;
function createData(mon, phach, diem) {
    counter += 1;
    return { id:counter, mon, phach, diem};
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class BangDiem extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: [],
            page: 0,
            rowsPerPage: 5,
            isModalAddBangDiem: false,
            isModalEditBangDiem: false
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    getAllBangDiem = () => {
        axios.get(`${url}web/diemthi`)
        .then((result) => {
            let data = result.data

            this.setState({data: data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getAllBangDiem()
    }

    setModalAddBangDiem = (isModal) => this.setState({isModalAddBangDiem: isModal})

    openModalAddBangDiem = (event) => {
        event.preventDefault()
        this.setModalAddBangDiem(true)
    }

    closeModalAddBangDiem = () => {
        this.setModalAddBangDiem(false)
    }

    setModalEditBangDiem = (isModal) => this.setState({isModalEditBangDiem: isModal})

    openModalEditBangDiem = (data) => {
        this.modalEditBangDiemRef.setDataBangDiem(data)
        this.setModalEditBangDiem(true)
    }

    closeModalEditBangDiem = () => {
        this.setModalEditBangDiem(false)
    }

    onRefModalEditBangDiem = (ref) => this.modalEditBangDiemRef = ref

    render() {
        const { classes } = this.props;
        const { data, rowsPerPage, page, isModalAddBangDiem, isModalEditBangDiem } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div className={classes.container}>
                <Paper className={classes.root}>
                    <div className={classes.title}>
                        <h4>Danh sách điểm</h4>
                    </div>
                    <div className={classes.tableWrapper}>

                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Môn</TableCell>
                                    <TableCell align="right">Phách</TableCell>
                                    <TableCell align="right">Điểm</TableCell>
                                    <TableCell align="right">Điểm phúc khảo</TableCell>
                                    <TableCell align="right">Tùy chỉnh</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.mon}
                                        </TableCell>
                                        <TableCell align="right">{row.Phach}</TableCell>
                                        <TableCell align="right">{row.diem}</TableCell>
                                        <TableCell align="right">{row.diemPK === "" ? "Chưa có" : row.diemPK}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => this.openModalEditBangDiem(row)} variant="contained" color="primary" className={classes.button}>
                                                Sửa
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 48 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TableDiemWrapped}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>

                <ModalAddBangDiem isModal={isModalAddBangDiem} 
                    closeModalAddBangDiem={this.closeModalAddBangDiem}
                    getAllBangDiem={this.getAllBangDiem}/>

                <ModalEditBangDiem isModal={isModalEditBangDiem} 
                    onRef={this.onRefModalEditBangDiem}
                    closeModalEditBangDiem={this.closeModalEditBangDiem}
                    getAllBangDiem={this.getAllBangDiem}/>
            </div>
        );
    }
}

BangDiem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BangDiem);