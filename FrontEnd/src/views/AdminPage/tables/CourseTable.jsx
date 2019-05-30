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
import Icon from '@material-ui/core/Icon';
import InputLabel from "@material-ui/core/InputLabel";
import moment from 'moment'
import ModalAddMonThi from '../modals/ModalAddMonThi';
import ModalEditMonThi from '../modals/ModalEditMonThi';
import ModalDeleteMonThi from '../modals/ModalDeleteMonThi';

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
function createData(nameCourse, examDate, hour, room) {
  counter += 1;
  return { id: counter, nameCourse, examDate, hour, room };
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
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isModalAddMonThi: false,
      isModalEditMonThi: false,
      isModalDeleteMonThi: false,
      page: 0,
      rowsPerPage: 5,
    }

    this.modalEditMonThiRef = React.createRef()
    this.modalDeleteMonThiRef = React.createRef()
  }

  getAllMonThi = () => {
    axios.get(`${url}web/mon`)
      .then((response) => {
        let result = response.data
        this.setState({ data: result })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount = () => {
    this.getAllMonThi()
  }

  setModalAddMonThi = (isModal) => this.setState({ isModalAddMonThi: isModal })

  openModalAddMonThi = (event) => {
    event.preventDefault()
    this.setModalAddMonThi(true)
  }

  closeModalAddMonThi = () => {
    this.setModalAddMonThi(false)
  }

  setModalEditMonThi = (isModal) => this.setState({ isModalEditMonThi: isModal })

  openModalEditMonThi = (data) => {
    this.modalEditMonThiRef.setDataMonThi(data)
    this.setModalEditMonThi(true)
  }

  closeModalEditMonThi = () => {
    this.setModalEditMonThi(false)
  }

  setModalDeleteMonThi = (isModal) => this.setState({ isModalDeleteMonThi: isModal })

  openModalDeleteMonThi = (data) => {
    this.modalDeleteMonThiRef.setDataMonThi(data)
    this.setModalDeleteMonThi(true)
  }

  closeModalDeleteMonThi = () => {
    this.setModalDeleteMonThi(false)
  }

  onRefModalDeleteMonThi = (ref) => this.modalDeleteMonThiRef = ref

  onRefModalEditMonThi = (ref) => this.modalEditMonThiRef = ref

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };


  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page, isModalAddMonThi, isModalDeleteMonThi, isModalEditMonThi } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <div style={{marginBottom:10}}>
        <Button onClick={this.openModalAddKhoiThi} variant="contained" color="green" className={classes.button}>
          <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
            add_circle
          </Icon>
        </Button>
        &nbsp;
        <InputLabel className={classes.label}>
          Thêm môn
        </InputLabel>
        </div>
        <Paper classname={classes.root}>
          <div classname={classes.tableWrapper}>
            <Table classname={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Tên môn</TableCell>
                  <TableCell align="right">Ngày thi</TableCell>
                  <TableCell align="right">Phòng thi</TableCell>
                  <TableCell align="right">Tùy chỉnh</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.tenMon}
                    </TableCell>
                    <TableCell align="right">{moment(row.tgThi).format("DD-MM-YYYY")}</TableCell>
                    <TableCell align="right">{row.phongThi}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => this.openModalDeleteMonThi(row)} variant="contained" color="secondary" className={classes.button}>
                        Xóa
                    </Button>
                      &nbsp;
                    <Button onClick={() => this.openModalEditMonThi(row)} variant="contained" color="primary" className={classes.button}>
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
          </div>

          <ModalAddMonThi isModal={isModalAddMonThi}
            closeModalAddMonThi={this.closeModalAddMonThi}
            getAllMonThi={this.getAllMonThi} />

          <ModalEditMonThi isModal={isModalEditMonThi}
            onRef={this.onRefModalEditMonThi}
            closeModalEditMonThi={this.closeModalEditMonThi}
            getAllMonThi={this.getAllMonThi} />

          <ModalDeleteMonThi isModal={isModalDeleteMonThi}
            onRef={this.onRefModalDeleteMonThi}
            closeModalDeleteMonThi={this.closeModalDeleteMonThi}
            getAllMonThi={this.getAllMonThi} />
        </Paper>
      </div>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);