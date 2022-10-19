// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';
import {Action} from 'mattermost-redux/types/actions';

import {ModalIdentifiers} from 'src/utils/constants';
import {isModalOpen} from 'src/selectors/views/modals';
import {openModal} from 'src/actions/views/modals';

import {ModalData} from 'src/types/actions';
import {GlobalState} from 'src/types/store';

import TeamMembersModal from './team_members_modal';

type Actions = {
    openModal: <P>(modalData: ModalData<P>) => void;
}

function mapStateToProps(state: GlobalState) {
    const modalId = ModalIdentifiers.TEAM_MEMBERS;
    return {
        currentTeam: getCurrentTeam(state),
        show: isModalOpen(state, modalId),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            openModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembersModal);
