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

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

class HistoryTable extends React.Component {
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

HistoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const HistoryTableWrapped = withStyles(actionsStyles, { withTheme: true })(
    HistoryTable,
);

let counter = 0;
function createData(phach, mon, diemCu, diemMoi, ngNhap, thoiGian, loai) {
    counter += 1;
    return { id: counter, phach, mon, diemCu, diemMoi, ngNhap, thoiGian, loai };
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

class CustomPaginationActionsTable extends React.Component {
    state = {
        rows: [
            createData('P001', "Lý", 3.7, 10, "AD001", "20-12-2012", "sửa"),
            createData('P001', "Lý", 3.7, 10, "AD001", "20-12-2012", "sửa"),
            createData('P001', "Lý", 3.7, 10, "AD001", "20-12-2012", "sửa"),
            createData('P001', "Lý", 3.7, 10, "AD001", "20-12-2012", "sửa"),
            createData('P001', "Lý", 3.7, 10, "AD001", "20-12-2012", "sửa"),
            createData('P001', "Lý", 3.7, 10, "AD001", "20-12-2012", "sửa"),
            createData('P001', "Lý", 3.7, 10, "AD001", "20-12-2012", "sửa")
        ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
        page: 0,
        rowsPerPage: 5,
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                 <div className={classes.title}>
                  <h4>Danh sách lịch sử</h4>
                </div>
                <div className={classes.tableWrapper}>

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Phách</TableCell>
                                <TableCell align="right">Môn</TableCell>
                                <TableCell align="right">Điểm cũ</TableCell>
                                <TableCell align="right">Điểm mới</TableCell>
                                <TableCell align="right">Người nhập</TableCell>
                                <TableCell align="right">Thời gian nhập</TableCell>
                                <TableCell align="right">Loại</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.phach}
                                    </TableCell>
                                    <TableCell align="right">{row.mon}</TableCell>
                                    <TableCell align="right">{row.diemCu}</TableCell>
                                    <TableCell align="right">{row.diemMoi}</TableCell>
                                    <TableCell align="right">{row.ngNhap}</TableCell>
                                    <TableCell align="right">{row.thoiGian}</TableCell>
                                    <TableCell align="right">{row.loai}</TableCell>
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
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={HistoryTableWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);