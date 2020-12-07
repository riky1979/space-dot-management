import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

let callApi = async () => {
  // const orderBy = { 
  //   orderBy: 'createdDate', 
  //   order: 'DESC'
  // };
  const response = await fetch('/api/spaces?orderBy=name&order=ASC'
  /*, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'cors', // no-cors, cors, *same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(orderBy) // body data type must match "Content-Type" header
    }*/
    );
  const body = await response.json();
  return body;
};

export default function SelectSpace(props) {
  const classes = useStyles();

  const { onChange } = props;

//   const [ selectedSpace, setSelectedSpace ] = useState('');
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    callSpaceItems();
  }, []);

  const callSpaceItems = () => {
    callApi()
      .then(json => {
        console.log(json);
        setItems(json);
      })
      .catch(err => console.log(err));
  };

//   const renderSelectItems = (spaces) => {
//     let items = spaces.map((s) => {
//         return (<option key={s.id} value={s.id}>{s.name}</option>);
//     });
//     return items;
//   };

//   const handleChange = (event) => {
//     setSelectedSpace(event.target.value);
//   };

  return (
    <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-space-native-simple">Space</InputLabel>
        <Select
        native
        onChange={onChange}
        inputProps={{
            name: 'space',
            id: 'filled-space-native-simple',
        }}
        >
         <option aria-label="None" value=""></option>   
        {items ? items.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>)) : {}}
        </Select>
    </FormControl>
  );
}
