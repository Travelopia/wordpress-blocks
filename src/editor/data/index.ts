/**
 * Data Store.
 */

import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { unionWith, isEqual, isObject } from 'lodash';

const DEFAULT_STATE: State = {
	media: [],
};

type State = {
	media: Media[];
}

type SetMediaAction = {
	type: string;
	media: object;
}

type GetMediaAction = {
	type: string;
	id: number;
}

type Media = {
	id: number;
}

const actions = {

	setMedia( media: any ): SetMediaAction {
		return {
			type: 'SET_MEDIA',
			media,
		};
	},

	getMedia( id: number ): GetMediaAction {
		return {
			type: 'GET_MEDIA',
			id,
		};
	},

};

const store = createReduxStore( 'travelopia-blocks/media', {
	reducer( state = DEFAULT_STATE, action: SetMediaAction ) {
		switch ( action.type ) {
			case 'SET_MEDIA':
				return {
					...state,
					media: unionWith( state.media, [ action.media ], isEqual ),
				};
		}
		return state;
	},

	actions,

	selectors: {
		getMedia( state: State, med: Media | number ): Media | null {
			if ( isObject( med ) ) {
				med = med.id;
			}
			const media: Media | undefined = state.media.find( ( item: Media ): boolean => item.id === med );
			if ( media ) {
				return media;
			}
			return null;
		},
	},

	controls: {
		GET_MEDIA( { id }: GetMediaAction ) {
			return apiFetch( {
				path: `wp/v2/media/${ id }?context=edit`,
			} );
		},
	},

	resolvers: {
		* getMedia( id: null | number | object ): any {
			if ( null === id ) {
				return;
			}
			if ( isObject( id ) ) {
				if ( 'id' in id ) {
					id = Number( id.id );
				} else {
					id = 0;
				}
			}
			const media = yield actions.getMedia( id );
			return actions.setMedia( media );
		},
	},
} );

register( store );
