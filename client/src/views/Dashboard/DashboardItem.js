import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function DashboardItem(props) {
  const classes = useStyles();

  const { num, spaceName, couponTotCnt, couponStaffCheckCnt, couponConfirmOfferCnt, lastInfoDate } = props.status;

  const colorList = ["warning", "success", "danger", "info", "primary", "rose"];
  const color = colorList[num % 6];

  return (
    <GridItem xs={12} sm={6} md={3}>
        <Card>
        <CardHeader color={color} stats icon>
            <CardIcon color={color}>
            <Store />
            </CardIcon>
            <p className={classes.cardCategory}>{spaceName}</p>
            <h4 className={classes.cardTitle}><small>T {couponTotCnt}</small></h4>
            <h4 className={classes.cardTitle}><small>U {couponStaffCheckCnt}</small></h4>
            <h4 className={classes.cardTitle}><small>C {couponConfirmOfferCnt}</small></h4>
        </CardHeader>
        <CardFooter stats>
            <div className={classes.stats}>
            <DateRange />
            {lastInfoDate}
            </div>
        </CardFooter>
        </Card>
  </GridItem>
  );
}
