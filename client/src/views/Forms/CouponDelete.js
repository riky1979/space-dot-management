import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class CouponDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    deleteCoupon = () => {
        const { selectedItems } = this.props;
        console.log(selectedItems);
        selectedItems.map((id) => {
            const url = '/api/coupons/' + id;
            fetch(url, {
                method: 'DELETE'
            });
            console.log(id);
            return false;
        });
        this.props.stateRefresh();
        this.setState({
            open: false
        })
    };

    render() {
        return (
            <div>
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={this.handleClickOpen}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.deleteCoupon}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default CouponDelete;