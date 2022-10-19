// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {GenericAction} from 'mattermost-redux/types/actions';

import {GlobalState} from 'src/types/store';

import {installApp} from 'src/actions/marketplace';
import {closeModal} from 'src/actions/views/modals';
import {trackEvent} from 'src/actions/telemetry_actions.jsx';
import {getInstalling, getError} from 'src/selectors/views/marketplace';
import {ModalIdentifiers} from 'src/utils/constants';

import MarketplaceItemApp, {MarketplaceItemAppProps} from './marketplace_item_app';

type Props = {
    id: string;
}

function mapStateToProps(state: GlobalState, props: Props) {
    const installing = getInstalling(state, props.id);
    const error = getError(state, props.id);

    return {
        installing,
        error,
        trackEvent,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject, MarketplaceItemAppProps['actions']>({
            installApp,
            closeMarketplaceModal: () => closeModal(ModalIdentifiers.PLUGIN_MARKETPLACE),
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketplaceItemApp);
