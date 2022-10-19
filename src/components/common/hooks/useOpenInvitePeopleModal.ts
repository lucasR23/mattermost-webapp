// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useDispatch} from 'react-redux';

import {trackEvent} from 'src/actions/telemetry_actions';
import {openModal} from 'src/actions/views/modals';
import {ModalIdentifiers} from 'src/utils/constants';
import InvitationModal from 'src/components/invitation_modal';

export default function useOpenInvitePeopleModal() {
    const dispatch = useDispatch();
    return () => {
        trackEvent('invite_people', 'click_open_invite_people_modal');
        dispatch(openModal({
            modalId: ModalIdentifiers.INVITATION,
            dialogType: InvitationModal,
        }));
    };
}
