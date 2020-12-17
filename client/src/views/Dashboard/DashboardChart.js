import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
    monthlyChart
  } from "variables/charts.js";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
// import Store from "@material-ui/icons/Store";
// import DateRange from "@material-ui/icons/DateRange";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";




import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function DashboardChart(props) {
  const classes = useStyles();

  const { num, spaceName } = props.status; //couponPaymentData
  const chartData = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    series: [[3, 15, 18, 48, 68, 120, 326, 434, 568, 610, 756, 895]]
  };

  const colorList = ["warning", "success", "danger", "info", "primary", "rose"];
  const color = colorList[num % 6];

  return (
    <GridItem xs={12} sm={12} md={4}>
        <Card chart>
            <CardHeader color={color}>
                <ChartistGraph
                className="ct-chart"
                data={chartData}
                type="Bar"
                options={monthlyChart.options}
                responsiveOptions={monthlyChart.responsiveOptions}
                listener={monthlyChart.animation}
                />
            </CardHeader>
            <CardBody>
                <h4 className={classes.cardTitle}>{spaceName}</h4>
                <p className={classes.cardCategory}>Monthly coupon payment</p>
            </CardBody>
            <CardFooter chart>
                <div className={classes.stats}>
                <AccessTime /> coupon sent 2 days ago
                </div>
            </CardFooter>
        </Card>
    </GridItem>
  );
}
