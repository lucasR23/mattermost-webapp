// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
module.exports = () => ({
    presets: [],
    plugins: [
        'lodash',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        'react-hot-loader/babel',
        'babel-plugin-typescript-to-proptypes',
        [
            'babel-plugin-styled-components',
            {
                ssr: false,
                fileName: false,
            },
        ],
    ],
});
