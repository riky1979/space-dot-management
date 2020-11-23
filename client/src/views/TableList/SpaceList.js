import React from "react";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import Button from '@material-ui/core/Button';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SpaceTable from "./SpaceTable.js";
import SpaceAdd from "../Forms/SpaceAdd.js";

// const styles = {
//   cardCategoryWhite: {
//     "&,& a,& a:hover,& a:focus": {
//       color: "rgba(255,255,255,.62)",
//       margin: "0",
//       fontSize: "14px",
//       marginTop: "0",
//       marginBottom: "0"
//     },
//     "& a,& a:hover,& a:focus": {
//       color: "#FFFFFF"
//     }
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none",
//     "& small": {
//       color: "#777",
//       fontSize: "65%",
//       fontWeight: "400",
//       lineHeight: "1"
//     }
//   }
// };


let callApi = async () => {
  const response = await fetch('/api/spaces');
  const body = await response.json();
  return body;
};

// const convertToTableData = (data) => {
//   console.log(data);
//   // console.log(JSON.stringify(data));
//   if(data === '' || data.spaces.length === 0) {
//     return [["조회된 정보가 없습니다."]];
//   };
//   return data.spaces.map((s) => Object.values(s));
// };

const convertToTableData = (data) => {
  console.log(data);
  return data.spaces;
};


// const useStyles = makeStyles(styles);

// const useStyles2 = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

export default function SpaceList() {
  // const classes = useStyles();
  // const classes2 = useStyles2();
  const [spaces, setSpaces] = React.useState('');

  const callList = () => {
    callApi()
      .then(json => {
        console.log(json);
        setSpaces({spaces: json});
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    callList();
  }, []);

  const stateRefresh = () => {
    // console.log("call stateRefresh");
    callList();
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            {/* <h4 className={classes.cardTitleWhite}>공간 리스트</h4> */}
            {/* <p className={classes.cardCategoryWhite}>
              공간 관리를 위한 리스트
            </p> */}
            {/* <Button
              variant="contained"
              color="primary"
              className={classes2.button}
            >
              Create
            </Button> */}
            <SpaceAdd stateRefresh={stateRefresh} />
          </CardHeader>
          <CardBody>
            {spaces ? <SpaceTable tableData={convertToTableData(spaces)} stateRefresh={stateRefresh} /> : <span>loding...</span>}
            {/* <Table
              tableHeaderColor="primary"
              tableHead={["ID", "공간명", "코드", "타입", "생성일"]}
              tableData={convertToTableData(spaces)}
            /> */}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
