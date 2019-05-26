import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg-login.jpeg";
import axios from 'axios'
import { url } from 'variable/general.jsx'

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      username: "",
      password: "",
      hTen: ""
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  onChangeUsername = (event) => {
    this.setState({username: event.target.value})
  }

  onChangeHTen = (event) => {
    this.setState({hTen: event.target.value})
  }

  onChangePassword = (event) => {
    this.setState({password: event.target.value})
  }

  clickDangKy = () => {
    axios.post(`${url}web/create/taikhoan/thisinh`,{
      username: this.state.username,
      password: this.state.password,
      hTen: this.state.hTen
    })
    .then((response) => {
      let result = response.data
      if(result.message === "ok"){
        alert("Tạo tài khoản thành công!")
      }else{
        alert(result.message)
      }
    })
    .catch((err) => {
      alert("Tạo tài khoản thất bại!")
      console.log(err)
    })
  }

  render() {
    const { classes, ...rest } = this.props;
    let { username, password, hTen } = this.state

    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Trang chủ"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container} style={{zIndex:9999}}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Đăng ký</h4>
                    </CardHeader>
                    <CardBody>
                    <CustomInput
                        labelText="Họ tên ..."
                        id="first"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.onChangeHTen,
                          value: hTen,
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Tài Khoản Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          onChange: this.onChangeUsername,
                          value: username,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          value: password,
                          onChange: this.onChangePassword,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />  
                    </CardBody>
                    <CardFooter className={classes.cardFooter} style={{display: 'block'}}>
                      <div style={{textAlign:'center'}}>
                        <Button onClick={this.clickDangKy} simple color="primary" size="lg">
                          Đăng Ký
                        </Button>
                      </div>
                      <Link to={"/login-page"} className={classes.link}>
                            
                        Về đăng nhập
                        
                        </Link>
                    </CardFooter>
                   
                  </form>

                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(RegisterPage);
