/**
 * WordPress dependencies.
 */
import { RichText } from '@wordpress/block-editor';
import { BlockSaveProps } from '@wordpress/blocks';

/**
 * Save component.
 *
 * @param {Object} props            Component properties.
 * @param {Object} props.attributes Component attributes.
 */
export default function Save( {
	attributes,
}: BlockSaveProps<Record<string, any>> ) {
	// Save content.
	return <RichText.Content value={ attributes.content } />;
}
