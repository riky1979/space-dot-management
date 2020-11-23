import React, { useState, useEffect, useCallback } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";
// import FormHelperText from '@material-ui/core/FormHelperText';
import SelectSpace from "../Controller/SelectSpace.js";
import CouponTable from "./CouponTable.js";
import CouponAdd from "../Forms/CouponAdd.js";



const useStyles = makeStyles((theme) => ({
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
  const response = await fetch('/api/couponsBySpace/'+spaceId);
  const body = await response.json();
  return body;
};

const convertToTableData = (data) => {
  console.log(data);
  return data.coupons;
};




export default function CouponList() {
  const classes = useStyles();

  const [coupons, setCoupons] = useState('');
  // const childStateInit = React.useRef(false);

  const [selectedSpace, setSelectedSpace] = useState({
    spaceValue: '',
    spaceText: ''
  });
  // const [spaceName, setSpaceName] = useState('');
  //const { spaceValue, spaceText } = selectedSpace;

  // const tableComp = React.useRef();

  
  const handleChange = (event) => {
    const selecedText = event.target.selectedOptions[0].text ? event.target.selectedOptions[0].text : "선택된 공간이 없습니다.";
    setSelectedSpace({
      spaceValue: event.target.value,
      spaceText: selecedText
    });
  };

  const callList = useCallback(() => {
    if(!selectedSpace.spaceValue) return;

    callApi(selectedSpace.spaceValue)
      .then(json => {
        console.log(json);
        setCoupons({coupons: json});
      })
      .catch(err => console.log(err));
  }, [selectedSpace.spaceValue]);

  useEffect(() => {
    callList();
  }, [callList]);

  const stateRefresh = () => {
    // console.log("call stateRefresh");
    callList();
    // childStateInit.current = true;
    // this.funcComRef(childStateInit.current);
    // childStateInit.current = false;
  };

  return (
    <div><SelectSpace onChange={handleChange} />
    {selectedSpace.spaceValue ? 
    (<GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>쿠폰 리스트({selectedSpace.spaceText})</h4>
            <CouponAdd stateRefresh={stateRefresh} spaceId={selectedSpace.spaceValue} />
          </CardHeader>
          <CardBody>
            {coupons ? <CouponTable spaceId={selectedSpace.spaceValue} tableData={convertToTableData(coupons)} stateRefresh={stateRefresh} /> : <span>loding...</span>}
            {/* forwardRef={c => { this.funcComRef = c }}  */}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>)
    : <h3>공간을 선택하세요</h3>
    }
    </div>
  );
}
