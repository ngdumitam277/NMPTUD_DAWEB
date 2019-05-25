import React, { Component } from 'react'
// react components for routing our app without refresh
// nodejs library that concatenates classes
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Schedule from "@material-ui/icons/Schedule";
// core components
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
// sections for page
import QLTuyenSinh from '../tabs/QLTuyenSinh';
import LichSuDiem from '../tabs/LichSuDiem';
import ProfileUser from '../tabs/ProfileUser';
import QuyChe from '../tabs/QuyChe';
import ThongTinTuyenSinh from '../tabs/ThongTinTuyenSinh';
import BangDiem from '../tabs/BangDiem';
import ThongKeTab from '../tabs/thongke/ThongKeTab';
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
                      tabContent: (<ProfileUser />)
                    },
                    {
                      tabButton: "Tuyển sinh",
                      tabIcon: Schedule,
                      tabContent: (
                        <QLTuyenSinh />
                      )
                    },
                    {
                      tabButton: "Thông tin-TS",
                      tabIcon: Schedule,
                      tabContent: (
                        <ThongTinTuyenSinh />
                      )
                    },
                    {
                      tabButton: "Quy chế",
                      tabIcon: Schedule,
                      tabContent: (
                        <QuyChe />
                      )
                    },
                    {
                      tabButton: "Q.L Điểm",
                      tabIcon: Schedule,
                      tabContent: (
                        <BangDiem />
                      )
                    },
                    {
                      tabButton: "Lịch sử điểm",
                      tabIcon: Schedule,
                      tabContent: (
                        <LichSuDiem />
                      )
                    },
                    {
                      tabButton: "Thống kê",
                      tabIcon: Schedule,
                      tabContent: (
                        <ThongKeTab />
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