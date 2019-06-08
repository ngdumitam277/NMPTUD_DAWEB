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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%',
  },
});

let id = 0;
function createData(nameCourse, score) {
  id += 1;
  return { id, nameCourse, score };
}

const rows = [
  createData('A', 29.5),
  createData('A1', 20),

];

class UnitTable extends Component {
  render() {
    const { classes, data } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tên khối</TableCell>
              <TableCell align="center">Điểm chuẩn</TableCell>
              <TableCell align="center">Tùy chỉnh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.tenKhoi}
                </TableCell>
                <TableCell align="right">{row.diemChuan}</TableCell>
                <TableCell>
                  <Button onClick={() => this.props.openModalDeleteKhoiThi(row, this.props.maNganh)} variant="contained" color="secondary" className={classes.button}>
                      Xóa
                  </Button>
                  &nbsp;
                  <Button onClick={() => this.props.openModalEditKhoiThi(row, this.props.maNganh)} variant="contained" color="primary" className={classes.button}>
                      Sửa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

UnitTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UnitTable);