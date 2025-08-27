import React from 'react';

/**
 * RadioGroup Component
 * A reusable radio group component with accessibility features
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Radio group name (required)
 * @param {string} props.value - Selected value
 * @param {function} props.onChange - Change handler
 * @param {string} props.label - Radio group label
 * @param {Array} props.options - Array of options with value and label
 * @param {boolean} props.required - Whether the field is required
 * @param {boolean} props.disabled - Whether the field is disabled
 * @param {string} props.error - Error message
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.radioProps - Additional radio props
 * @returns {JSX.Element} Radio group component
 */
const RadioGroup = ({
  name,
  value,
  onChange,
  label,
  options = [],
  required = false,
  disabled = false,
  error,
  className = '',
  radioProps = {},
  ...rest
}) => {
  return (
    <div className={`input-group ${className}`} {...rest}>
      {label && (
        <label>
          {label}
          {required && <span aria-label="required" className="required-indicator">*</span>}
        </label>
      )}
      
      <div 
        className={`radio-group-modern ${error ? 'radio-error' : ''}`} 
        role="radiogroup" 
        aria-labelledby={label ? `${name}-label` : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {options.map((option, index) => (
          <label key={index} className="radio-option">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              {...radioProps}
            />
            <span className="radio-custom"></span>
            <span className="radio-label">{option.label}</span>
          </label>
        ))}
      </div>
      
      {error && (
        <div id={`${name}-error`} className="auth-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default RadioGroup;