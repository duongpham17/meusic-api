import styles from './Get.module.scss';
import React from 'react';
import RequestComponent from 'component/RequestComponent';

export const GetRequest = () => {
  return (
    <div className={styles.container}>
      <h2>GET Request</h2>

      <RequestComponent endpoint="songs" description="New songs" />

      <RequestComponent endpoint="songs/all" description="All songs" />

      <RequestComponent endpoint="songs/limit/:limit" description="Limit songs results" />

      <RequestComponent endpoint="songs/search/:title" description="Search songs" />

    </div>
  )
}

export default GetRequest