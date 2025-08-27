# UI Test Plan

This document outlines the test plan for UI verification of the refactored components.

## Test Scenarios

### 1. SignUpModern Component

#### Manual Testing Steps:
1. Navigate to the signup page
2. Verify that all form fields are present:
   - Username field
   - Email field
   - Password field
   - Confirm Password field
   - User Type radio buttons (Women, Child)
3. Test form validation:
   - Try submitting empty form and verify error messages
   - Enter invalid email and verify error message
   - Enter short password (< 6 characters) and verify error message
   - Enter mismatched passwords and verify error message
   - Select no user type and verify error message
4. Test password visibility toggle:
   - Click eye icon on password field and verify it shows/hides password
   - Click eye icon on confirm password field and verify it shows/hides password
5. Test successful signup:
   - Fill all fields with valid data
   - Select a user type
   - Submit form and verify success message or redirection
6. Test Google signup:
   - Click "Continue with Google" button
   - Verify Google OAuth flow

#### Example Test Data:
- Username: "testuser123"
- Email: "testuser@example.com"
- Password: "password123"
- Confirm Password: "password123"
- User Type: "Women" or "Child"

### 2. FormInput Component

#### Manual Testing Steps:
1. Test text input:
   - Verify label is displayed
   - Verify placeholder text is displayed
   - Enter text and verify it appears in the field
2. Test email input:
   - Verify email-specific keyboard on mobile
   - Enter invalid email and verify validation
3. Test password input:
   - Verify password masking by default
   - Test show/hide password functionality
4. Test error display:
   - Pass error message as prop
   - Verify error message is displayed below the input
5. Test disabled state:
   - Set disabled prop to true
   - Verify input is not editable

#### Example Test Data:
- Label: "Username"
- Placeholder: "Enter your username"
- Error: "Username is required"

### 3. RadioGroup Component

#### Manual Testing Steps:
1. Test radio group display:
   - Verify label is displayed
   - Verify all options are displayed
2. Test radio selection:
   - Click on each radio option
   - Verify only one option can be selected at a time
3. Test error display:
   - Pass error message as prop
   - Verify error message is displayed below the radio group
4. Test disabled state:
   - Set disabled prop to true
   - Verify options are not selectable

#### Example Test Data:
- Label: "User Type"
- Options: 
  - { value: 'women', label: 'Women' }
  - { value: 'child', label: 'Child' }
- Error: "Please select a user type"

### 4. Header Component

#### Manual Testing Steps:
1. Test navigation links:
   - Click on "Home" link and verify navigation to home page
   - Click on "My Courses" link and verify navigation to my courses page
   - Click on "Dashboard" link and verify navigation to dashboard page
   - Click on "Promotions" link and verify navigation to promotions page
   - Click on "Support" link and verify navigation to support page
2. Test search functionality:
   - Enter text in search box
   - Verify search functionality (if implemented)
3. Test notification link:
   - Click on notification icon
   - Verify navigation to notifications page
4. Test cart link:
   - Click on cart icon
   - Verify navigation to cart page
5. Test user profile link:
   - Click on user avatar
   - Verify navigation to profile page
6. Test mobile menu:
   - Resize window to mobile view
   - Click hamburger menu
   - Verify menu opens
   - Click menu items and verify navigation

### 5. Promotions and Support Pages

#### Manual Testing Steps:
1. Test Promotions page:
   - Navigate to /promotions
   - Verify page loads without errors
   - Verify placeholder content is displayed
2. Test Support page:
   - Navigate to /support
   - Verify page loads without errors
   - Verify placeholder content is displayed

## Automated Testing

### Component Rendering Tests:
1. Test that SignUpModern component renders without crashing
2. Test that FormInput component renders with required props
3. Test that RadioGroup component renders with required props
4. Test that Header component renders with all navigation links
5. Test that Promotions and Support pages render without errors

### Form Validation Tests:
1. Test that SignUpModern form validation works correctly
2. Test that FormInput displays error messages when provided
3. Test that RadioGroup displays error messages when provided

### Accessibility Tests:
1. Test that all form elements have proper labels
2. Test that all interactive elements are keyboard accessible
3. Test that all images have alt text
4. Test that color contrast meets accessibility standards

## Browser Compatibility

Test the UI on the following browsers:
- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)

## Responsive Design Testing

Test the UI on the following screen sizes:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

Verify that:
1. Layout adjusts appropriately for each screen size
2. All components are visible and usable
3. Text is readable
4. Navigation is functional