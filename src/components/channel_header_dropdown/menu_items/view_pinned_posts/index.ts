// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {GenericAction} from 'mattermost-redux/types/actions';

import {GlobalState} from 'src/types/store';

import {closeRightHandSide, showPinnedPosts} from 'src/actions/views/rhs';
import {getRhsState} from 'src/selectors/rhs';
import {RHSStates} from 'src/utils/constants';

import ViewPinnedPosts from './view_pinned_posts';

const mapStateToProps = (state: GlobalState) => ({
    hasPinnedPosts: getRhsState(state) === RHSStates.PIN,
});

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => ({
    actions: bindActionCreators({
        closeRightHandSide,
        showPinnedPosts,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPinnedPosts);
