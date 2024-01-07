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
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
function TableCellEdit( props: BlockEditProps<any> ): JSX.Element {
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps( {
		className: 'travelopia-table__cell',
	} );

	return (
		<RichText
			tagName="span"
			{ ...blockProps }
			placeholder={ __( 'Cell content', 'tp' ) }
			onChange={ ( content: string ) => setAttributes( { content } ) }
			value={ attributes.content }
		/>
	);
}

export default TableCellEdit;
