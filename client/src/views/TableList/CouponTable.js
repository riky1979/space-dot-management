import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
import CouponDelete from "../Forms/CouponDelete.js";
import CouponEdit from "../Forms/CouponEdit.js";
import CouponStaffCheckCancel from "../Forms/CouponStaffCheckCancel.js";
import CouponConfirmOffer from "../Forms/CouponConfirmOffer.js";
import CouponCancelOffer from "../Forms/CouponCancelOffer.js";
import CouponPreview from "../Forms/CouponPreview.js";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'createdDate', numeric: false, disablePadding: false, label: '발급일' },
  { id: 'couponCode', numeric: false, disablePadding: true, label: '코드' },
  { id: 'couponMenu', numeric: false, disablePadding: false, label: '메뉴' },
  // { id: 'couponStartDate', numeric: false, disablePadding: false, label: '기한(시작)' },
  { id: 'couponEndDate', numeric: false, disablePadding: false, label: '유효기간' },
  { id: 'staffCheck', numeric: false, disablePadding: false, label: '직원확인' },
  { id: 'confirmOffer', numeric: false, disablePadding: false, label: '지급확인' },
  { id: 'hashCode', numeric: false, disablePadding: false, label: '보기' },
];

function CouponTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.headFont}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.headFont}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

CouponTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const CouponTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selectedItems, stateRefresh, selectedItem, spaceId } = props;

  const displayButton = () => {
    if(numSelected === 0) {
      return (
        <span></span>
      );
    } else if(numSelected === 1) {
      return (
        <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            className={classes.root}
          >
          <Grid item>
            <CouponEdit selectedItems={selectedItems} stateRefresh={stateRefresh} selectedItem={selectedItem} spaceId={spaceId} />
          </Grid>
          <Grid item>
            <CouponDelete selectedItems={selectedItems} stateRefresh={stateRefresh} spaceId={spaceId} />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <CouponDelete selectedItems={selectedItems} stateRefresh={stateRefresh} />
      );
    }
    

  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          LIST
        </Typography>
      )}

      {displayButton()}
    </Toolbar>
  );
};

CouponTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  headFont : {
      fontWeight: 'bold',
      color: '#9c27b0',
  }
}));

export default function CouponTable(props) {
  const classes = useStyles();
  const { spaceId, tableData, stateRefresh } = props;
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdDate');
  const [selected, setSelected] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedItem, setSelectedItem] = React.useState({
    couponId: '',
    couponCode: '',
    couponMenu: '',
    couponEndDate: '',
  });

  let emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  React.useEffect(() => {
    setSelected([]);
    setSelectedItems([]);
    setSelectedItem({
      couponId: '',
      couponCode: '',
      couponMenu: '',
      couponEndDate: '',
    });
  }, [tableData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n.couponId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
    setSelectedItems([]);
  };

  const handleClick = (event, id, code, menu, endDate) => {    
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let newSelecteditems = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newSelecteditems = newSelecteditems.concat(selectedItems, {couponId: id, couponCode: code, couponMenu: menu, couponEndDate: endDate});
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelecteditems = newSelecteditems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelecteditems = newSelecteditems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newSelecteditems = newSelecteditems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    setSelectedItems(newSelecteditems);

    if(newSelecteditems.length === 1) {
        setSelectedItem(newSelecteditems[0]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const selectedStateRefresh = () => {
      setSelected([]);
      setSelectedItems([]);
      setSelectedItem({
        couponId: '',
        couponCode: '',
        couponMenu: '',
        couponEndDate: '',
      });
      stateRefresh();
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const displayConfirmOfferField = (confirmOffer, staffCheck, id, code) => {
    //{row.confirmOffer}{row.confirmOffer ? <CouponCancelOffer couponId={row.couponId} couponCode={row.couponCode} stateRefresh={selectedStateRefresh} /> : <CouponConfirmOffer couponId={row.couponId} couponCode={row.couponCode} stateRefresh={selectedStateRefresh} />}
    if(staffCheck) {
      if(confirmOffer) {
        return (<div>{confirmOffer}<CouponCancelOffer couponId={id} couponCode={code} stateRefresh={selectedStateRefresh} /></div>);
      } else {
        return (<CouponConfirmOffer couponId={id} couponCode={code} stateRefresh={selectedStateRefresh} />);
      }
    }

    return (confirmOffer);
  };
  




  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CouponTableToolbar numSelected={selected.length} selectedItems={selected} stateRefresh={selectedStateRefresh} selectedItem={selectedItem} spaceId={spaceId} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <CouponTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.couponId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.couponId, row.couponCode, row.couponMenu, row.couponEndDate)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.couponId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" key={row.couponId}>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.createdDate}</TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.couponCode}
                      </TableCell>
                      <TableCell align="left">{row.couponMenu}</TableCell>
                      <TableCell align="left">{row.couponEndDate}</TableCell>
                      <TableCell align="left">{row.staffCheck ? <div>{row.staffCheck} <CouponStaffCheckCancel couponId={row.couponId} couponCode={row.couponCode} stateRefresh={selectedStateRefresh} /></div> : <span></span>}</TableCell>
                      <TableCell align="left">{displayConfirmOfferField(row.confirmOffer, row.staffCheck, row.couponId, row.couponCode)}</TableCell>
                      <TableCell align="left"><CouponPreview hashCode={row.hashCode} stateRefresh={selectedStateRefresh} /></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}