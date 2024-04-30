/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import {
	BlockEditProps,
} from '@wordpress/blocks';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { name as rowBlockName } from '../table-row';
import { useEffect } from '@wordpress/element';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
function TableRowContainerEdit( props: BlockEditProps<any> ): JSX.Element {
	// Block props.
	const { className, attributes, setAttributes, clientId } = props;

	// Inner block props.
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__row-container' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( { ...blockProps }, {
		allowedBlocks: [ rowBlockName ],
	} );

	// Determine tag.
	const Tag: string = attributes.type;

	useEffect( () => {
		setAttributes( { blockId: clientId } );
	}, [ clientId, setAttributes ] );

	// Return component.
	return (
		<>
			{ 'thead' === attributes.type &&
				<InspectorControls>
					<PanelBody title={ __( 'Row Container Options', 'tp' ) }>
						<ToggleControl
							label={ __( 'Is Sticky', 'tp' ) }
							checked={ attributes.isSticky }
							onChange={ ( isSticky: boolean ) => setAttributes( { isSticky } ) }
							help={ __( 'Is this container sticky?', 'tp' ) }
						/>
					</PanelBody>
				</InspectorControls>
			}
			<Tag { ...innerBlocksProps } />
		</>
	);
}

export default TableRowContainerEdit;
