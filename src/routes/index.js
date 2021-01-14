// 페이지들을 구성하는 index.js // 두 번째로 근원적인 index.js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './main';
import North from './north';
import NorthAuth from './northAuth';
import West from './west';
import WestAuth from './westAuth';
import South from './south';
import SouthAuth from './southAuth';
import Test from './test';

export const EntryRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/north" component={North} />
            <Route path="/northAuth" component={NorthAuth} />
            <Route path="/west" component={West} />
            <Route path="/westAuth" component={WestAuth} />
            <Route path="/south" component={South} />
            <Route path="/southAuth" component={SouthAuth} />
            <Route path="/test" component ={Test} />
        </Switch>
    </BrowserRouter>
);
