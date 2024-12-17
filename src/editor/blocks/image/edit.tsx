/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaPlaceholder,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';
// import { BlockEditProps } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
function Edit( props: any ): JSX.Element {
	// Block Edit Props.
	const { attributes, setAttributes, className, selectedMedia, onSetMedia } = props;

	// Block props.
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-image' ),
	} );

	// Get the default size.
	const defaultSize: string = String( applyFilters( 'travelopiaImage.defaultSize', 'large' ) );

	// ALT text and caption.
	let altText: string = '';
	let caption: string = '';

	if ( selectedMedia ) {
		if ( 'alt_text' in selectedMedia ) {
			altText = selectedMedia.alt_text.toString();
		}
		if ( 'caption' in selectedMedia && 'raw' in selectedMedia.caption ) {
			caption = selectedMedia.caption.raw.toString();
		}
	}

	/**
	 * Handle when an image is selected.
	 *
	 * @param {Object} image The selected image.
	 */
	const handleImageSelect = ( image: any ): void => {
		// Prepare values.
		const id: number = image.id ?? 0;
		let src: string = '';
		let width: number = 0;
		let height: number = 0;

		// Get values from sizes.
		if ( 'sizes' in image ) {
			if ( defaultSize in image.sizes && 'object' === typeof image.sizes[ defaultSize ] ) {
				src = image.sizes[ defaultSize ].url ?? '';
				width = image.sizes[ defaultSize ].width ?? '';
				height = image.sizes[ defaultSize ].height ?? '';
			} else if ( 'full' in image.sizes && 'object' === typeof image.sizes.full ) {
				src = image.sizes.full.url ?? '';
				width = image.sizes.full.width ?? '';
				height = image.sizes.full.height ?? '';
			}
		}

		// If we still don't have an SRC, fall back to the URL.
		if ( '' === src ) {
			src = image.url ?? '';
		}

		// Set attributes.
		setAttributes( { id, src, width, height } );
		onSetMedia( image );
	};

	// Return the component.
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Image Settings', 'tp' ) }>
					<TextareaControl
						value={ altText }
						onChange={ () => {} }
						label={ __( 'Alternative Text', 'tp' ) }
						help={ __( 'Describe the purpose of the image.', 'tp' ) }
					/>
					<TextareaControl
						value={ caption }
						onChange={ () => {} }
						label={ __( 'Caption', 'tp' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<figure { ...blockProps }>
				{ 0 === attributes.id && (
					<MediaPlaceholder
						onSelect={ handleImageSelect }
						allowedTypes={ [ 'image' ] }
						multiple={ false }
					/>
				) }
				{ 0 !== attributes.id && (
					<img src={ attributes.src } alt="" />
				) }
			</figure>
		</>
	);
}

export default compose(
	withSelect( ( select: any, ownProps: any ) => {
		const { getMedia } = select( 'travelopia-blocks/media' );
		const { attributes } = ownProps;

		return {
			selectedMedia: attributes.id ? getMedia( attributes.id ) : null,
		};
	} ),
	withDispatch( ( dispatch: any ) => {
		return {
			onSetMedia( media: any ) {
				dispatch( 'travelopia-blocks/media' ).setMedia( media );
			},
		};
	} ),
)( Edit );
