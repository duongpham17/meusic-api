import styles from './Information.module.scss';
import React from 'react';
import {BiCopy} from 'react-icons/bi';
import {setAlert} from 'redux/actions/alertActions';
import {connect} from 'react-redux';

const Information = ({setAlert}) => {

    const url = process.env.REACT_APP_PRODUCTION_PORT_API;
    const publicUrl = `${url}/api/public`;

    const onCopy = () => () => {
        navigator.clipboard.writeText(publicUrl);
        setAlert("Copied", "success");
    }

    return (
        <div className={styles.container}>
            <p>
                <span>URL - {publicUrl}</span>
                <button onClick={onCopy}><BiCopy/></button>
            </p>
        </div>
    )
}

const mapDispatchToProps = {
    setAlert
}

export default connect(null, mapDispatchToProps)(Information)