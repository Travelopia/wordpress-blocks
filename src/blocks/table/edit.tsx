/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { TablePlaceholder } from './placeholder';
import { name as rowContainerBlockName } from '../table-row-container';

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
		allowedBlocks: [ rowContainerBlockName ],
		renderAppender: undefined,
	} );

	// Set blockId attribute.
	useEffect( () => {
		setAttributes( { blockId: clientId } );
	}, [ clientId, setAttributes ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Table Options', 'tp' ) }>
					<ToggleControl
						label={ __( 'Has THEAD', 'tp' ) }
						checked={ attributes.hasThead }
						onChange={ ( hasThead: boolean ) => setAttributes( { hasThead } ) }
						help={ __( 'Does this table have a header?', 'tp' ) }
					/>
					<ToggleControl
						label={ __( 'Has TFOOT', 'tp' ) }
						checked={ attributes.hasTfoot }
						onChange={ ( hasTfoot: boolean ) => setAttributes( { hasTfoot } ) }
						help={ __( 'Does this table have a footer?', 'tp' ) }
					/>
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
