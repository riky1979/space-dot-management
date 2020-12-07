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

let callApi = async () => {
  const response = await fetch('/api/spaces');
  const body = await response.json();
  return body;
};

// const convertToTableData = (data) => {
//   console.log(data);
//   return data.spaces;
// };

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

export default function SpaceList() {
  // const classes = useStyles();
  const [spaces, setSpaces] = React.useState('');
  // console.log('searchKeyword:'+searchKeyword);
  //const [searchKeyword, setSearchKeyword] = React.useState('');

  // const [data, setData] = React.useState({
  //   spaces: '',
  //   searchKeyword: '',
  // });

  // const { spaces, searchKeyword } = data;

  const callList = () => {
    callApi()
      .then(json => {
        console.log(json);
        setSpaces(json);
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

  const filteredSpaces = (data) => {
    // if(searchKeyword) {
    //   data = data.filter((c) => {
    //     return c.name.indexOf(searchKeyword) > -1;
    //   });
    // }
    return <SpaceTable tableData={data} stateRefresh={stateRefresh} />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <SpaceAdd stateRefresh={stateRefresh} />
          </CardHeader>
          <CardBody>
            {spaces ? filteredSpaces(spaces) : <span>loding...</span>}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
