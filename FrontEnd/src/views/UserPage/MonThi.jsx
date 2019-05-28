import React, { Component } from 'react'
// react components for routing our app without refresh
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Schedule from "@material-ui/icons/Schedule";
// core components
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'
import { url } from 'variable/general.jsx'
import moment from 'moment'

class MonThi extends Component {
    render() {
        const { classes, data } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.title}>
                    <h4>Thông tin điểm thi</h4>
                </div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Môn thi</TableCell>
                            <TableCell align="right">Phòng thi</TableCell>
                            <TableCell align="right">Ngày giờ thi</TableCell>
                            <TableCell align="right">Điểm</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((row, index) => (
                                <TableRow key={1}>
                                    <TableCell component="th" scope="row">
                                        {row.mon}
                                    </TableCell>
                                    <TableCell align="right">{row.phongThi}</TableCell>
                                    <TableCell align="right">{moment(row.tgThi).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell align="right">{row.diem}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default withStyles(componentsStyle)(MonThi);