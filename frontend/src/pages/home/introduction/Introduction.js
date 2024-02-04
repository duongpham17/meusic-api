import styles from './Introduction.module.scss';
import React from 'react';

const Introduction = () => {
  return (
    <div className={styles.container}>
        <p><b>Introduction</b></p>
        <br/>
        <p>Disclaimer this api is for fun and personal use only.</p>
        <br/>
        <p>This api can be used to fetch songs users have uploaded. These songs are stored in a decentralised network.</p>
        <p>Service used to store the song data and url - <a href="https://nft.storage" target="_blank" rel="noreferrer noopener">nft.storage</a></p>
        <br/>
        <p>Before using the api these are the ISSUES you will encounter</p>
        <p>- Loading the url content like songs / images will have delays, depending on network congestion</p>
        <p>- Once the file is fetched and loaded you can reuse the file extremely fast. However, if files are not used often files will need to be refeteched and loaded up again. </p>
        <p>- Can be very slow if trying to stream large MBS (megabytes) </p>
        <br/>
        <p>Good luck</p>
    </div>
  )
}

export default Introduction