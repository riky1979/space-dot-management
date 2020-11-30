import React from 'react';
// import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Coupon from "./Coupon.js";
import { CopyToClipboard } from 'react-copy-to-clipboard';

class CouponPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            // clipBoard: '',
            copied: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
            copied: false
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
            copied: false
        });
        this.props.stateRefresh();
    };

    // handleLinkCopy = () => {
    //     this.setState({clipBoard: this.props.hashCode});
    // };

    handleCopy = () => {
        this.setState({
            copied: true
        });
    };
    

    render() {
        // console.log('hashCode:', this.props.hashCode);
        const param = {
            'params': {
                'hashCode': this.props.hashCode
            }
        };

        const url = window.location.protocol + '//' + window.location.host + '/coupon/' + this.props.hashCode;

        return (
            <div>
                <Tooltip title="Preview">
                    <Button variant="contained" color="default" onClick={this.handleClickOpen}>보기</Button>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <Coupon match={param}/>
                    <DialogActions>
                        <CopyToClipboard text={url} onCopy={this.handleCopy}>
                            <Button variant="outlined" color="default">링크복사</Button>
                        </CopyToClipboard>
                        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                        <Button variant="outlined" color="inherit" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default CouponPreview;