import React, { useState } from "react";
import { post } from 'axios';
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
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import useInputs from './useInputs';

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

export default function SpaceEdit(props) {
  const classes = useStyles();

  const { selectedItems, selectedItem } = props;

  const [state, handleInputChange] = useInputs({
    name: selectedItem.name,
    type: selectedItem.type,
    code: selectedItem.code
  });

  const [ open, setOpen ] = useState(false);

  const { name, type, code } = state;

  const editSpace = () => {
    if(!selectedItems && selectedItems.length === 0) {
        return;
    }
    const url = '/api/spaces/update/' + selectedItems[0];
    const formData = new FormData();
    formData.append('id', selectedItems[0]);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('code', code);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config);
  };


  const handleSubmit = e => {
    e.preventDefault();
    console.log([name, type, code]);
    editSpace()
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
                        <h4 className={classes.cardTitleWhite}>공간 수정</h4>
                        </CardHeader>
                        <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Space Name"
                                id="name"
                                formControlProps={{
                                fullWidth: true
                                }}
                                onChange={handleInputChange}
                                name="name"
                                value={name}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                            {/* <InputLabel style={{ color: "#AAAAAA" }}>Space Name</InputLabel> */}
                            <CustomInput
                                labelText="Space Type"
                                id="type"
                                formControlProps={{
                                fullWidth: true
                                }}
                                onChange={handleInputChange}
                                name="type"
                                value={type}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Space Code"
                                id="code"
                                formControlProps={{
                                fullWidth: true
                                }}
                                onChange={handleInputChange}
                                name="code"
                                value={code}
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
                <Button variant="contained" color="primary" onClick={handleSubmit}>수정</Button>
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
      
    </div>
  );
}
