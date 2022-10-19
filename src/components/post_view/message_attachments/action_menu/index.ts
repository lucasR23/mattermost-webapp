// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect, ConnectedProps} from 'react-redux';

import {PostAction} from '@mattermost/types/integration_actions';

import {GlobalState} from 'src/types/store';
import {autocompleteChannels} from 'src/actions/channel_actions';
import {autocompleteUsers} from 'src/actions/user_actions';
import {selectAttachmentMenuAction} from 'src/actions/views/posts';

import ActionMenu from './action_menu';

export type OwnProps = {
    postId: string;
    action: PostAction;
    disabled?: boolean;
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const actions = state.views.posts.menuActions[ownProps.postId];
    const selected = (ownProps.action && ownProps.action.id) ? actions && actions[ownProps.action && ownProps.action.id] : undefined;

    return {
        selected,
    };
}

const mapDispatchToProps = {
    selectAttachmentMenuAction,
    autocompleteChannels,
    autocompleteUsers,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ActionMenu);
