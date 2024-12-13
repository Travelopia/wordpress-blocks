/**
 * WordPress dependencies.
 */
// import { __ } from '@wordpress/i18n';
import {
	MediaPlaceholder,
	useBlockProps,
} from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';

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
export default function Edit( props: BlockEditProps<any> ): JSX.Element {
	// Block Edit Props.
	const { attributes, setAttributes, className } = props;

	// Block props.
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-image' ),
	} );

	// Get the default size.
	const defaultSize: string = String( applyFilters( 'travelopiaImage.defaultSize', 'large' ) );

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
	};

	// Return the component.
	return (
		<>
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
