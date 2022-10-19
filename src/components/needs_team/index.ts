// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';
import {withRouter} from 'react-router-dom';

import {fetchAllMyTeamsChannelsAndChannelMembersREST, fetchMyChannelsAndMembersREST, viewChannel} from 'mattermost-redux/actions/channels';
import {getMyTeamUnreads, getTeamByName, selectTeam} from 'mattermost-redux/actions/teams';
import {getGroups, getAllGroupsAssociatedToChannelsInTeam, getAllGroupsAssociatedToTeam, getGroupsByUserIdPaginated} from 'mattermost-redux/actions/groups';
import {isCollapsedThreadsEnabled, isCustomGroupsEnabled} from 'mattermost-redux/selectors/entities/preferences';
import {getLicense, getConfig} from 'mattermost-redux/selectors/entities/general';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {getCurrentTeamId, getMyTeams} from 'mattermost-redux/selectors/entities/teams';
import {getCurrentChannelId} from 'mattermost-redux/selectors/entities/channels';
import {Action} from 'mattermost-redux/types/actions';

import {GlobalState} from 'src/types/store';

import {setPreviousTeamId} from 'src/actions/local_storage';
import {getPreviousTeamId} from 'src/selectors/local_storage';
import {shouldShowAppBar} from 'src/selectors/plugins';
import {loadStatusesForChannelAndSidebar} from 'src/actions/status_actions';
import {addUserToTeam} from 'src/actions/team_actions';
import {markChannelAsReadOnFocus} from 'src/actions/views/channel';
import {getSelectedThreadIdInCurrentTeam} from 'src/selectors/views/threads';
import {checkIfMFARequired} from 'src/utils/route';

import NeedsTeam from './needs_team';

type OwnProps = {
    match: {
        url: string;
    };
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const license = getLicense(state);
    const config = getConfig(state);
    const currentUser = getCurrentUser(state);
    const plugins = state.plugins.components.NeedsTeamComponent;
    const isCustomUserGroupsEnabled = isCustomGroupsEnabled(state);

    return {
        license,
        collapsedThreads: isCollapsedThreadsEnabled(state),
        mfaRequired: checkIfMFARequired(currentUser, license, config, ownProps.match.url),
        currentUser,
        currentTeamId: getCurrentTeamId(state),
        previousTeamId: getPreviousTeamId(state) as string,
        teamsList: getMyTeams(state),
        currentChannelId: getCurrentChannelId(state),
        plugins,
        selectedThreadId: getSelectedThreadIdInCurrentTeam(state),
        shouldShowAppBar: shouldShowAppBar(state),
        isCustomGroupsEnabled: isCustomUserGroupsEnabled,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, any>({
            fetchMyChannelsAndMembersREST,
            fetchAllMyTeamsChannelsAndChannelMembersREST,
            getMyTeamUnreads,
            viewChannel,
            markChannelAsReadOnFocus,
            getTeamByName,
            addUserToTeam,
            setPreviousTeamId,
            selectTeam,
            loadStatusesForChannelAndSidebar,
            getAllGroupsAssociatedToChannelsInTeam,
            getAllGroupsAssociatedToTeam,
            getGroupsByUserIdPaginated,
            getGroups,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NeedsTeam));
