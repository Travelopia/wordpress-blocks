/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockEditProps } from '@wordpress/blocks';
import {
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies.
 */
import Toolbar from '../../../toolbar';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
export default function Edit( props: BlockEditProps<any> ): JSX.Element {
	// Destructure properties.
	const { attributes, setAttributes, clientId, isSelected } = props;
	const blockProps = useBlockProps( {
		className: 'travelopia-table__cell',
	} );

	// Return cell content.
	return (
		<>
			{ isSelected && <Toolbar cellClientId={ clientId } /> }
			<RichText
				tagName="span"
				{ ...blockProps }
				placeholder={ __( 'Cell content', 'tp' ) }
				onChange={ ( content: string ) => setAttributes( { content } ) }
				value={ attributes.content }
			/>
		</>
	);
}
