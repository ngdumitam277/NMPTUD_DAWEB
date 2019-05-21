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
        minWidth: 700,
    },
});

let id = 0;
function createData(tenKhoi, diemChuan, soTsDuThi, soTsDau) {
    id += 1;
    return { id, tenKhoi, diemChuan, soTsDuThi, soTsDau };
}

const rows = [
    createData('A', 25.9, 1500, 1000),
    createData('B', 27.9, 1000, 900),
    createData('C', 21.9, 1200, 500),
    createData('D', 22.9, 1300, 1200),
    createData('E', 23.9, 1700, 1500),
];

function TKNganh_Table(props) {
    const { classes, data } = props;
    
    return (
        <>
            <div className={classes.title}>
                <h4>Công nghệ sinh học</h4>
            </div>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên khối</TableCell>
                            <TableCell align="right">Điểm chuẩn</TableCell>
                            <TableCell align="right">Số TS dự thi</TableCell>
                            <TableCell align="right">Số TS đậu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.tenKhoi}
                                </TableCell>
                                <TableCell align="right">{row.diemChuan}</TableCell>
                                <TableCell align="right">{row.soTsDuThi}</TableCell>
                                <TableCell align="right">{row.soTsDau}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow style={{background:"yellow"}}>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">2000</TableCell>
                                <TableCell align="right">3000</TableCell>
                                <TableCell align="right">500</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
}

TKNganh_Table.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TKNganh_Table);