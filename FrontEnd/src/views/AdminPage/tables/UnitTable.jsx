import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function UnitTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Tên khối</TableCell>
            <TableCell align="right">Điểm chuẩn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.nameCourse}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

UnitTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UnitTable);