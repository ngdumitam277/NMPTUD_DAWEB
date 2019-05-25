import React, { Component } from 'react'
// react components for routing our app without refresh
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Schedule from "@material-ui/icons/Schedule";
// core components
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

import ProfileUser from '../AdminPage/tabs/ProfileUser';
import ThongTinThiTuyen from './ThongTinThiTuyen';

class SectionUser extends Component {
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
                      tabButton: "Thông tin thi tuyển",
                      tabIcon: Schedule,
                      tabContent: (
                          <ThongTinThiTuyen/>
                      )
                    },
                    {
                        tabButton: "Phúc khảo",
                        tabIcon: Schedule,
                        tabContent: (
                            <></>
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

export default withStyles(componentsStyle)(SectionUser);