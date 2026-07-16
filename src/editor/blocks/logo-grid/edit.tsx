/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockEditProps } from '@wordpress/blocks';
import {
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { name as itemBlockName } from './children/item';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
export default function Edit( props: BlockEditProps<any> ): JSX.Element {
	// Destructure properties.
	const { className, attributes, setAttributes } = props;

	// Block props.
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-logo-grid', {
			'travelopia-logo-grid--large': 'large' === attributes.logoSize,
		} ),
	} );

	// Inner blocks props.
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classnames(
				'travelopia-logo-grid__items',
				`travelopia-logo-grid__items--${ attributes.align }`,
			),
		},
		{
			allowedBlocks: [ itemBlockName ],
			template: [ [ itemBlockName ], [ itemBlockName ] ],
		},
	);

	// Return the block's markup.
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Logo Grid Options', 'tp' ) }>
					<SelectControl
						label={ __( 'Logo Alignment', 'tp' ) }
						help={ __( 'Select the alignment of the logos.', 'tp' ) }
						value={ attributes.align }
						options={ [
							{ label: __( 'Left', 'tp' ), value: 'left' },
							{ label: __( 'Center', 'tp' ), value: 'center' },
							{ label: __( 'Right', 'tp' ), value: 'right' },
						] }
						onChange={ ( align: string ) => setAttributes( { align } ) }
					/>
					<SelectControl
						label={ __( 'Logo Size', 'tp' ) }
						help={ __( 'Select the size of the logos.', 'tp' ) }
						value={ attributes.logoSize }
						options={ [
							{ label: __( 'Medium', 'tp' ), value: 'medium' },
							{ label: __( 'Large', 'tp' ), value: 'large' },
						] }
						onChange={ ( logoSize: string ) =>
							setAttributes( { logoSize } )
						}
					/>
					<ToggleControl
						label={ __( 'Has Title', 'tp' ) }
						checked={ attributes.hasTitle }
						onChange={ ( hasTitle: boolean ) =>
							setAttributes( { hasTitle } )
						}
						help={ __( 'Display a title above the grid?', 'tp' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ attributes.hasTitle && (
					<RichText
						tagName="h2"
						className="travelopia-logo-grid__title"
						placeholder={ __( 'Add title here…', 'tp' ) }
						value={ attributes.title }
						onChange={ ( title: string ) =>
							setAttributes( { title } )
						}
						allowedFormats={ [] }
					/>
				) }
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
