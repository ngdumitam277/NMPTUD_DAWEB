import React, { Component } from "react";

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
import CourseTable from "../tables/CourseTable";
import BranchTab from "./BranchTab";
import GradeLevelTable from "../tables/GradeLevelTable";
import SubjectTab from "./SubjectTab";
import KhoiThiTab from "./KhoiThiTab";
import NganhThiTab from "./NganhThiTab";

class QLTuyenSinh extends Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
        <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Môn",
                      tabContent: (
                      <CourseTable/>
                      )
                    },
                    {
                      tabName: "Khối",
                     
                      tabContent: (
                        <GradeLevelTable/>
                      )
                    },
                    {
                      tabName: "Ngành",
                     
                      tabContent: (
                        <BranchTab/>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
        </div>
    )
  }
}

export default withStyles(tabsStyle)(QLTuyenSinh)