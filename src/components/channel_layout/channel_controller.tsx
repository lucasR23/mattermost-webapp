// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect} from 'react';
import classNames from 'classnames';

import AnnouncementBarController from 'src/components/announcement_bar';
import SystemNotice from 'src/components/system_notice';
import ResetStatusModal from 'src/components/reset_status_modal';
import SidebarRight from 'src/components/sidebar_right';
import SidebarRightMenu from 'src/components/sidebar_right_menu';
import AppBar from 'src/components/app_bar/app_bar';
import Sidebar from 'src/components/sidebar';
import CenterChannel from 'src/components/channel_layout/center_channel';
import LoadingScreen from 'src/components/loading_screen';
import FaviconTitleHandler from 'src/components/favicon_title_handler';
import ProductNoticesModal from 'src/components/product_notices_modal';

import Pluggable from 'src/plugins/pluggable';

import {isInternetExplorer, isEdge} from 'src/utils/user_agent';

interface Props {
    shouldShowAppBar: boolean;
    fetchingChannels: boolean;
}

const BODY_CLASS_FOR_CHANNEL = ['app__body', 'channel-view'];

export default function ChannelController({shouldShowAppBar, fetchingChannels}: Props) {
    useEffect(() => {
        const isMsBrowser = isInternetExplorer() || isEdge();
        const platform = window.navigator.platform;
        document.body.classList.add(...getClassnamesForBody(platform, isMsBrowser));

        return () => {
            document.body.classList.remove(...BODY_CLASS_FOR_CHANNEL);
        };
    }, []);

    return (
        <div
            id='channel_view'
            className='channel-view'
        >
            <AnnouncementBarController/>
            <SystemNotice/>
            <FaviconTitleHandler/>
            <ProductNoticesModal/>
            <div className={classNames('container-fluid channel-view-inner', {'app-bar-enabled': shouldShowAppBar})}>
                <SidebarRight/>
                <SidebarRightMenu/>
                <Sidebar/>
                {fetchingChannels ? <LoadingScreen/> : <CenterChannel/>}
                <Pluggable pluggableName='Root'/>
                <ResetStatusModal/>
            </div>
            <AppBar/>
        </div>
    );
}

export function getClassnamesForBody(platform: Window['navigator']['platform'], isMsBrowser = false) {
    const bodyClass = [...BODY_CLASS_FOR_CHANNEL];

    // OS Detection
    if (platform === 'Win32' || platform === 'Win64') {
        bodyClass.push('os--windows');
    } else if (platform === 'MacIntel' || platform === 'MacPPC') {
        bodyClass.push('os--mac');
    }

    // IE Detection
    if (isMsBrowser) {
        bodyClass.push('browser--ie');
    }

    return bodyClass;
}
