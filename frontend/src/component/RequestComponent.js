import styles from './RequestComponent.module.scss';
import React, {useState} from 'react';

import {connect} from 'react-redux';
import {setAlert} from 'redux/actions/alertActions';

import {BiCopy} from 'react-icons/bi';
import {MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown} from 'react-icons/md';

export const RequestComponent = ({endpoint, title, description, setAlert}) => {

    const [open, setOpen] = useState(false);

    const onCopy = (value) => () => {
        navigator.clipboard.writeText(`https://meusic-api-app.herokuapp.com/api${value}`);
        setAlert("Copied Endpoint", "success");
    }
    
    return (
    <div className={styles.container}>

        <button className={styles.title} onClick={() => setOpen(!open)}> 
            <h3>{title}</h3>
            {open ? <MdOutlineKeyboardArrowDown/> : <MdOutlineKeyboardArrowRight/>}
        </button>

        {open &&
        <div>
            <br/>
            <p>{description}</p>
            <br/>
            <b>Endpoint</b>
            <p className={styles.endpoint} onClick={onCopy(endpoint)}>
                <span>https://meusic-api-app.herokuapp.com/api{endpoint}</span>
                <BiCopy/>
            </p> 
            <br/>
            <b>Results</b>
<pre>{`
{
    "status" : "success",
    "songs": [
        {
            "_id": "61f9bbc6894e0c389f366e32",
            "title": "Example title",
            "song": "Example Song",
            "url" : "Example Ipfs url",
            "duration": 345,
            "image": "Example url image",
            "createdAt": 2022-02-01T22:58:21.821+00:00
        }
        ...
    ]
}

`
}</pre>
        </div>
        }
    </div>
    );
}

const mapDispatchToProps = {
    setAlert
}

export default connect(null, mapDispatchToProps)(RequestComponent)