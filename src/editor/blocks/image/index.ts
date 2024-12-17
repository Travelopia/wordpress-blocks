/**
 * WordPress dependencies.
 */
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
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
 * Styles.
 */
import '../../../front-end/image/index.scss';
import './editor.scss';

// @ts-ignore Ignore BlockConfiguration type error for providesContext.
export const settings: BlockConfiguration = {
	...metadata,
	icon,

	// @ts-ignore
	edit,
};

/**
 * Initialization.
 */
export const init = (): void => {
	// Register block.
	registerBlockType( name, settings );
};
