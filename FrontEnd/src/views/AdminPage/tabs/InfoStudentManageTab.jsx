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
import axios from 'axios'
import { url } from 'variable/general.jsx'
import moment from 'moment';
import ModalDeleteStudent from '../modals/ModalDeleteStudent';

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
  constructor(props){
    super(props)

    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 5,
      isModalDeleteStudent: false
    }

    this.modalDeleteStudentRef = React.createRef()
  }

  getAllStudent = () => {
    axios.get(`${url}web/taikhoan/thisinh`)
    .then((result) => {
      let data = result.data

      if(data.length > 0){
        this.setState({data: data})
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentDidMount = () => {
    this.getAllStudent()
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  setModalDeleteStudent = (isModal) => this.setState({isModalDeleteStudent: isModal})

  openModalDeleteStudent = (data) => {
    this.modalDeleteStudentRef.setDataStudent(data)
    this.setModalDeleteStudent(true)
  }

  closeModalDeleteStudent = () => {
    this.setModalDeleteStudent(true)
  }

  onRefModalDeleteStudent = (ref) => this.modalDeleteStudentRef = ref

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page, data, isModalDeleteStudent } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
                <TableCell align="right">Dân tộc</TableCell>
                <TableCell align="right">Địa chỉ</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Giới tính</TableCell>
                <TableCell align="right">Nơi sinh</TableCell>
                <TableCell align="right">Tình trạng</TableCell>
                <TableCell align="right">Tùy chỉnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="right">{row.hTen}</TableCell>
                  <TableCell align="right">{moment(row.ngSinh).format("DD/MM/YYYY")}</TableCell>
                  <TableCell align="right">{row.soCMND}</TableCell>
                  <TableCell align="right">{moment(row.createdAt).format("DD/MM/YYYY")}</TableCell>
                  <TableCell align="right">{row.danToc}</TableCell>
                  <TableCell align="right">{row.diaChi}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.gioiTinh}</TableCell>
                  <TableCell align="right">{row.noiSinh}</TableCell>
                  <TableCell align="right">{Number(row.tinhTrang)}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => this.openModalDeleteStudent(row)} variant="contained" color="secondary" className={classes.button}>
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
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  ActionsComponent={CourseTableWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>

          <ModalDeleteStudent isModal={isModalDeleteStudent} 
            onRef={this.onRefModalDeleteStudent}
            closeModalDeleteStudent={this.closeModalDeleteStudent}
            getAllStudent={this.getAllStudent}/>
        </div>
      </Paper>
    );
  }
}

InfoStudentManageTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoStudentManageTab);