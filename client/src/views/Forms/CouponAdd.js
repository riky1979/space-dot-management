import React, { useState } from "react";
import { post } from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import useInputs from './useInputs';
import moment from 'moment';
// import leftPad from '@bit/saschamz.react-native-helpers.left-pad';
import leftPad from './leftPad.js';

// import avatar from "assets/img/faces/marc.jpg";


// const styles = {
//   cardCategoryWhite: {
//     color: "rgba(255,255,255,.62)",
//     margin: "0",
//     fontSize: "14px",
//     marginTop: "0",
//     marginBottom: "0"
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none"
//   }
// };

// const useStyles = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
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
}));

let callApi = async (spaceId) => {
  const response = await fetch('/api/spaces/'+spaceId);
  const body = await response.json();
  return body;
};

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

export default function CouponAdd(props) {
  const classes = useStyles();

  const { spaceId } = props;

  // const [state, handleInputChange] = useInputs({
  const [state, setState] = React.useReducer(reducer, {
    couponId: '',
    couponCode: '',
    couponMenu: '',
    couponEndDate: moment(new Date()).format('YYYY-MM-DD'),
    staffCheck: '',
    confirmOffer: '',
  });
  const [ open, setOpen ] = useState(false);
  const { couponId, couponCode, couponMenu, couponEndDate, staffCheck, confirmOffer } = state;

  const handleInputChange = (e) => setState({ [e.target.name]: e.target.value });

  const callList = React.useCallback(() => {
    if(!spaceId) return;

    callApi(spaceId)
      .then(json => {
        console.log(json);
        
        if(json.length === 0) return;
        const space = json[0];

        handleInputChange({
            target: {
              name: 'couponCode',
              value: space.code + '-' + leftPad(space.couponCount, 5, '0') + '-'
            }
        });
      })
      .catch(err => console.log(err));
  }, [spaceId]);

  React.useEffect(() => {
    callList();
  }, [callList]);

  const addCoupon = () => {
      const url = '/api/coupons';
      const formData = new FormData();
      formData.append('spaceId', props.spaceId);
      formData.append('couponCode', couponCode);
      formData.append('couponMenu', couponMenu);
      formData.append('couponEndDate', couponEndDate);
      formData.append('staffCheck', staffCheck);
      formData.append('confirmOffer', confirmOffer);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }
      return post(url, formData, config);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log([couponCode, couponMenu, couponEndDate]);
    addCoupon()
        .then((response) => {
            console.log(response.data);
            setOpen(false);
            props.stateRefresh();
        });
  };

  const handleClickOpen = () => {
    setOpen(true);
    callList();
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
        <Button variant="contained" onClick={handleClickOpen}>
            쿠폰 추가
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create</DialogTitle>
            <DialogContent>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>쿠폰 추가</h4>
                        </CardHeader>
                        <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                            <input type="hidden" id={couponId} />
                            <CustomInput
                                labelText="코드"
                                id="couponCode"
                                formControlProps={{
                                fullWidth: true
                                }}
                                onChange={handleInputChange}
                                name="couponCode"
                                value={couponCode}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                            {/* <InputLabel style={{ color: "#AAAAAA" }}>Space Name</InputLabel> */}
                            <CustomInput
                                labelText="메뉴"
                                id="couponMenu"
                                formControlProps={{
                                fullWidth: true
                                }}
                                onChange={handleInputChange}
                                name="couponMenu"
                                value={couponMenu}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="유효기간"
                                id="couponEndDate"
                                formControlProps={{
                                fullWidth: true
                                }}
                                onChange={handleInputChange}
                                name="couponEndDate"
                                value={couponEndDate}
                                inputProps={{
                                  type: "date",
                                  defaultValue: {couponEndDate}
                                }}
                            />
                            </GridItem>
                        </GridContainer>
                        </CardBody>
                        <CardFooter>
                        {/* <Button color="primary" onClick={handleSubmit}>Create Space</Button> */}
                        </CardFooter>
                    </Card>
                    </GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSubmit}>추가</Button>
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
      
    </div>
  );
}
