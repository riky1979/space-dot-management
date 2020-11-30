import React from "react";
import { post } from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

// import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  dotted: {
    border: "4px dotted orange",
    borderStyle: "none none dotted"
  },
  bold: {
    fontWeight: "bold"
  },
  minusMargin30: {
    marginBottom: "-30px"
  },
  minusMargin12: {
    marginTop: "-12px"
  },
  minusMargin1: {
    marginBottom: "-1px"
  },
  spaceName: {
    paddingTop: "160px"
  },
  expired: {
    color: "#c83349"
  },
  button: {
    width: "60%",
    fontWeight: "bold"
  },
  container: {
    minWidth: "270px"
  },
  coupon_top_bg: {
    backgroundImage: "url('../../coupon_bg.PNG')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top"
  }
};

let callApi = async (hashCode) => {
  const response = await fetch('/api/coupon/'+hashCode);
  const body = await response.json();
  return body;
};


const useStyles = makeStyles(styles);

export default function Coupon({ match }) {
  // console.log(match);
  // console.log(JSON.stringify(match));
  const { hashCode } = match.params;
  // console.log(hashCode);

  const classes = useStyles();

  const [ coupon, setCoupon ] = React.useState('');
  const [ open, setOpen ] = React.useState(false);
  const { spaceId, spaceName, couponCode, couponMenu, couponEndDate, isExpired, usedCoupon, image } = coupon;

  const callCoupon = React.useCallback(() => {
    callApi(hashCode)
      .then(json => {
        console.log(json);
        if(json && json.length > 0)
        setCoupon(json[0]);
      })
      .catch(err => console.log(err));
  }, [hashCode]);

  React.useEffect(() => {
    callCoupon();
  }, [callCoupon]);

  const useCoupon = () => {
    console.log(`hashCode : ${hashCode}`);
    const url = '/api/coupon/use';
    const formData = new FormData();
    formData.append('hashCode', hashCode);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config);
  };


  const handleSubmit = e => {
    // e.preventDefault();
    // console.log("handleSubmit 1");
    useCoupon()
        .then((response) => {
            // console.log(response.data);
            setOpen(false);
            callCoupon();
        });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {spaceId ?
      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardBody profile className={classes.coupon_top_bg} style={image ? { backgroundImage: `url(${image})` } : null}>
              <h3 className={`${classes.cardTitle} ${classes.bold} ${classes.spaceName}`}>{spaceName}</h3>
              <h3 className={classes.cardTitle}>CODE : {couponCode}</h3>
              <hr className={classes.dotted}></hr>
              <h2 className={`${classes.cardTitle} ${classes.bold} ${classes.minusMargin30}`}>[쿠폰]{couponMenu}</h2>
              <h6 className={`${classes.bold} ${classes.expired} ${classes.minusMargin1}`}>사용 만료일 {couponEndDate}</h6>
              
              {usedCoupon ? 
              <div>
                <p className={classes.description}>
                쿠폰 사용이 완료되었습니다.<br></br>
                사용 후 1주일 이내에 PayBack 해드립니다.
                </p>
                <Button variant="outlined" color="default" className={classes.button}>
                  쿠폰 사용 완료
                </Button>
              </div>
              : 
                  isExpired ? 
                  <div>
                    <p className={classes.description}>
                    사용기간 종료된 쿠폰 입니다.
                    </p>
                    <Button variant="outlined" color="default" className={classes.button}>
                    쿠폰 사용기간 만료
                  </Button>
                  </div>
                  
                  : 
                  <div>
                    <p className={classes.description}>
                    Coffee 전용 쿠폰 입니다. 사용시 직원분께 보여주세요.<br></br>
                    사용 후 1주일 이내에 PayBack 해드립니다.
                    </p>
                    <Button color="primary" className={classes.button} onClick={handleClickOpen}>
                      직원 확인
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle onClose={handleClose}>
                          쿠폰 사용
                      </DialogTitle>
                      <DialogContent>
                          <Typography gutterBottom>
                              [확인]시 쿠폰이 사용처리 됩니다.
                          </Typography>
                      </DialogContent>
                      <DialogActions>
                          <Button variant="contained" color="primary" onClick={handleSubmit}>확인</Button>
                          <Button variant="outlined" color="inherit" onClick={handleClose}>취소</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
              }
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
       : <span></span>}
    </div>
  );
}
