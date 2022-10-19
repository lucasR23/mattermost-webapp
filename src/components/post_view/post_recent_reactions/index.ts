// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {getEmojiMap} from 'src/selectors/emojis';
import {getCurrentLocale} from 'src/selectors/i18n';
import {GlobalState} from 'src/types/store';
import {GenericAction} from 'mattermost-redux/types/actions';

import {addReaction} from 'src/actions/post_actions';
import {Emoji} from '@mattermost/types/emojis';

import PostReaction from './post_recent_reactions';

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            addReaction,
        }, dispatch),
    };
}

function mapStateToProps(state: GlobalState) {
    const locale = getCurrentLocale(state);
    const emojiMap = getEmojiMap(state);
    const defaultEmojis = [emojiMap.get('thumbsup'), emojiMap.get('grinning'), emojiMap.get('white_check_mark')] as Emoji[];

    return {
        defaultEmojis,
        locale,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostReaction);
