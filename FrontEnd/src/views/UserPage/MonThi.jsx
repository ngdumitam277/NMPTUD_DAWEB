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
import Button from "components/CustomButtons/Button.jsx";
import { url } from 'variable/general.jsx'
import moment from 'moment'
import ModalPhucKhao from '../AdminPage/modals/ModalPhucKhao';

class MonThi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModal: false,
        }

        this.modalPhucKhaoRef = React.createRef()
    }

    handlePhucKhao = (Phach, mon) => {
        this.modalPhucKhaoRef.setData(Phach, mon)
        this.setState({isModal: true})
    }

    closeModalPhucKhao = () => {
        this.setState({isModal: false})
    }

    onRefModalPhucKhao = (ref) => this.modalPhucKhaoRef = ref

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
                            <TableCell align="center">Phòng thi</TableCell>
                            <TableCell align="center">Ngày giờ thi</TableCell>
                            <TableCell align="center">Giờ thi</TableCell>
                            <TableCell align="center">Điểm</TableCell>
                            <TableCell align="center">Điểm phúc khảo</TableCell>
                            <TableCell align="center">Tùy chỉnh</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((row, index) => (
                                <TableRow key={1}>
                                    <TableCell component="th" scope="row">
                                        {row.mon}
                                    </TableCell>
                                    <TableCell align="center">{row.phongThi}</TableCell>
                                    <TableCell align="center">{moment(row.tgThi).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell align="center">{row.gioThi}</TableCell>
                                    <TableCell align="center">{row.diem}</TableCell>
                                    <TableCell align="center">{row.diemPK === "" ? "Chưa có" : row.diemPK}</TableCell>
                                    <TableCell align="center">
                                    <Button onClick={() => this.handlePhucKhao(row.Phach, row.mon)} simple color="primary" size="lg">
                                        Phúc khảo
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                
                <ModalPhucKhao isModal={this.state.isModal} 
                    onRef={this.onRefModalPhucKhao}
                    getAllData={this.props.getAllData}
                    closeModalPhucKhao={this.closeModalPhucKhao}/>
            </div>
        )
    }
}

export default withStyles(componentsStyle)(MonThi);