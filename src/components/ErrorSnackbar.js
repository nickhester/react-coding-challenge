import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';
import * as Constants from './Contants';

export default function ErrorSnackbar(props) {
    const styles = useStyles();
    return (
        <Snackbar
          open={props.snackbarIsOpen}
          autoHideDuration={2000}
          onClose={props.onClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
            <Card style={styles.root} raised>
                <IconButton size="small" onClick={props.onClose} style={styles.close}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                <div style={styles.text}>
                    {props.children}
                </div>
            </Card>
        </Snackbar>
    );
}

function useStyles() {
    return {
        root: {
            backgroundColor: Constants.red,
            display: 'flex',
            minHeight: '40px',
            width: '400px',
            padding: '10px'
        },
        close: {
            
        },
        text: {
            ...Constants.paragraphStyle,
            margin: 'auto 5px'
        }
    }
};

ErrorSnackbar.propTypes = {
    snackbarIsOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}