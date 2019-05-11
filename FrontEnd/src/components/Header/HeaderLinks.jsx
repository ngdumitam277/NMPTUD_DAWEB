/*eslint-disable*/
import React, { Component } from 'react'
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Explore from "@material-ui/icons/Explore";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import axios from 'axios'
import { url } from 'variable/general.jsx'

class HeaderLinks extends Component {
    constructor(props){
      super(props)

      this.state = {
        user: null
      }
    }

    componentDidMount = () => {
      axios.get(`${url}web/taikhoan/thongtin/checkCookie`, {
        withCredentials: true
      })
      .then((response) => {
        let result = response.data

        if(result.message === "ok"){
          this.setState({user: result.user})
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }

    render() {
      const { classes } = this.props;
      let { user } = this.state
      console.log(user)

        return (
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <Button
                href="https://www.creative-tim.com/product/material-kit-react"
                color="transparent"
                className={classes.navLink}
              >
                <AccountCircle className={classes.icons} /> Tra cứu tuyển sinh
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="https://www.creative-tim.com/product/material-kit-react"
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                <AccountCircle className={classes.icons} /> Giới thiệu
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="https://www.creative-tim.com/product/material-kit-react"
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                <Explore className={classes.icons} /> Đào tạo
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="/login-page"
                color="transparent"
                target="_top"
                className={classes.navLink}
              >
                <AccountCircle className={classes.icons} /> Đăng Nhập
              </Button>
            </ListItem>
          </List>
        );
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
