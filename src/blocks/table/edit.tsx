/**
 * WordPress dependencies.
 */
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { BlockEditProps, createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { TablePlaceholder } from './placeholder';
import { name as rowBlockName } from '../table-row';
import { name as columnBlockName } from '../table-column';
import { name as cellBlockName } from '../table-cell';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
function TableEdit( props: BlockEditProps<any> ): JSX.Element {
	const { className, attributes, clientId, setAttributes } = props;
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( {}, {
		allowedBlocks: [ rowBlockName ],
	} );

	const {
		getBlock,
		canInsertBlockType,
		// @ts-ignore
		canRemoveBlock,
	} = select( 'core/block-editor' );

	const {
		insertBlock,
		removeBlock,
	} = dispatch( 'core/block-editor' );

	const insertHeader = () => {
		const tableBlock = getBlock( attributes.blockId );
		if ( ! tableBlock ) {
			return;
		}

		if ( ! canInsertBlockType( rowBlockName, attributes.blockId ) ) {
			return;
		}

		const columnBlocks = [];

		for ( let i = 0; i < attributes?.columns || 0; i++ ) {
			columnBlocks.push(
				createBlock( columnBlockName, {
					isHead: true,
				}, [ createBlock( cellBlockName ) ] )
			);
		}

		const newRowBlock = createBlock( rowBlockName, {}, columnBlocks );

		insertBlock( newRowBlock, 0, attributes.blockId );
	};

	const removeHeader = () => {
		const tableBlock = getBlock( attributes.blockId );
		if ( ! tableBlock ) {
			return;
		}

		const headerRowBlock = tableBlock.innerBlocks?.[ 0 ];
		if ( ! headerRowBlock ) {
			return;
		}

		if (
			! headerRowBlock?.clientId ||
			! canRemoveBlock( headerRowBlock.clientId )
		) {
			return;
		}

		removeBlock( headerRowBlock.clientId );
	};

	// Set blockId attribute.
	useEffect( () => {
		setAttributes( { blockId: clientId } );
	}, [ clientId, setAttributes ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Table Options', 'tp' ) }>
					{ 0 !== attributes.rows && 0 !== attributes.columns && (
						<ToggleControl
							label={ __( 'Header', 'tp' ) }
							checked={ attributes.hasHeader }
							onChange={ ( newValue: boolean ) => {
								setAttributes( { hasHeader: ! attributes.hasHeader } );
								if ( newValue ) {
									insertHeader();
								} else {
									removeHeader();
								}
							} }
							help={ __( 'Does this table has a header row?', 'tp' ) }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<figure { ...blockProps }>
				{
					/* Placeholder for initial state. */
					( 0 === attributes.rows || 0 === attributes.columns ) &&
						<TablePlaceholder { ...props } />
				}
				{
					( 0 !== attributes.rows || 0 !== attributes.columns ) &&
					<table { ...innerBlocksProps } />
				}
			</figure>
		</>
	);
}

export default TableEdit;
