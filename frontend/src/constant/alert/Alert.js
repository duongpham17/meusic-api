import styles from './Alert.module.scss';
import React from 'react';
import {connect} from 'react-redux';

const Alert = ({alerts}) =>

    <div className={styles.container}>
    {alerts?.map(el => 
        <p key={el.id} className={`${styles.alert} ${styles[`alert-${el.alertType || "primary"}`]}`}>
            {el.message}
        </p>
    )}
    </div>

const mapStateToProps = state => ({
    alerts: state.alertReducers
});

export default connect(mapStateToProps)(Alert)