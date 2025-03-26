import { ValidationError } from '@nestjs/common';

// Fungsi helper processValidationError (pastikan ini ada di file yang sama atau diimpor)

export function processValidationChildren(children: ValidationError[], parentProperty?: string): string[] {
	const messages: string[] = [];
	children.forEach((child) => {
		const propertyName = parentProperty ? `${parentProperty}.${child.property}` : child.property;
		if (child.constraints) {
			messages.push(`${propertyName} - ${Object.values(child.constraints).join(', ')}`);
		}
		if (child.children && child.children.length > 0) {
			messages.push(...processValidationChildren(child.children, propertyName));
		}
	});
	return messages;
}
