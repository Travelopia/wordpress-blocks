/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockEditProps } from '@wordpress/blocks';
import {
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Media object returned by the media library.
 */
interface Media {
	id: number;
	url: string;
	alt: string;
}

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
export default function Edit( props: BlockEditProps<any> ): JSX.Element {
	// Destructure properties.
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps( {
		className: 'travelopia-logo-grid__logo',
	} );

	/**
	 * Update attributes when an image is selected.
	 *
	 * @param {Object} media Selected media object.
	 */
	const onSelectImage = ( media: Media ): void => {
		// Store the attachment ID plus a URL/alt for the editor preview.
		setAttributes( {
			imageId: media?.id ?? 0,
			imageUrl: media?.url ?? '',
			imageAlt: media?.alt ?? '',
		} );
	};

	// Return the block's markup.
	return (
		<figure { ...blockProps }>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes={ [ 'image' ] }
					value={ attributes.imageId }
					render={ ( { open }: { open: () => void } ) => (
						<Button
							onClick={ open }
							className="travelopia-logo-grid__logo-button"
							label={
								attributes.imageUrl
									? __( 'Edit logo', 'tp' )
									: __( 'Select logo', 'tp' )
							}
						>
							{ attributes.imageUrl ? (
								<img
									className="travelopia-logo-grid__img"
									src={ attributes.imageUrl }
									alt={ attributes.imageAlt }
								/>
							) : (
								__( 'Select logo', 'tp' )
							) }
						</Button>
					) }
				/>
			</MediaUploadCheck>
		</figure>
	);
}
