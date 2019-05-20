import React, { Component } from 'react'
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
// sections for page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import QLTuyenSinh from '../tabs/QLTuyenSinh';
import LichSuDiem from '../tabs/LichSuDiem';
import ProfileUser from '../tabs/ProfileUser';
import QuyChe from '../tabs/QuyChe';
import ThongTinTuyenSinh from '../tabs/ThongTinTuyenSinh';
import BangDiem from '../tabs/BangDiem';
class SectionAdmin extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
            <div className={classes.container}>
              <div id="navigation-pills">
                <div className={classes.title}>
                  <h3>Quản lý tuyển sinh</h3>
                </div>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    <NavPills
                      color="rose"
                      horizontal={{
                        tabsGrid: { xs: 12, sm: 2, md: 2 },
                        contentGrid: { xs: 12, sm: 10, md: 10 }
                      }}
                      tabs={[
                        {
                          tabButton: "Cá nhân",
                          tabIcon: Schedule,
                          tabContent: (<ProfileUser/>)
                        },
                        {
                          tabButton: "Tuyển sinh",
                          tabIcon: Schedule,
                          tabContent: (
                            <QLTuyenSinh/>
                          )
                        },
                        {
                          tabButton: "Thông tin-TS",
                          tabIcon: Schedule,
                          tabContent: (
                            <ThongTinTuyenSinh/>
                          )
                        },
                        {
                            tabButton: "Quy chế",
                            tabIcon: Schedule,
                            tabContent: (
                             <QuyChe/>
                            )
                          },
                          {
                            tabButton: "Q.L Điểm",
                            tabIcon: Schedule,
                            tabContent: (
                              <BangDiem/>
                            )
                          },
                          {
                            tabButton: "Lịch sử điểm",
                            tabIcon: Schedule,
                            tabContent: (
                              <LichSuDiem/>
                            )
                          }
                      ]}
                    />
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
        )
    }
}

export default withStyles(componentsStyle)(SectionAdmin);