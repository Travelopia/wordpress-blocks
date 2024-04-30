/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import {
	BlockEditProps,
} from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { name as columnBlockName } from '../table-column';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
function TableRowEdit( props: BlockEditProps<any> ): JSX.Element {
	// Block props.
	const { className, attributes, setAttributes, context, clientId } = props;

	// Context.
	const totalRows: number = parseInt( context[ 'travelopia/table-total-rows' ] as string ?? 0 );

	// Current row index.
	// @ts-ignore
	const currentIndex: number = parseInt( useSelect( ( select ) => select( 'core/block-editor' ).getBlockIndex( clientId ) ) ?? 0 ) + 1;

	// Inner block props.
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__row' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( { ...blockProps }, {
		allowedBlocks: [ columnBlockName ],
	} );

	// Inspector control visibility.
	let canShowInspectorControls: boolean = false;
	if ( 1 === currentIndex || currentIndex === totalRows ) {
		canShowInspectorControls = true;
	}

	// @ts-ignore
	return (
		<>
			{ canShowInspectorControls &&
				<InspectorControls>
					<PanelBody title={ __( 'Row Options', 'tp' ) }>
						{ 1 === currentIndex &&
							<>
								<ToggleControl
									label={ __( 'Is THEAD', 'tp' ) }
									checked={ attributes.isThead }
									onChange={ ( isThead: boolean ) => setAttributes( { isThead } ) }
									help={ __( 'Is this row the header of the table?', 'tp' ) }
								/>
								{ attributes.isThead &&
									<ToggleControl
										label={ __( 'Is Sticky', 'tp' ) }
										checked={ attributes.isSticky }
										onChange={ ( isSticky: boolean ) => setAttributes( { isSticky } ) }
										help={ __( 'Should this row stick to the top of the table as the user scrolls?', 'tp' ) }
									/>
								}
							</>
						}
						{ currentIndex === totalRows &&
							<ToggleControl
								label={ __( 'Is TFOOT', 'tp' ) }
								checked={ attributes.isTfoot }
								onChange={ ( isTfoot: boolean ) => setAttributes( { isTfoot } ) }
								help={ __( 'Is this row the footer of the table?', 'tp' ) }
							/>
						}
					</PanelBody>
				</InspectorControls>
			}
			{ ( ! attributes.isThead && ! attributes.isTfoot ) &&
				<tr { ...innerBlocksProps } />
			}
			{ attributes.isThead &&
				<thead>
					<tr { ...innerBlocksProps } />
				</thead>
			}
			{ attributes.isTfoot &&
				<tfoot>
					<tr { ...innerBlocksProps } />
				</tfoot>
			}
		</>
	);
}

export default TableRowEdit;
