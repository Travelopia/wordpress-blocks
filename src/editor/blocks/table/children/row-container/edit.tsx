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
import { name as rowBlockName } from '../row';
import { useEffect } from '@wordpress/element';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
export default function Edit( props: BlockEditProps<any> ): JSX.Element {
	// Block props.
	const { className, attributes, setAttributes, clientId } = props;

	// Inner block props.
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__row-container', {
			'travelopia-table__row-container--sticky': attributes.isSticky,
		} ),
	} );
	const innerBlocksProps = useInnerBlocksProps( { ...blockProps }, {
		allowedBlocks: [ rowBlockName ],
	} );

	// Determine tag.
	const Tag: string = attributes.type;

	// Set block id.
	useEffect( () => {
		// Set block attributes.
		setAttributes( { blockId: clientId } );
	}, [ clientId, setAttributes ] );

	// Return component.
	return (
		<>
			{ 'thead' === attributes.type &&
				<InspectorControls>
					<PanelBody title={ __( 'Row Container Options', 'tp' ) }>
						<ToggleControl
							label={ __( 'Is Sticky vertically', 'tp' ) }
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
