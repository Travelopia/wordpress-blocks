/**
 * BlockEditAttributes.
 */
interface BlockEditAttributes {
	className: string,
	attributes: Record<string, any>,
	setAttributes: Function;
	isSelected: boolean;
	clientId: string;
}
