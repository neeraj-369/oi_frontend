import * as React from 'react';
import { Outlet } from 'react-router-dom';

function Applications() {
    return (
        <div id="Application">
        <h1>Applications</h1>
        <div id="app-details" style={{paddingTop:"5px"}}><Outlet /></div>
        </div>
    )
}

export default Applications;