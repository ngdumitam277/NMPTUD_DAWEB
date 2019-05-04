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

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});
class CourseTable extends React.Component {
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
      <div style={{width:400}} classname={classes.root}>
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

CourseTable.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const CourseTableWrapped = withStyles(actionsStyles, { withTheme: true })(
  CourseTable,
);

let counter = 0;
function createData(userName, hoTen, ngaySinh, cmnd, ngayDk, maCB, ngayGioCB, trangThai) {
  counter += 1;
  return { id: counter, userName, hoTen, ngaySinh, cmnd, ngayDk, maCB, ngayGioCB, trangThai };
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

class InfoStudentManageTab extends React.Component {
  state = {
    rows: [
      createData("tamsansi", "Tâm", "27/07/94", "025802254", "03/07/2013","CB1","05/04/2019","Xác nhận"),
      createData("tamsansi", "Tâm", "27/07/94", "025802254", "03/07/2013","CB2","05/04/2019", "Chưa xác nhận"),
      createData("tamsansi", "Tâm", "27/07/94", "025802254", "03/07/2013","CB3","05/04/2019","Xác nhận"),
      createData("tamsansi", "Tâm", "27/07/94", "025802254", "03/07/2013","CB4","05/04/2019","Chưa xác nhận"),
      createData("tamsansi", "Tâm", "27/07/94", "025802254", "03/07/2013","CB5","05/04/2019", "Chưa xác nhận"),
      createData("tamsansi", "Tâm", "27/07/94", "025802254", "03/07/2013","CB6","05/04/2019", "Chưa xác nhận"),
      createData("tamsansi", "Tâm", "27/07/94", "025802254", "03/07/2013","CB7","05/04/2019", "Chưa xác nhận"),
      createData("tamsansi", "Tâm", "27/07/94", "025802254", "03/07/2013","CB8","05/04/2019", "Chưa xác nhận"),

    ].sort((a, b) => (a.ngayDK < b.ngayDk ? -1 : 1)),
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
      <Paper classname={classes.root}>
        <div classname={classes.tableWrapper}>
          <Table classname={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Họ tên</TableCell>
                <TableCell align="right">Ngày sinh</TableCell>
                <TableCell align="right">Số CMND</TableCell>
                <TableCell align="right">Ngày đăng ký</TableCell>
                <TableCell align="right">Mã CB(Hủy/Xác nhận)</TableCell>
                <TableCell align="right">Ngày giờ(Hủy/Xác nhận)</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Tùy chỉnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.userName}
                  </TableCell>
                  <TableCell align="right">{row.hoTen}</TableCell>
                  <TableCell align="right">{row.ngaySinh}</TableCell>
                  <TableCell align="right">{row.cmnd}</TableCell>
                  <TableCell align="right">{row.ngayDk}</TableCell>
                  <TableCell align="right">{row.maCB}</TableCell>
                  <TableCell align="right">{row.ngayGioCB}</TableCell>
                  <TableCell align="right">{row.trangThai}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="secondary" className={classes.button}>
                      Xóa 
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="primary" className={classes.button}>
                        Xác nhận
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
                  colSpan={12}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  ActionsComponent={CourseTableWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

InfoStudentManageTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoStudentManageTab);