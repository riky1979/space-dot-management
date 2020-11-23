import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomerAdd from "views/Forms/CustomerAdd.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


let callApi = async () => {
  const response = await fetch('/api/customers');
  const body = await response.json();
  return body;
};

const convertToTableData = (c) => {
  console.log('customers!!');
  console.log(c);
  // console.log(JSON.stringify(c));
  if(c === '' || c.customers.length === 0) {
    return [["ID", "Name", "Country", "City", "Salary"]];
  };
  return c.customers.map((customer) => Object.values(customer));
};



const useStyles = makeStyles(styles);

export default function CoffeeList() {
  const classes = useStyles();
  // let state = {
  //   customers: null
  // };
  const [customers, setCustomers] = React.useState('');
  // const [completed, setCompleted] = React.useState(0);
  // const [searchKeyword, setSearchKeyword] = React.useState('');

  const onloadComponent = () => {
    console.log("callApi() 준비!!!");
    callApi()
      .then(json => {
        console.log("callApi() 실행!!!");
        console.log(json);
        // state.customers = json
        setCustomers({customers: json});
      })
      .catch(err => console.log(err));
  };



  React.useEffect(() => {
    onloadComponent();
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Coffee List</h4>
            <p className={classes.cardCategoryWhite}>
              등록된 카페 목록입니다.
            </p>
            <CustomerAdd />
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "카페코드", "카페명", "발행쿠폰", "쿠폰사용", "생성일"]}
              tableData={[
                ["1", "star001", "스타벅스 불광점", "50", "20", "2020.10.12"],
                ["2", "ediya001", "이디야 연신내점", "20", "5", "2020.11.14"],
                ["3", "pas001", "파스구찌 구파발점", "30", "6", "2020.11.18"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
          <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={convertToTableData(customers)}
            />
          {/* {customers ? 
            (<Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[['조회된 정보가 없습니다.']]}
            />) : 
            (<Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={customersInstanceToArrary(customers)}
            />)} */}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
