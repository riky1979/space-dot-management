import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

class CouponConfirmOffer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            couponId: '',
            couponCode: '',
            stateRefresh: () => {}
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

    confirmOffer = () => {
        const { couponId } = this.props;
        console.log(`couponId : ${couponId}`);
        const url = '/api/coupon/confirmOffer';
        const formData = new FormData();
        formData.append('couponId', couponId);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    };
    
    
    handleSubmit = e => {
        console.log(this.props);
        e.preventDefault();
        // console.log("handleSubmit 1");
        this.confirmOffer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
                this.setState({
                    open: false,
                    couponId: '',
                    couponCode: '',
                    stateRefresh: () => {}
                });
            });
        // console.log("handleSubmit end");
    };

    render() {
        return (
            <div>
                <Tooltip title="Confirm">
                    <Button variant="contained" color="primary" onClick={this.handleClickOpen}>지급</Button>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        쿠폰코드({this.props.couponCode})
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            쿠폰 지급이 확인됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>지급 확인</Button>
                        <Button variant="outlined" color="inherit" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default CouponConfirmOffer;