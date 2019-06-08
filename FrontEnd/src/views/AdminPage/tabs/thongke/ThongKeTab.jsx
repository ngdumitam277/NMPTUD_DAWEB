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
import TKMon from "./TKMon";
import TKKhoi from "./TKKhoi";
import TKNganh from "./TKNganh";

class ThongKeTab extends Component {
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
                      <TKMon/>
                      )
                    },
                    {
                      tabName: "Khối",
                      tabContent: (
                        <TKKhoi/>
                      )
                    },
                    {
                      tabName: "Ngành",
                      tabContent: (
                        <TKNganh/>
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

export default withStyles(tabsStyle)(ThongKeTab)