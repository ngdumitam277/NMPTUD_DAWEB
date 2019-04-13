import React, { Component } from 'react'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";

class SectionsImage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <div className={classes.container}>
                    <div className={classes.title}>
                        <h2>Tin Tức Hoạt Động</h2>
                    </div>
                    <div id="images">
                        <br />
                        <GridContainer>
                            <GridItem xs={12} sm={3}>
                                <h4 style={{textAlign: "center"}}>DÀNH CHO CB-VC-NLĐ</h4>
                                <img
                                    src={require("assets/img/cb-vc.png")}
                                    alt="..."
                                    className={classes.imgRounded + " " + classes.imgFluid}
                                />
                                <p>Thông báo, thông tin cho CB-VC-NLĐ</p>
                            </GridItem>
                            <GridItem xs={12} sm={3} className={classes.marginLeft}>
                                <h4 style={{textAlign: "center"}}>DÀNH CHO SINH VIÊN</h4>
                                <img
                                    src={require("assets/img/nguoi-hoc.png")}
                                    alt="..."
                                    className={classes.imgRounded + " " + classes.imgFluid}
                                />
                                <p>Thông báo, thông tin cho CB-VC-NLĐ</p>
                            </GridItem>
                            <GridItem xs={12} sm={3} className={classes.marginLeft}>
                                <h4 style={{textAlign: "center"}}>DÀNH CHO HỌC VIÊN</h4>
                                <img
                                    src={require("assets/img/hoc-vien.png")}
                                    alt="..."
                                    className={
                                        classes.imgRaised +
                                        " " +
                                        classes.imgRounded +
                                        " " +
                                        classes.imgFluid
                                    }
                                />
                                <p>Thông báo, thông tin cho CB-VC-NLĐ</p>
                            </GridItem>
                            <GridItem xs={12} sm={3} className={classes.marginLeft}>
                                <h4 style={{textAlign: "center"}}>TUYỂN DỤNG - VIỆC LÀM</h4>
                                <img
                                    src={require("assets/img/tuyen-dung.png")}
                                    alt="..."
                                    className={
                                        classes.imgRaised +
                                        " " +
                                        classes.imgRounded +
                                        " " +
                                        classes.imgFluid
                                    }
                                />
                                <p>Thông báo, thông tin cho CB-VC-NLĐ</p>
                            </GridItem>
                        </GridContainer>
                        <GridContainer />
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(typographyStyle)(SectionsImage);