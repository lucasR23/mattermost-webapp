// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {GenericAction} from 'mattermost-redux/types/actions';
import {appsEnabled} from 'mattermost-redux/selectors/entities/apps';

import {toggleEmbedVisibility} from 'src/actions/post_actions';
import {isEmbedVisible} from 'src/selectors/posts';
import {GlobalState} from 'src/types/store';
import {PostWillRenderEmbedPluginComponent} from 'src/types/store/plugins';

import PostBodyAdditionalContent, {
    Props,
} from './post_body_additional_content';

function mapStateToProps(state: GlobalState, ownProps: Omit<Props, 'appsEnabled' | 'actions'>) {
    return {
        isEmbedVisible: isEmbedVisible(state, ownProps.post.id),
        pluginPostWillRenderEmbedComponents: state.plugins.components.PostWillRenderEmbedComponent as unknown as PostWillRenderEmbedPluginComponent[],
        appsEnabled: appsEnabled(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({toggleEmbedVisibility}, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostBodyAdditionalContent);
