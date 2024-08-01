/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockConfiguration } from '@wordpress/blocks';
import { blockTable as icon } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

/**
 * Block name.
 */
export const { name }: { name: string } = metadata;

// @ts-ignore Ignore BlockConfiguration type error for providesContext.
export const settings: BlockConfiguration = {
	...metadata,
	icon,
	edit,
	save,
};
