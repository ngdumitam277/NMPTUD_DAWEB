import React, { Component } from 'react'
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

// sections for page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import SectionAdmin from './sections/SectionAdmin';

class AdminPage extends Component {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <Header
                    brand="Trang chủ"
                    rightLinks={<HeaderLinks />}
                    fixed
                    color="transparent"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax style={{height:150}} small filter image={require("assets/img/profile-bg.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <SectionAdmin/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withStyles(componentsStyle)(AdminPage);