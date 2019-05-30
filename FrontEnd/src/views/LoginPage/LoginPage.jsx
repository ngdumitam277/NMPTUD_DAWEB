import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { Redirect } from 'react-router-dom';
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

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg-login.jpeg";
import axios from 'axios'
import { url } from 'variable/general.jsx'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      username: "",
      password: ""
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
    //this.checkLogin()
  }

  checkLogin = () => {
    axios.get(`${url}web/taikhoan/checkCookie`, {
      withCredentials: true
    })
    .then((response) => {
      let result = response.data
      if(result.message === "ok"){
        this.props.history.push("/");
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  clickDangNhap = () => {
    axios.post(`${url}web/taikhoan/dangnhap`, {
      username: this.state.username,
      password: this.state.password
    }, {withCredentials: true})
    .then((response) => {
      let result = response.data
      if(result.message === "ok"){
        alert("Đăng nhập thành công!")
        //return <Redirect to='/' />
        this.props.history.push("/");
      }else{
        alert(result.message)
      }
    })
    .catch((err) => {
      alert("Đăng nhập thất bại!")
      console.log(err)
    })
  }

  onChangeUsername = (event) => {
    const username = event.target.value

    this.setState({username: username})
  }

  onChangePassword = (event) => {
    this.setState({password: event.target.value})
  }

  render() {
    const { classes, ...rest } = this.props;
    let { username, password } = this.state

    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Trang chủ"
          rightLinks={<HeaderLinks {...this.props} />}
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
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Đăng nhập</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardBody>
                      <CustomInput
                        labelText="Tài Khoản Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        max="16"
                        min="5"
                        inputProps={{
                          onChange: this.onChangeUsername,
                          value: username,
                          type: "email",
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
                        <Button onClick={this.clickDangNhap} simple color="primary" size="lg">
                          Đăng Nhập
                        </Button>
                      </div>
                      <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                          <a href="" target="_blank"> Quên mật khẩu</a>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6} style={{textAlign:'right'}}>
                          <Link to={"/register-page"} className={classes.link}>
                             
                                Đăng ký
                             
                          </Link>
                        </GridItem>
                      </GridContainer>
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

export default withStyles(loginPageStyle)(LoginPage);
