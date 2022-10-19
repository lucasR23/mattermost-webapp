// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import * as React from 'react';

import WebSocketClient from 'src/client/web_websocket_client';

import IntlProvider from 'src/components/intl_provider';

import {WebSocketContext} from 'src/utils/use_websocket';

type Props = {
    children: React.ReactNode;
}

export default function RootProvider(props: Props) {
    return (
        <IntlProvider>
            <WebSocketContext.Provider value={WebSocketClient}>
                {props.children}
            </WebSocketContext.Provider>
        </IntlProvider>
    );
}
