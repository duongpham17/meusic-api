import styles from './Information.module.scss';
import React from 'react';
import {BiCopy} from 'react-icons/bi';
import { setAlert } from 'redux/actions/alertActions';
import {connect} from 'react-redux';

const Information = ({setAlert}) => {

    const onCopy = () => () => {
        navigator.clipboard.writeText("https://meusic-api-app.herokuapp.com/api/public");
        setAlert("Copied", "success");
    }

    return (
        <div className={styles.container}>
            <p>
                <span>URL - https://meusic-api-app.herokuapp.com/api/public</span>
                <button onClick={onCopy}><BiCopy/></button>
            </p>
        </div>
    )
}

const mapDispatchToProps = {
    setAlert
}

export default connect(null, mapDispatchToProps)(Information)