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
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import UnitTable from '../tables/UnitTable';

class BranchTab extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.title}>
                  <h4>Danh sách các ngành</h4>
                </div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Mã ngành
                                </InputLabel>
                                <p>GST201</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Tên ngành
                                </InputLabel>
                                <p>Công nghệ thông tin</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                   Chỉ tiêu
                                </InputLabel>
                                <br />
                                <p>500</p>
                            </GridItem>
                        </GridContainer>
                        <br/>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <InputLabel className={classes.label}>
                                    Thông tin
                                </InputLabel>
                                <br />
                                <p>Tại Đại học FPT, 100% Sinh viên được nhà tuyển dụng chào đón. 5% SV khởi nghiệp. 100% Sinh viên có học kỳ nước ngoài và trải nghiệm quốc tế. Xét tuyển học bạ THPT. 500 suất học bổng. XT điểm thi THPT QG. Thi tuyển sinh ngày 12/5.</p>
                            </GridItem>
                        </GridContainer>
                        <br/>
                        <GridContainer>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Khối thi
                                </InputLabel>
                                <UnitTable/>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <Button style={{marginTop:50}} variant="contained" color="green" className={classes.button}>
                                    Thêm khối
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
                <div style={{textAlign:"right"}}>
                <Button variant="contained" color="secondary" className={classes.button}>
                    Xóa 
                </Button>
                &nbsp;
                <Button variant="contained" color="primary" className={classes.button}>
                    Thay đổi thông tin 
                </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(tabsStyle)(BranchTab)