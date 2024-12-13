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
	const { attributes, setAttributes, className } = props;

	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-image' ),
	} );

	const defaultSize: string = String( applyFilters( 'travelopiaImage.defaultSize', 'large' ) );

	const handleImageSelect = ( image: any ): void => {
		const id: number = image.id ?? 0;
		let src: string = '';
		let width: number = 0;
		let height: number = 0;

		if ( 'sizes' in image && defaultSize in image.sizes && 'object' === typeof image.sizes[ defaultSize ] ) {
			src = image.sizes[ defaultSize ].url ?? '';
			width = image.sizes[ defaultSize ].width ?? '';
			height = image.sizes[ defaultSize ].height ?? '';
		}

		if ( '' === src ) {
			src = image.url ?? '';
		}

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
