import React from "react";

const InputType = ({
  labelText,
  labelFor,
  value,
  onChange,
  name,
  inputType,
  placeholder
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={labelFor} className="form-label">
          {labelText}
        </label>
        <input
          type={inputType}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default InputType;
