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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ModalXacNhanStudent from '../modals/ModalXacNhanStudent';

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
      <div style={{ width: 400 }} classname={classes.root}>
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

class ThongTinTuyenSinh extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 5,
      isModalDeleteStudent: false,
      optionSearch: '',
      keySearch: "",
      isModalXacNhanStudent: false
    }

    this.modalDeleteStudentRef = React.createRef()
    this.modalXacNhanStudentRef = React.createRef()
  }

  getAllStudent = () => {
    axios.get(`${url}web/taikhoan/thisinh`)
      .then((result) => {
        let data = result.data

        if (data.length > 0) {
          this.setState({ data: data })
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

  setModalDeleteStudent = (isModal) => this.setState({ isModalDeleteStudent: isModal })

  openModalDeleteStudent = (data) => {
    this.modalDeleteStudentRef.setDataStudent(data)
    this.setModalDeleteStudent(true)
  }

  closeModalDeleteStudent = () => {
    this.setModalDeleteStudent(false)
  }

  setModalXacNhanStudent = (isModal) => this.setState({ isModalXacNhanStudent: isModal })

  openModalXacNhanStudent = (data) => {
    this.modalXacNhanStudentRef.setDataStudent(data)
    this.setModalXacNhanStudent(true)
  }

  closeModalXacNhanStudent = () => {
    this.setModalXacNhanStudent(false)
  }

  onRefModalXacNhanStudent = (ref) => this.modalXacNhanStudentRef = ref

  onRefModalDeleteStudent = (ref) => this.modalDeleteStudentRef = ref

  handleChangeSearch = (e) => {
    this.setState({ optionSearch: e.target.value })
  }

  handleChangeKeySearch = (e) => {
    this.setState({keySearch: e.target.value})
  }

  onSearch = () => {
    let keySearch = this.state.keySearch

    if(keySearch === ""){
      this.getAllStudent()
    }else{
      axios.get(`${url}web/taikhoan/timkiem/${this.state.keySearch}`)
      .then((result) => {
        let data = result.data
  
        if(data.length > 0){
          this.setState({data: data})
        }else{
          this.setState({data: []})
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  getTinhTrangThiSinh = (tinhTrang) => {
    if(tinhTrang === 0){
      return "Chưa xác nhận"
    }else if(tinhTrang === 1){
      return "Đã xác nhận"
    }else if(tinhTrang === 3){
      return "Đã xoá"
    }else{
      return "Đang phúc khảo"
    }
  }

  getTuyChinhThiSinh = (tinhTrang, classes, row) => {
    if(tinhTrang === 0){
      return (
        <>
          <TableCell align="center">
            <Button onClick={() => this.openModalDeleteStudent(row)} variant="contained" color="secondary" className={classes.button}>
                Xóa
            </Button>
          </TableCell>
          <TableCell align="center">
            <Button onClick={() => this.openModalXacNhanStudent(row)} variant="contained" color="primary" className={classes.button}>
                X.nhận
            </Button>
          </TableCell>
        </>
      )
    }else if(tinhTrang === 1){
      return (
        <>
          <TableCell align="center">
            <Button onClick={() => this.openModalDeleteStudent(row)} variant="contained" color="secondary" className={classes.button}>
                Xóa
            </Button>
          </TableCell>
          <TableCell align="center">
            <Button disabled={true} onClick={() => this.openModalXacNhanStudent(row)} variant="contained" color="primary" className={classes.button}>
                X.nhận
            </Button>
          </TableCell>
        </>
      )
    }else if(tinhTrang === 3){
      return (
        <>
          <TableCell align="center">
            <Button disabled={true} onClick={() => this.openModalDeleteStudent(row)} variant="contained" color="secondary" className={classes.button}>
                Xóa
            </Button>
          </TableCell>
          <TableCell align="center">
            <Button disabled={true} onClick={() => this.openModalXacNhanStudent(row)} variant="contained" color="primary" className={classes.button}>
                X.nhận
            </Button>
          </TableCell>
        </>
      )
    }else{
      return (
        <>
          <TableCell align="center">
            <Button onClick={() => this.openModalDeleteStudent(row)} variant="contained" color="secondary" className={classes.button}>
                Xóa
            </Button>
          </TableCell>
          <TableCell align="center">
            <Button disabled={true} onClick={() => this.openModalXacNhanStudent(row)} variant="contained" color="primary" className={classes.button}>
                X.nhận
            </Button>
          </TableCell>
        </>
      )
    }
  }

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page, data, isModalDeleteStudent, keySearch, isModalXacNhanStudent } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className={classes.container}>
        <div className={classes.search}>
          <GridContainer>
            <GridItem xs={3} sm={3} md={3} lg={3}>
              <label>
                  Seacrh
                </label>
              <InputBase
                value={keySearch}
                onChange={this.handleChangeKeySearch}
                style={{ boder: "red" }}
                placeholder="Nhập thông tin ...."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />

            </GridItem>
            <GridItem xs={7} sm={7} md={7} lg={7}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="position" name="position"
                className={classes.group}
                value={this.state.optionSearch}
                onChange={this.handleChangeSearch}
                row
              >
                    <FormControlLabel
                      value="username"
                      control={<Radio color="primary" />}
                      label="Username"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="cmnd"
                      control={<Radio color="primary" />}
                      label="Số CMND"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="hoTen"
                      control={<Radio color="primary" />}
                      label="Họ tên"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="email"
                      control={<Radio color="primary" />}
                      label="Email"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="sdt"
                      control={<Radio color="primary" />}
                      label="SĐT"
                      labelPlacement="start"
                    />
                 
              </RadioGroup>
              </FormControl>
              </GridItem>
              <GridItem xs={2} sm={2} md={2} lg={2}>
                <Button onClick={this.onSearch} variant="outlined" color="secondary" className={classes.button}>
                  Tìm Kiếm
              </Button>
              </GridItem>
            </GridContainer>
        </div>
        <hr/>
          <div classname={classes.tableWrapper}>
            <Table classname={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="center">Họ tên</TableCell>
                  <TableCell align="center">Ngày sinh</TableCell>
                  <TableCell align="center">Số CMND</TableCell>
                  <TableCell align="center">Ngày đăng ký</TableCell>
                  <TableCell align="center">Dân tộc</TableCell>
                  <TableCell align="center">Địa chỉ</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Giới tính</TableCell>
                  <TableCell align="center">Nơi sinh</TableCell>
                  <TableCell align="center">Tình trạng</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="center">{row.hTen}</TableCell>
                    <TableCell align="center">{moment(row.ngSinh).format("DD/MM/YYYY")}</TableCell>
                    <TableCell align="center">{row.soCMND}</TableCell>
                    <TableCell align="center">{moment(row.createdAt).format("DD/MM/YYYY")}</TableCell>
                    <TableCell align="center">{row.danToc}</TableCell>
                    <TableCell >{row.diaChi}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell >{row.gioiTinh}</TableCell>
                    <TableCell align="center">{row.noiSinh}</TableCell>
                    <TableCell align="center">{this.getTinhTrangThiSinh(Number(row.tinhTrang))}</TableCell>
                    {this.getTuyChinhThiSinh(Number(row.tinhTrang), classes, row)}
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
              getAllStudent={this.getAllStudent} />

            <ModalXacNhanStudent isModal={isModalXacNhanStudent}
              onRef={this.onRefModalXacNhanStudent}
              closeModalXacNhanStudent={this.closeModalXacNhanStudent}
              getAllStudent={this.getAllStudent} />
          </div>
        </div>
        );
      }
    }
    
ThongTinTuyenSinh.propTypes = {
          classes: PropTypes.object.isRequired,
      };
      
export default withStyles(styles)(ThongTinTuyenSinh);