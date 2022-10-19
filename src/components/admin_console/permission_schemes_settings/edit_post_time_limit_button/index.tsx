// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getConfig} from 'mattermost-redux/selectors/entities/general';

import {GlobalState} from 'src/types/store';

import {Constants} from 'src/utils/constants';

import EditPostTimeLimitButton from './edit_post_time_limit_button';

function mapStateToProps(state: GlobalState) {
    const {PostEditTimeLimit} = getConfig(state);

    return {
        timeLimit: PostEditTimeLimit ? parseInt(PostEditTimeLimit, 10) : Constants.UNSET_POST_EDIT_TIME_LIMIT,
    };
}

export default connect(mapStateToProps)(EditPostTimeLimitButton);
