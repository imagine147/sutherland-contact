'use client';

import { useRef, useState } from 'react';

export default function RegistrationForm() {
  const formRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const regexValidators = {
    fullName: {
      regex: /^[A-Za-z\s'-]{2,}$/,
      message: 'Full Name must be at least 2 letters and contain only letters, spaces, apostrophes or hyphens.',
    },
    firstName: {
      regex: /^[A-Za-z\s'-]{2,}$/,
      message: 'First Name must be at least 2 letters and contain only letters, spaces, apostrophes or hyphens.',
    },
    lastName: {
      regex: /^[A-Za-z\s'-]{2,}$/,
      message: 'Last Name must be at least 2 letters and contain only letters, spaces, apostrophes or hyphens.',
    },
    zip: {
      regex: /^\d{5}(?:-\d{4})?$/,
      message: 'Postal/Zip Code must be 5 digits (or 5+4).',
    },
    mobile: {
      regex: /^\+?\d{10,15}$/,
      message: 'Mobile Number must be 10–15 digits, optionally starting with +.',
    },
    home: {
      regex: /^\+?\d{10,15}$/,
      message: 'Home Number must be 10–15 digits, optionally starting with +.',
    },
    ssn: {
      regex: /^\d{3}-\d{2}-\d{4}$/,
      message: 'SSN must be in the format 123-45-6789.',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const newErrors = {};

    const required = [
      'fullName', 'firstName', 'lastName', 'birthDate', 'gender',
      'address1', 'city', 'state', 'zip', 'mobile', 'ssn', 'signature', 'idFront', 'idBack'
    ];

    required.forEach(field => {
      if (!data[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    Object.entries(regexValidators).forEach(([field, { regex, message }]) => {
      if (data[field] && !regex.test(data[field])) {
        newErrors[field] = message;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Registration Data:', data);
    setSuccessMessage('Form submitted successfully!');
    setShowSuccess(true);
    setErrors({});
    form.reset();

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const renderInput = (id, label, type = 'text', placeholder = '') => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={`w-full border p-2 rounded ${errors[id] ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors[id] && <p className="text-sm text-red-500 mt-1">{errors[id]}</p>}
    </div>
  );

  const renderFileUpload = (id, label) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <input
        id={id}
        name={id}
        type="file"
        accept="image/*,.pdf"
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {errors[id] && <p className="text-sm text-red-500 mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full lg:w-[55%] mx-auto bg-white p-8 mt-16 mb-10 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Registration Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('fullName', 'Full Name')}
        {renderInput('firstName', 'First Name')}
        {renderInput('lastName', 'Last Name')}
        {renderInput('birthDate', 'Birth Date', 'date')}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium mb-1">Gender</label>
        <select
          id="gender"
          name="gender"
          className={`w-full border p-2 rounded ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('address1', 'Street Address')}
        {renderInput('address2', 'Address Line 2')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderInput('city', 'City')}
        {renderInput('state', 'State/Province')}
        {renderInput('zip', 'Postal/Zip Code')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('mobile', 'Mobile Number', 'tel')}
        {renderInput('home', 'Home Number', 'tel')}
      </div>

      {renderInput('ssn', 'SSN (123-45-6789)')}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderFileUpload('idFront', 'ID Upload (Front)')}
        {renderFileUpload('idBack', 'ID Upload (Back)')}
      </div>

      <div>
        <label htmlFor="signature" className="block text-sm font-medium mb-1">Signature</label>
        <textarea
          id="signature"
          name="signature"
          rows={3}
          placeholder="Type your full name"
          className={`w-full border p-2 rounded ${errors.signature ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.signature && <p className="text-sm text-red-500 mt-1">{errors.signature}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => {
            formRef.current?.reset();
            setSuccessMessage('');
            setShowSuccess(false);
            setErrors({});
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {successMessage && (
        <div
          className={`text-green-600 text-center mt-4 font-medium transition-opacity duration-500 ${
            showSuccess ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {successMessage}
        </div>
      )}
    </form>
  );
}
