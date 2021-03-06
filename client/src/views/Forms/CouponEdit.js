import React, { useState } from "react";
import { post } from 'axios';
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import useInputs from './useInputs';


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

export default function CouponEdit(props) {
  const classes = useStyles();

  const { selectedItems, selectedItem } = props;
  const { register, errors, handleSubmit } = useForm();

  const [state, handleInputChange] = useInputs({
    couponCode: selectedItem.couponCode,
    couponMenu: selectedItem.couponMenu,
    couponEndDate: selectedItem.couponEndDate
  });

  const [ open, setOpen ] = useState(false);

  const { couponCode, couponMenu, couponEndDate } = state;

  const editCoupon = () => {
    if(!selectedItems && selectedItems.length === 0) {
        return;
    }
    const url = '/api/coupons/update/' + selectedItems[0];
    const formData = new FormData();
    formData.append('couponId', selectedItems[0]);
    formData.append('couponCode', couponCode);
    formData.append('couponMenu', couponMenu);
    formData.append('couponEndDate', couponEndDate);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config);
  };


  const onSubmit = e => {
    //e.preventDefault();
    console.log([couponCode, couponMenu, couponEndDate]);
    editCoupon()
        .then((response) => {
            console.log(response.data);
            setOpen(false);
            props.stateRefresh();
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
        <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>쿠폰 수정</h4>
                        </CardHeader>
                        <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="코드"
                                id="couponCode"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                onChange={handleInputChange}
                                name="couponCode"
                                value={couponCode}
                                inputProps={{
                                  inputRef: register({ required: true }),
                                  placeholder: errors && errors.couponCode && "This field is required"
                                }}
                                error={errors && errors.couponCode ? true : undefined}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="메뉴"
                                id="couponMenu"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                onChange={handleInputChange}
                                name="couponMenu"
                                value={couponMenu}
                                inputProps={{
                                  inputRef: register({ required: true }),
                                  placeholder: errors && errors.couponMenu && "This field is required"
                                }}
                                error={errors && errors.couponMenu ? true : undefined}
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
                                  inputRef: register({ required: true }),
                                  placeholder: errors && errors.couponEndDate && "This field is required",
                                  type: "date",
                                  defaultValue: {couponEndDate}
                                }}
                                error={errors && errors.couponEndDate ? true : undefined}
                            />
                            </GridItem>
                        </GridContainer>
                        </CardBody>
                    </Card>
                    </GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>수정</Button>
                <Button variant="outlined" color="inherit" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
      
    </div>
  );
}
