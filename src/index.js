import React from 'react';
import ReactDOM from 'react-dom';
import { EntryRoute } from './routes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <React.StrictMode>
        <EntryRoute />
    </React.StrictMode>,
    document.getElementById('root')
);
