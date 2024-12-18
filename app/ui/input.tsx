import React, { ReactNode } from 'react';

type InputProps = {
  id: string;
  type: 'textarea' | 'text';
  placeholder?: string;
  rows?: number; // Only to be used with textarea
  children: ReactNode;
};

const Input = ({ id, type = 'text', placeholder = '', rows = 0, children }: InputProps) => {
  let element;

  switch (type) {
    case 'textarea':
      if (rows === 0) throw new Error('Textarea requires "rows" to be defined.');
      element = (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          className="p-2 border border-gray-300 rounded w-full"
          rows={rows}
        />
      );
      break;
    case 'text':
      element = (
        <input
          type="text"
          id={id}
          name={id}
          placeholder={placeholder}
          className="p-2 border border-gray-300 rounded w-full"
        />
      );
      break;
    default:
      throw new Error(`Unsupported input type: ${type}`);
  }

  return (
    <div className="space-y-2">
      {typeof children === 'string' ? (
        <label htmlFor={id} className="block">
          {children}
        </label>
      ) : (
        children
      )}
      {element}
    </div>
  );
};

export default Input;
