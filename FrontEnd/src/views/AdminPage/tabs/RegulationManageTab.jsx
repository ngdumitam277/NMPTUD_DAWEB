import React from 'react';
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
function createData(name, diem) {
    id += 1;
    return { id, name, diem };
}

const rows = [
    createData('KV1', 1),
    createData('KV2', 2),
    createData('KV3', 3),
    createData('KV4', 4),
    createData('KV5', 5)
];

function RegulationManageTab(props) {
    const { classes } = props;

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h3>Quản lý quy chế</h3>
            </div>
            <Button variant="contained" color="green" className={classes.button}>
                <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
                    add_circle
            </Icon>
            </Button>
            &nbsp;
            <InputLabel className={classes.label}>
                    Thêm Khu Vực
            </InputLabel>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên khu vực</TableCell>
                            <TableCell align="right">Điểm</TableCell>
                            <TableCell align="right">Tùy chỉnh</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.diem}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="secondary" className={classes.button}>
                                        Xóa
                                    </Button>
                                    &nbsp;
                                    <Button variant="contained" color="primary" className={classes.button}>
                                        Sửa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

RegulationManageTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegulationManageTab);