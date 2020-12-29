// 페이지들을 구성하는 index.js // 두 번째로 근원적인 index.js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './main';
import North from './north';
import West from './west';
import South from './south';

export const EntryRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/north" component={North} />
            <Route path="/west" component={West} />
            <Route path="/south" component={South} />
        </Switch>
    </BrowserRouter>
);
