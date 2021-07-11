/*eslint no-undef: "off"*/
/*eslint no-unused-vars: "off"*/


import '@babel/polyfill';
import * as $ from 'jquery';

import React from 'react';
import { render } from 'react-dom';

import Post from "@model/post";
import json from "@assets/data";
import webpackLogo from "@assets/webpack.png";

import '@css/style.css';
import './less/style.less';
import './sass/style.scss';
import './sass/style.sass';

const post = new Post('Webpack Post Title', webpackLogo);

console.log('JSON: ', json);

async function start() {
  return await new Promise((r) => setTimeout(() => r('Async done.'), 2000));
}

start().then(res => console.log(res));

class Util {
  static id = Date.now();
}
console.log('Util Id:', Util.id);

const App = () => (
  <div className="container">
    <h1>Webpack training</h1>
    <div className="webpack-logo" />
    <pre />
    <div className="less">
      <h2>Less</h2>
    </div>
    <div className="scss">
      <h2>scss</h2>
    </div>
    <div className="sass">
      <h2>sass</h2>
    </div>
  </div>
);

render(<App />, document.querySelector('#root'));

$('pre').addClass('code').html(post.toString());

import '@model/lodash';