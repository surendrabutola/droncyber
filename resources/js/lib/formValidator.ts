// src/lib/formValidator.ts

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  type?: 'text' | 'number' | 'email' | 'phone' | 'mobile' | 'file';
}

export interface ValidationError {
  [field: string]: string;
}

export function validateField(value: string | File | null, rules: ValidationRules, fieldLabel?: string): string | null {

  const label = fieldLabel || 'This field';
  const trimmed = typeof value === 'string' ? value.trim() : '';

  if (rules.type === 'file') {
    if (rules.required && !(value instanceof File)) {
      return `${label} is required.`;
    }

    if (value instanceof File) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

      if (!allowedTypes.includes(value.type)) {
        return 'Invalid file type. Only Pdf, PNG, JPG, JPEG, GIF are allowed.';
      }

      if (value.size > maxSize) {
        return 'File size must be less than 2MB.';
      }
    }

    return null; // valid file
  }

  if (rules.required && !trimmed) {
    return `${label} is required.`;
  }

  if (rules.minLength && trimmed.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters.`;
  }

  if (rules.maxLength && trimmed.length > rules.maxLength) {
    return `Must be at most ${rules.maxLength} characters.`;
  }

  switch (rules.type) {
    case 'text':
      if (!/^[A-Za-z][A-Za-z ]+$/.test(trimmed)) {
        return 'Only letters and spaces allowed (no leading spaces).';
      }
      break;
    case 'email':
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(trimmed)) {
        return 'Invalid email format.';
      }
      break;
    case 'phone':
      if (!/^\d{10}$/.test(trimmed)) {
        return 'Phone must be exactly 10 digits.';
      }
      break;
    case 'mobile':
      if (!/^\d{10}$/.test(trimmed)) {
        return 'Phone must be exactly 10 digits.';
      }
      break;
  }

  return null;
}

export function validateForm(
  data: Record<string, string | File | null>,
  schema: Record<string, ValidationRules>,
   labels?: Record<string, string> 
): ValidationError {
  const errors: ValidationError = {};

  for (const key in schema) {
    const error = validateField(data[key] || '', schema[key], labels?.[key]);
    if (error) errors[key] = error;
  }

  return errors;
}
