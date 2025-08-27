import React from 'react';

/**
 * FormInput Component
 * A reusable form input component with validation and accessibility features
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.id - Input ID (required for accessibility)
 * @param {string} props.name - Input name
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Input placeholder
 * @param {boolean} props.required - Whether the field is required
 * @param {boolean} props.disabled - Whether the field is disabled
 * @param {string} props.error - Error message
 * @param {string} props.icon - Optional icon to display with the input
 * @param {boolean} props.showPasswordToggle - Whether to show password toggle (for password inputs)
 * @param {boolean} props.showPassword - Whether password is currently visible (for password inputs)
 * @param {function} props.onTogglePassword - Password visibility toggle handler (for password inputs)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.inputProps - Additional input props
 * @returns {JSX.Element} Form input component
 */
const FormInput = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  icon,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  className = '',
  inputProps = {},
  ...rest
}) => {
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className={`input-group ${className}`} {...rest}>
      {label && (
        <label htmlFor={id}>
          {icon && <span className="input-icon">{icon}</span>}
          {label}
          {required && <span aria-label="required" className="required-indicator">*</span>}
        </label>
      )}
      
      <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
        <input
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        />
        
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            className="password-toggle"
            onClick={onTogglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={disabled}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {error && (
        <div id={`${id}-error`} className="auth-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;