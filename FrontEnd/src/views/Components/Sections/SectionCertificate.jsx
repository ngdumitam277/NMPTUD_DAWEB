import React, { Component } from 'react'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Quote from "components/Typography/Quote.jsx";

class SectionCertificate extends Component {
    render() {
        const { classes } = this.props;
        console.log(classes);
        return (
            <div className={classes.section}>
                <div className={classes.container}>
                    <div className={classes.title}>
                        <h2>Kiểm định giáo dục</h2>
                    </div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <img
                                
                                src={require("assets/img/kiemdinh2016.jpg")}
                                alt="..."
                                className={classes.imgRounded + " " + classes.imgFluid}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <iframe title="video" width="100%" height="345" src="https://www.youtube.com/embed/fMuqnkdK-rk">
                            </iframe>
                            <br/>
                            <p>
                            Khoa Công nghệ Thông tin (CNTT) của Trường Đại học Khoa học Tự nhiên, 
                            ĐHQG-HCM được thành lập vào tháng 2 năm 1995 đã và đang phát triển vững chắc để trở thành một trong những khoa CNTT đầu ngành trong hệ thống giáo dục đại học của Việt Nam.
                            </p>
                            <Quote
                                text="- Vì sự phát triển toàn diện của người học.

                                - Đề cao tinh thần tự do học thuật, tính độc lập, sáng tạo.
                                
                                - Chất lượng đào tạo, nghiên cứu là yếu tố quan tâm hàng đầu.
                                
                                - Đoàn kết, hợp tác, tôn trọng lẫn nhau.
                                
                                - Chuyên nghiệp và hiệu quả trong quản lý.
                                
                                - Gắn kết và phục vụ cộng đồng."
                                author=" Trường ĐH KH-TN"
                            />

                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default withStyles(typographyStyle)(SectionCertificate)