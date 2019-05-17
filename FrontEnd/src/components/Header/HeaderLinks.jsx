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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
        user: null,
        anchorEl: null
      }
    }

    componentDidMount = () => {
      axios.get(`${url}web/taikhoan/checkCookie`, {
        withCredentials: true
      })
      .then((response) => {
        let result = response.data
        console.log("result ===" + JSON.stringify(result))
        if(result.message === "ok"){
          this.setState({user: result.user})
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    render() {
      const { classes } = this.props;
      let { user, anchorEl } = this.state
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
            {user == null ?
              <Button
                href="/login-page"
                color="transparent"
                target="_top"
                className={classes.navLink}
              >
                <AccountCircle className={classes.icons} /> Đăng Nhập
              </Button> : 
              <>
                <Button
                    color="transparent"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <AccountCircle className={classes.icons} /> {user ? user.username : null}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                  </Menu>
              </>
            }
            </ListItem>
          </List>
        );
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
