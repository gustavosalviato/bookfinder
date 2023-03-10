/* eslint-disable react/display-name */
// eslint-disable-next-line react/display-name
import { forwardRef, InputHTMLAttributes } from "react";
import { FiSearch } from "react-icons/fi";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (props, ref) => {
    return (
      <div className="w-full bg-gray900  px-6 rounded-md h-12 flex items-center border-2 border-gray900 focus-within:border-tertiary transition-colors group text-secondary focus-within:text-tertiary">
        <input
          type="text"
          placeholder="Search for a genre"
          className="bg-transparent border-0 outline-none flex-1 text-headline placeholder:text-paragraph"
          ref={ref}
          {...props}
        />
        <FiSearch size={20} className=" " />
      </div>
    );
  }
);
