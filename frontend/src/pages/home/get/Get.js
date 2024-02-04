import styles from './Get.module.scss';
import React from 'react';
import RequestComponent from 'component/RequestComponent';

export const GetRequest = () =>
(
    <div className={styles.container}>
      <h2>GET Request</h2>

      <RequestComponent 
        endpoint="/" 
        title="Get All songs" 
      />

      <RequestComponent 
        endpoint="/limit/{limit}"
        title="Limit songs results" 
        description="Query - Change {limit} - for - number"
      />

      <RequestComponent 
        endpoint="/title/{title}" 
        title="Search songs based on title" 
        description="Query - Change {title} - for - string"
      />

      <RequestComponent 
        endpoint="/artist/{artist}" 
        title="Search songs based on artist" 
        description="Query - Change {artist} - for - string"
      />

    </div>
)

export default GetRequest