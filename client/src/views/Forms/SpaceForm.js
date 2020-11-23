import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
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
import { post } from 'axios';

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
  }
};

const useStyles = makeStyles(styles);

export default function SpaceForm() {
  const classes = useStyles();

  const [state, handleInputChange] = useInputs({
    name: '',
    type: 'CAFE',
    code: ''
  });
  const { name, type, code } = state;

  const addSpace = () => {
      const url = '/api/spaces';
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('code', code);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }
      return post(url, formData, config);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log([name, type, code]);
    addSpace()
        .then((response) => {
            console.log(response.data);
            //this.props.stateRefresh();
        });
  };



  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create Space Page</h4>
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
              <Button color="primary" onClick={handleSubmit}>Create Space</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
