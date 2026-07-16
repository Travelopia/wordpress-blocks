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
import save from './save';

/**
 * Block name.
 */
export const { name }: { name: string } = metadata;

/**
 * Styles.
 */
import '../../../front-end/logo-grid/index.scss';
import './editor.scss';

/**
 * Block configuration settings.
 */
export const settings: BlockConfiguration = {
	...metadata,
	icon,
	edit,
	save,
};

/**
 * Children blocks.
 */
import * as item from './children/item';

/**
 * Initialization.
 */
export const init = (): void => {
	// Register block.
	registerBlockType( name, settings );

	// Register children blocks.
	registerBlockType( item.name, item.settings );
};
