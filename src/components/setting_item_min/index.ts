// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getIsMobileView} from 'src/selectors/views/browser';

import {GlobalState} from 'src/types/store';

import SettingItemMin from './setting_item_min';

function mapStateToProps(state: GlobalState) {
    return {
        isMobileView: getIsMobileView(state),
    };
}

export default connect(mapStateToProps)(SettingItemMin);
