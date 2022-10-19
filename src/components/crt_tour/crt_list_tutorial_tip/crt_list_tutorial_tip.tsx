// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {FormattedMessage} from 'react-intl';

import {useDispatch, useSelector} from 'react-redux';

import {GlobalState} from 'src/types/store';
import {open as openLhs} from 'src/actions/views/lhs.js';
import {getIsMobileView} from 'src/selectors/views/browser';
import {Constants, Preferences} from 'src/utils/constants';
import FormattedMarkdownMessage from 'src/components/formatted_markdown_message';
import TutorialTip from 'src/components/tutorial/tutorial_tip_legacy';
import {ShortcutKey, ShortcutKeyVariant} from 'src/components/shortcut_key';
import {useMeasurePunchoutsDeprecated} from 'src/components/tutorial/tutorial_tip_legacy/hooks';

type Props = {
    autoTour: boolean;
};

export const UpShortcut = () => <ShortcutKey variant={ShortcutKeyVariant.TutorialTip}>{'UP'}</ShortcutKey>;

export const DownShortcut = () => <ShortcutKey variant={ShortcutKeyVariant.TutorialTip}>{'DOWN'}</ShortcutKey>;

const CRTListTutorialTip = ({autoTour}: Props) => {
    const isMobileView = useSelector((state: GlobalState) => getIsMobileView(state));
    const dispatch = useDispatch();
    const onPrevNavigateTo = () => dispatch(openLhs());

    const title = (
        <FormattedMessage
            id='tutorial_threads.list.title'
            defaultMessage={'Threads List'}
        />
    );

    const screen = (
        <>
            <p>
                <FormattedMarkdownMessage
                    id='tutorial_threads.list.description-p1'
                    defaultMessage={'Here you’ll see a preview of all threads you’re following or participating in. Clicking on a thread in this list will open the full thread on the right.'}
                />
            </p>
            <p>
                <FormattedMessage
                    id='tutorial_threads.list.description-p2'
                    defaultMessage={'Use {upKey} / {downKey} to navigate the thread list.'}
                    values={{
                        upKey: <UpShortcut/>,
                        downKey: <DownShortcut/>,
                    }}
                />
            </p>
        </>
    );

    const punchOutIds = isMobileView ? ['tutorial-threads-mobile-list', 'tutorial-threads-mobile-header'] : ['threads-list-container'];

    return (
        <TutorialTip
            title={title}
            placement='right'
            showOptOut={false}
            step={Constants.CrtTutorialSteps.LIST_POPOVER}
            tutorialCategory={Preferences.CRT_TUTORIAL_STEP}
            stopPropagation={true}
            screen={screen}
            overlayClass='tip-overlay--threads-list'
            autoTour={autoTour}
            onPrevNavigateTo={onPrevNavigateTo}
            punchOut={useMeasurePunchoutsDeprecated(punchOutIds, [])}
        />
    );
};

export default CRTListTutorialTip;
