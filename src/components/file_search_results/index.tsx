// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';

import {GenericAction} from 'mattermost-redux/types/actions';
import {getChannel} from 'mattermost-redux/selectors/entities/channels';
import {FileInfo} from '@mattermost/types/files';

import {GlobalState} from 'src/types/store';
import {FileDropdownPluginComponent} from 'src/types/store/plugins';

import {openModal} from 'src/actions/views/modals';

import FileSearchResultItem from './file_search_result_item';

export type OwnProps = {
    channelId: string;
    fileInfo: FileInfo;
    teamName: string;
    pluginMenuItems?: FileDropdownPluginComponent[];
};

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const channel = getChannel(state, ownProps.channelId);

    return {
        channelDisplayName: '',
        channelType: channel.type,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            openModal,
        }, dispatch),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FileSearchResultItem);
