import React, { Component } from 'react'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


class SectionNews extends Component {
    render() {
        const { classes } = this.props;
        console.log(classes);
        return (
            <div className={classes.section}>
                <div className={classes.container}>
                    <div className={classes.title}>
                        <h2>Tạp chí giáo dục</h2>
                    </div>
                    <GridContainer>
                        <GridItem xs={12} sm={3} md={4}>
                            <h4>PHÁT TRIỂN KHOA HỌC & CÔNG NGHỆ</h4>
                            <img
                                src={require("assets/img/khcn.jpg")}
                                alt="..."
                                className={classes.imgRounded + " " + classes.imgFluid}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3} md={4}>
                            <h4>BIOMEDICAL RESEARCH AND THERAPY</h4>
                            <img
                                src={require("assets/img/bmrat1.png")}
                                alt="..."
                                className={classes.imgRounded + " " + classes.imgFluid}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3} md={4}>
                            <h4 style={{textAlign:"center"}}>PROGRESS IN STEM CELL</h4>
                            <img
                                src={require("assets/img/logo_psc1.png")}
                                alt="..."
                                className={classes.imgRounded + " " + classes.imgFluid}
                            />
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default withStyles(typographyStyle)(SectionNews)