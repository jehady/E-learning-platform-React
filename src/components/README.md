# Components

This directory contains reusable React components that can be used throughout the application.

## CourseGallery

Displays course images with thumbnail navigation.

### Usage

```jsx
import CourseGallery from './components/CourseGallery';

<CourseGallery 
  mainImage="https://example.com/main-image.jpg"
  thumbnails={[
    "https://example.com/thumb1.jpg",
    "https://example.com/thumb2.jpg",
    "https://example.com/thumb3.jpg"
  ]}
/>
```

### Props

- `mainImage` (string): URL of the main course image
- `thumbnails` (array): Array of thumbnail image URLs

## CourseTabs

Displays tabbed content for course details including description, benefits, reviews, and related courses.

### Usage

```jsx
import CourseTabs from './components/CourseTabs';

<CourseTabs 
  relatedCourses={[
    { id: 1, title: 'Related Course 1', /* ... */ },
    { id: 2, title: 'Related Course 2', /* ... */ }
  ]}
/>
```

### Props

- `relatedCourses` (array): Array of related course objects

## InstructorCard

Displays instructor information and follow button.

### Usage

```jsx
import InstructorCard from './components/InstructorCard';

<InstructorCard 
  avatar="https://example.com/avatar.jpg"
  name="John Doe"
  role="Senior Instructor"
  onFollow={() => console.log('Following instructor')}
/>
```

### Props

- `avatar` (string): URL of the instructor's avatar image
- `name` (string): Instructor's name
- `role` (string): Instructor's role/title
- `onFollow` (function): Function to call when follow button is clicked

## CourseInfoBox

Displays course information and purchase options.

### Usage

```jsx
import CourseInfoBox from './components/CourseInfoBox';

<CourseInfoBox 
  title="Course Title"
  rating={4.5}
  lessons="12"
  documentStatus="Free"
  price={49}
  onBuy={() => console.log('Buying course')}
  onAddToCart={() => console.log('Adding to cart')}
/>
```

### Props

- `title` (string): Course title
- `rating` (number): Course rating
- `lessons` (string): Number of lessons
- `documentStatus` (string): Document status (e.g., "Free")
- `price` (number): Course price
- `onBuy` (function): Function to call when buy button is clicked
- `onAddToCart` (function): Function to call when add to cart button is clicked

## StripePaymentModal

Displays a modal with Stripe payment form.

### Usage

```jsx
import StripePaymentModal from './components/StripePaymentModal';

<StripePaymentModal 
  open={showModal}
  onClose={() => setShowModal(false)}
  price={49}
/>
```

### Props

- `open` (boolean): Whether the modal is open
- `onClose` (function): Function to call when modal is closed
- `price` (number): Payment amount

## ErrorBoundary

Catches JavaScript errors anywhere in the child component tree and displays a fallback UI.

### Usage

```jsx
import ErrorBoundary from './components/ErrorBoundary';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### Props

- `children` (ReactNode): Child components to wrap with error boundary

## FormInput

A reusable form input component with validation and accessibility features.

### Usage

```jsx
import FormInput from './components/FormInput';

<FormInput
  type="text"
  id="username"
  name="username"
  value={formData.username}
  onChange={handleChange}
  label="Username"
  placeholder="Enter your username"
  required
  disabled={loading}
  error={errors.username}
  showPasswordToggle
  showPassword={showPassword}
  onTogglePassword={() => setShowPassword(!showPassword)}
/>
```

### Props

- `type` (string): Input type (text, email, password, etc.)
- `id` (string): Input ID (required for accessibility)
- `name` (string): Input name
- `value` (string): Input value
- `onChange` (function): Change handler
- `label` (string|ReactNode): Input label
- `placeholder` (string): Input placeholder
- `required` (boolean): Whether the field is required
- `disabled` (boolean): Whether the field is disabled
- `error` (string): Error message
- `icon` (ReactNode): Optional icon to display with the input
- `showPasswordToggle` (boolean): Whether to show password toggle (for password inputs)
- `showPassword` (boolean): Whether password is currently visible (for password inputs)
- `onTogglePassword` (function): Password visibility toggle handler (for password inputs)
- `className` (string): Additional CSS classes
- `inputProps` (object): Additional input props

## RadioGroup

A reusable radio group component with accessibility features.

### Usage

```jsx
import RadioGroup from './components/RadioGroup';

<RadioGroup
  name="userType"
  value={formData.userType}
  onChange={handleChange}
  label="User Type"
  options={[
    { value: 'women', label: 'Women' },
    { value: 'child', label: 'Child' }
  ]}
  required
  disabled={loading}
  error={errors.userType}
/>
```

### Props

- `name` (string): Radio group name (required)
- `value` (string): Selected value
- `onChange` (function): Change handler
- `label` (string|ReactNode): Radio group label
- `options` (array): Array of options with value and label
- `required` (boolean): Whether the field is required
- `disabled` (boolean): Whether the field is disabled
- `error` (string): Error message
- `className` (string): Additional CSS classes
- `radioProps` (object): Additional radio props