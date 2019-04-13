import React, { Component } from 'react'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Quote from "components/Typography/Quote.jsx";

class SectionHistory extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <div className={classes.container}>
                    <div className={classes.title}>
                        <h2>Giới thiệu</h2>
                    </div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <img
                                src={require("assets/img/home-1.jpg")}
                                alt="..."
                                className={classes.imgRounded + " " + classes.imgFluid}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <h4 className={classes.title}>Mục tiêu giáo dục</h4>
                            <p>
                                Trường ĐH KH-AN góp phần đào tạo nguồn nhân lực ở trình độ đại học, đội ngũ chuyên gia ở các trình độ thạc sĩ, tiến sĩ trong các lĩnh vực khoa học cơ bản, khoa học liên ngành, khoa học công nghệ mũi nhọn; thông qua đào tạo,
                                thực hiện những nghiên cứu khoa học đỉnh cao trong các lĩnh vực liên quan để tạo ra tri thức, sản phẩm mới đáp ứng nhu cầu phát triển khoa học công nghệ và yêu cầu phát triển kinh tế - xã hội ngày càng cao của đất nước,
                                phù hợp với xu thế phát triển thế giới; đào tạo người học có phẩm chất chính trị, đạo đức; có kiến thức, kỹ năng thực hành, năng lực nghiên cứu và phát triển ứng dụng khoa học và công nghệ tương xứng với trình độ đào tạo;
                                có sức khỏe; có khả năng sáng tạo và trách nhiệm nghề nghiệp, thích nghi với môi trường làm việc; có ý thức phục vụ cộng đồng
                            </p>
                            <Quote
                                text="Học thuật, sáng tạo, phục vụ, vì người học và học tập suốt đời."
                                author=" Triết lý giáo dục của Trường ĐH KH-AN"
                            />
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default withStyles(typographyStyle)(SectionHistory);
