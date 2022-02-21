import styles from './Pages.module.scss';
import React from 'react';

import {Routes, Route} from 'react-router-dom';
import Home from 'pages/home';
import Unknown from 'pages/unknown';

export const Pages = () => 
(
    <div className={styles.container}>
        <Routes>
            <Route exact path="/" element={<Home/>} />

            <Route path="*" element={<Unknown />} />  
        </Routes>
    </div>
)

export default Pages;