// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ActionTypes} from 'src/utils/constants';

export function setProductMenuSwitcherOpen(open: boolean) {
    return {
        type: ActionTypes.SET_PRODUCT_SWITCHER_OPEN,
        open,
    };
}
