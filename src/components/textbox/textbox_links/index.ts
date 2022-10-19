// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'src/types/store';

import {getCurrentLocale} from 'src/selectors/i18n';

import TextboxLinks from './textbox_links';

function mapStateToProps(state: GlobalState) {
    return ({
        currentLocale: getCurrentLocale(state),
    });
}

export default connect(mapStateToProps)(TextboxLinks);
