/**
 * WordPress dependencies.
 */
import { BlockConfiguration } from '@wordpress/blocks';
import { image as icon } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import edit from './edit';

/**
 * Block name.
 */
export const { name }: { name: string } = metadata;

/**
 * Block configuration settings.
 */
export const settings: BlockConfiguration = {
	...metadata,
	icon,
	edit,
	save: () => null,
};
