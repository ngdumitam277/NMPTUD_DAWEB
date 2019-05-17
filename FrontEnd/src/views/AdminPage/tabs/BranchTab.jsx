import React, { Component } from 'react'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import tabsStyle from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import UnitTable from '../tables/UnitTable';
import axios from 'axios'
import { url } from 'variable/general.jsx'
import ModalAddNganhThi from '../modals/ModalAddNganhThi';
import ModalEditNganhThi from '../modals/ModalEditNganhThi';
import ModalDeleteNganhThi from '../modals/ModalDeleteNganhThi';

class BranchTab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            isModalAddNganhThi: false,
            isModalEditNganhThi: false,
            isModalDeleteNganhThi: false
        }

        this.modalEditNganhThiRef = React.createRef()
        this.modalDeleteNganhThiRef = React.createRef()
    }

    getAllNganhThi = () => {
        axios.get(`${url}web/nganh`)
            .then((response) => {
                let result = response.data
                this.setState({ data: result })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount = () => {
        this.getAllNganhThi()
    }

    setModalAddNganhThi = (isModal) => this.setState({ isModalAddNganhThi: isModal })

    openModalAddNganhThi = (event) => {
        event.preventDefault()
        this.setModalAddNganhThi(true)
    }

    closeModalAddNganhThi = () => {
        this.setModalAddNganhThi(false)
    }

    setModalEditNganhThi = (isModal) => this.setState({ isModalEditNganhThi: isModal })

    openModalEditNganhThi = (data) => {
        this.modalEditNganhThiRef.setDataNganhThi(data)
        this.setModalEditNganhThi(true)
    }

    closeModalEditNganhThi = () => {
        this.setModalEditNganhThi(false)
    }

    setModalDeleteNganhThi = (isModal) => this.setState({ isModalDeleteNganhThi: isModal })

    openModalDeleteNganhThi = (data) => {
        this.modalDeleteNganhThiRef.setDataNganhThi(data)
        this.setModalDeleteNganhThi(true)
    }

    closeModalDeleteNganhThi = () => {
        this.setModalDeleteNganhThi(false)
    }

    onRefModalDeleteNganhThi = (ref) => this.modalDeleteNganhThiRef = ref

    onRefModalEditNganhThi = (ref) => this.modalEditNganhThiRef = ref

    render() {
        const { classes } = this.props;
        let { data, isModalAddNganhThi, isModalDeleteNganhThi, isModalEditNganhThi } = this.state
   
        return (
            <div className={classes.container}>
                <Button onClick={this.openModalAddNganhThi} variant="contained" color="green" className={classes.button}>
                    <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
                        add_circle
                    </Icon>
                </Button>
                &nbsp;
                <InputLabel className={classes.label}>
                    Thêm Ngành
                </InputLabel>
                <div className={classes.title}>
                    <h4>Danh sách các ngành</h4>
                </div>
                {data.map(rows => (
                    <>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <GridContainer>
                                    <GridItem xs={4} sm={4} md={4}>
                                        <InputLabel className={classes.label}>
                                            Mã ngành
                                </InputLabel>
                                        <p>{rows.maNganh}</p>
                                    </GridItem>
                                    <GridItem xs={4} sm={4} md={4}>
                                        <InputLabel className={classes.label}>
                                            Tên ngành
                                </InputLabel>
                                        <p>{rows.tenNganh}</p>
                                    </GridItem>
                                    <GridItem xs={4} sm={4} md={4}>
                                        <InputLabel className={classes.label}>
                                            Chỉ tiêu
                                </InputLabel>
                                        <br />
                                        <p>{rows.chiTieuNganh}</p>
                                    </GridItem>
                                </GridContainer>
                                <br />
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <InputLabel className={classes.label}>
                                            Thông tin
                                        </InputLabel>
                                        <br />
                                        <p>{rows.thongTin}</p>
                                    </GridItem>
                                </GridContainer>
                                <br />
                                <GridContainer>
                                    <GridItem xs={8} sm={8} md={8}>
                                        <InputLabel className={classes.label}>
                                            Khối thi
                                        </InputLabel>
                                        <UnitTable data={rows.khoi}/>
                                    </GridItem>
                                    <GridItem xs={4} sm={4} md={4}>
                                        <Button style={{ marginTop: 50 }} variant="contained" color="green" className={classes.button}>
                                            Thêm khối
                                        </Button>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                        <div style={{ textAlign: "right" }}>
                            <Button onClick={() => this.openModalDeleteNganhThi(rows)} variant="contained" color="secondary" className={classes.button}>
                                Xóa
                            </Button>
                            &nbsp;
                            <Button onClick={() => this.openModalEditNganhThi(rows)} variant="contained" color="primary" className={classes.button}>
                                Thay đổi
                            </Button>
                        </div>
                        <hr/>
                    </>
                ))}

                <ModalAddNganhThi isModal={isModalAddNganhThi} 
                    closeModalAddNganhThi={this.closeModalAddNganhThi}
                    getAllNganhThi={this.getAllNganhThi}/>

                <ModalEditNganhThi isModal={isModalEditNganhThi} 
                    onRef={this.onRefModalEditNganhThi}
                    closeModalEditNganhThi={this.closeModalEditNganhThi}
                    getAllNganhThi={this.getAllNganhThi}/>
                
                <ModalDeleteNganhThi isModal={isModalDeleteNganhThi} 
                    onRef={this.onRefModalDeleteNganhThi}
                    closeModalDeleteNganhThi={this.closeModalDeleteNganhThi}
                    getAllNganhThi={this.getAllNganhThi}/>
            </div>
        )
    }
}

export default withStyles(tabsStyle)(BranchTab)