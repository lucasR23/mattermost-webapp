// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import App from 'components/app';

console.log('LOADING MATTERMOST')
require('react-dom');
window.React2 = require('react');
console.log('REACT inside mattermost:', window.React1 === window.React2, window.React1, window.React2);
console.log('REACT inside mattermost2:', window.React3 === window.React2, window.React3, window.React2);

export default App;
