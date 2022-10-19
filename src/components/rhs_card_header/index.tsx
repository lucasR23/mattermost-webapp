// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {AnyAction, bindActionCreators, Dispatch} from 'redux';

import {GlobalState} from 'src/types/store';

import {
    showMentions,
    showSearchResults,
    showFlaggedPosts,
    showPinnedPosts,
    closeRightHandSide,
    toggleRhsExpanded,
} from 'src/actions/views/rhs';
import {getIsRhsExpanded} from 'src/selectors/rhs';

import RhsCardHeader from './rhs_card_header';

function mapStateToProps(state: GlobalState) {
    return {
        isExpanded: getIsRhsExpanded(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        actions: bindActionCreators({
            showMentions,
            showSearchResults,
            showFlaggedPosts,
            showPinnedPosts,
            closeRightHandSide,
            toggleRhsExpanded,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RhsCardHeader);
