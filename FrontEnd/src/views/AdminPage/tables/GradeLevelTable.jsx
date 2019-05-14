import React, { Component } from 'react'
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
import ModalAddKhoiThi from '../modals/ModalAddKhoiThi';
import ModalEditKhoiThi from '../modals/ModalEditKhoiThi';
import ModalDeleteKhoiThi from '../modals/ModalDeleteKhoiThi';

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
function createData(name, mon1, mon2, mon3) {
  id += 1;
  return { id, name, mon1, mon2, mon3 };
}

const rows = [
  createData('A', 'Toán', 'Lý', 'Hóa'),
  createData('A1', 'Toán', 'Hóa', 'Anh văn'),
  createData('B', 'Văn', 'Sử', 'Địa'),
  createData('C', 'Toán', 'Hóa', 'Sinh'),
  createData('D', 'Mỹ thuật', 'Thể dục', 'Toán')
];

class GradeLevelTable extends Component {
  constructor(props) {
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
        this.setState({ data: result })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount = () => {
    this.getAllKhoiThi()
  }

  setModalAddKhoiThi = (isModal) => this.setState({ isModalAddKhoiThi: isModal })

  openModalAddKhoiThi = (event) => {
    event.preventDefault()
    this.setModalAddKhoiThi(true)
  }

  closeModalAddKhoiThi = () => {
    this.setModalAddKhoiThi(false)
  }

  setModalEditKhoiThi = (isModal) => this.setState({ isModalEditKhoiThi: isModal })

  openModalEditKhoiThi = (data) => {
    this.modalEditKhoiThiRef.setDataKhoiThi(data)
    this.setModalEditKhoiThi(true)
  }

  closeModalEditKhoiThi = () => {
    this.setModalEditKhoiThi(false)
  }

  setModalDeleteKhoiThi = (isModal) => this.setState({ isModalDeleteKhoiThi: isModal })

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
    const { classes } = this.props;
    let { data, isModalAddKhoiThi, isModalDeleteKhoiThi, isModalEditKhoiThi } = this.state

    return (
      <div>
        <Button onClick={this.openModalAddKhoiThi} variant="contained" color="green" className={classes.button}>
          <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
            add_circle
                </Icon>
        </Button>
        &nbsp;
            <InputLabel className={classes.label}>
          Thêm khối
            </InputLabel>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Tên khối</TableCell>
                <TableCell align="right">Điểm TB</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Tùy chỉnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.tenKhoi}
                  </TableCell>
                  <TableCell align="right">{row.diemTBkhoi}</TableCell>
                  <TableCell align="right">{row.slThiSinh}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => this.openModalDeleteKhoiThi(row)} variant="contained" color="secondary" className={classes.button}>
                      Xóa
                    </Button>
                    &nbsp;
                    <Button onClick={() => this.openModalEditKhoiThi(row)} variant="contained" color="primary" className={classes.button}>
                      Sửa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

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
      </div>
    )
  }
}

GradeLevelTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GradeLevelTable);