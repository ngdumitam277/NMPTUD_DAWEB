import React, { Component } from 'react'
// react components for routing our app without refresh
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Footer from "components/Footer/Footer.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import SectionUser from "./SectionUser";
import Header from "components/Header/Header.jsx";
// sections for page
import HeaderLinks from "components/Header/HeaderLinks.jsx";

class UserPage extends Component {
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
                    <SectionUser/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withStyles(componentsStyle)(UserPage);