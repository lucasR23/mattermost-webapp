// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentUserId} from 'mattermost-redux/selectors/entities/users';
import {makeGetUserTimezone} from 'mattermost-redux/selectors/entities/timezone';

import {getCurrentDateForTimezone} from 'src/utils/timezone';
import {areTimezonesEnabledAndSupported} from 'src/selectors/general';
import {getCurrentLocale} from 'src/selectors/i18n';

import {GlobalState} from 'src/types/store';

import SearchDateSuggestion from './search_date_suggestion';

function makeMapStateToProps() {
    const getUserTimezone = makeGetUserTimezone();

    return (state: GlobalState) => {
        const currentUserId = getCurrentUserId(state);
        const userTimezone = getUserTimezone(state, currentUserId);
        const locale = getCurrentLocale(state);

        const enableTimezone = areTimezonesEnabledAndSupported(state);

        let currentDate;
        if (enableTimezone) {
            if (userTimezone.useAutomaticTimezone) {
                currentDate = getCurrentDateForTimezone(userTimezone.automaticTimezone);
            } else {
                currentDate = getCurrentDateForTimezone(userTimezone.manualTimezone);
            }
        }

        return {
            currentDate,
            locale,
        };
    };
}

export default connect(makeMapStateToProps)(SearchDateSuggestion);
