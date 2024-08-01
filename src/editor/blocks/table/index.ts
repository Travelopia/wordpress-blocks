/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
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

/**
 * Styles.
 */
import '../../../front-end/table/index.scss';
import './editor.scss';

// @ts-ignore Ignore BlockConfiguration type error for providesContext.
export const settings: BlockConfiguration = {
	...metadata,
	icon,
	edit,
	save,
};

/**
 * Children blocks.
 */
import * as row from './children/row';
import * as rowContainer from './children/row-container';
import * as column from './children/column';
import * as cell from './children/cell';

/**
 * Initialization.
 */
export const init = (): void => {
	// Register block.
	registerBlockType( name, settings );

	// Register children blocks.
	registerBlockType( row.name, row.settings );
	registerBlockType( rowContainer.name, rowContainer.settings );
	registerBlockType( column.name, column.settings );
	registerBlockType( cell.name, cell.settings );
};
