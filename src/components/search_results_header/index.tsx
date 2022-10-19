// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {AnyAction, bindActionCreators, Dispatch} from 'redux';

import {GlobalState} from 'src/types/store/index.js';

import {
    closeRightHandSide,
    toggleRhsExpanded,
    goBack,
} from 'src/actions/views/rhs';
import {getIsRhsExpanded, getPreviousRhsState} from 'src/selectors/rhs';
import {getCurrentChannelId} from 'mattermost-redux/selectors/entities/common';

import {RHSStates} from 'src/utils/constants';

import SearchResultsHeader from './search_results_header';

function mapStateToProps(state: GlobalState) {
    const previousRhsState = getPreviousRhsState(state);
    const canGoBack = previousRhsState === RHSStates.CHANNEL_INFO ||
        previousRhsState === RHSStates.CHANNEL_MEMBERS ||
        previousRhsState === RHSStates.CHANNEL_FILES ||
        previousRhsState === RHSStates.PIN;

    return {
        isExpanded: getIsRhsExpanded(state),
        channelId: getCurrentChannelId(state),
        previousRhsState,
        canGoBack,
    };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        actions: bindActionCreators({
            closeRightHandSide,
            toggleRhsExpanded,
            goBack,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsHeader);
