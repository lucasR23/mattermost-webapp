// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import messageHtmlToComponent from 'src/utils/message_html_to_component';
import {formatText} from 'src/utils/text_formatting';
import {browserHistory} from 'src/utils/browser_history';

import {openModal} from 'src/actions/views/modals';
import {ModalIdentifiers} from 'src/utils/constants';
import {useWebSocket, useWebSocketClient, WebSocketContext} from 'src/utils/use_websocket';
import {imageURLForUser} from 'src/utils/utils';

import ChannelInviteModal from 'src/components/channel_invite_modal';
import ChannelMembersModal from 'src/components/channel_members_modal';
import PurchaseModal from 'src/components/purchase_modal';
import {useNotifyAdmin} from 'src/components/notify_admin_cta/notify_admin_cta';
import Timestamp from 'src/components/timestamp';
import Avatar from 'src/components/widgets/users/avatar';
import BotBadge from 'src/components/widgets/badges/bot_badge';

import {openPricingModal} from '../components/global_header/right_controls/plan_upgrade_button';

import Textbox from './textbox';

// The following import has intentional side effects. Do not remove without research.
import {openInteractiveDialog} from './interactive_dialog';

// Common libraries exposed on window for plugins to use as Webpack externals.
window.React = require('react');
window.ReactDOM = require('react-dom');
window.ReactIntl = require('react-intl');
window.Redux = require('redux');
window.ReactRedux = require('react-redux');
window.ReactBootstrap = require('react-bootstrap');
window.ReactRouterDom = require('react-router-dom');
window.PropTypes = require('prop-types');
window.Luxon = require('luxon');
window.StyledComponents = require('styled-components');

// Functions exposed on window for plugins to use.
window.PostUtils = {formatText, messageHtmlToComponent};
window.openInteractiveDialog = openInteractiveDialog;
window.useNotifyAdmin = useNotifyAdmin;
window.WebappUtils = {
    browserHistory,
    modals: {openModal, ModalIdentifiers},
};

// This need to be a function because `openPricingModal`
// is initialized when `UpgradeCloudButton` is loaded.
// So if we export `openPricingModal` directly, it will be locked
// to the initial value of undefined.
window.openPricingModal = () => openPricingModal;

// Components exposed on window FOR INTERNAL PLUGIN USE ONLY. These components may have breaking changes in the future
// outside of major releases. They will be replaced by common components once that project is more mature and able to
// guarantee better compatibility.
window.Components = {
    Textbox,
    PurchaseModal,
    Timestamp,
    ChannelInviteModal,
    ChannelMembersModal,
    Avatar,
    imageURLForUser,
    BotBadge,
};

// This is a prototype of the Product API for use by internal plugins only while we transition to the proper architecture
// for them using module federation.
window.ProductApi = {
    useWebSocket,
    useWebSocketClient,
    WebSocketProvider: WebSocketContext,
};
