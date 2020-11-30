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
// import CardFooter from "components/Card/CardFooter.js";
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
    hidden: {
      display: 'none'
    },
}));

export default function SpaceAdd(props) {
  const classes = useStyles();

  const [state, handleInputChange] = useInputs({
    name: '',
    type: 'CAFE',
    code: '',
    file: '',
    fileName: '',
  });
  const [ open, setOpen ] = useState(false);
  const { name, type, code, file, fileName } = state;

  const addSpace = () => {
      const url = '/api/spaces';
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('code', code);
      formData.append('image', file);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }
      return post(url, formData, config);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log([name, type, code, file]);
    addSpace()
        .then((response) => {
            console.log(response.data);
            setOpen(false);
            props.stateRefresh();
        });
  };

  const handleFileChange = (e) => {
    handleInputChange({
      target: {
        name: 'file',
        value: e.target.files[0]
      }
    });

    handleInputChange({
      target: {
        name: 'fileName',
        value: e.target.value
      }
    });
  }

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
        <Button variant="contained" onClick={handleClickOpen}>
            공간 추가
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create</DialogTitle>
            <DialogContent>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>공간 추가</h4>
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
                            <GridItem xs={12} sm={12} md={6}>
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
                            <GridItem xs={12} sm={12} md={6}>
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
                            <GridItem xs={12} sm={12} md={12}>
                              <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={file} value={fileName} onChange={handleFileChange}/><br/>
                              <label htmlFor="raised-button-file">
                                  <Button variant="contained" color="primary" component="span" name="file">
                                      {fileName === "" ? "이미지 선택" : fileName}
                                  </Button>
                                  <span>&nbsp;이미지 : 350 X 246</span>
                              </label>
                            </GridItem>
                        </GridContainer>
                        </CardBody>
                    </Card>
                    </GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSubmit}>추가</Button>
                <Button variant="outlined" color="inherit" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
      
    </div>
  );
}
