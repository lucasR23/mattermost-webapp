// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentRelativeTeamUrl} from 'mattermost-redux/selectors/entities/teams';
import {getConfig} from 'mattermost-redux/selectors/entities/general';

import {getSelectedPostCard} from 'src/selectors/rhs';
import {getIsMobileView} from 'src/selectors/views/browser';

import {GlobalState} from 'src/types/store';

import RhsCard from './rhs_card';

function mapStateToProps(state: GlobalState) {
    const selected = getSelectedPostCard(state);
    const config = getConfig(state);
    const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';

    return {
        enablePostUsernameOverride,
        isMobileView: getIsMobileView(state),
        selected,
        pluginPostCardTypes: state.plugins.postCardTypes,
        teamUrl: getCurrentRelativeTeamUrl(state),
    };
}

export default connect(mapStateToProps)(RhsCard);
