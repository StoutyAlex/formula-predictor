import { TextInput as FBTextInput, Button } from 'flowbite-react';
import type { ChangeEvent } from 'node_modules/@types/react/ts5.0';

export interface TextInputProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  return (
    <>
      <label className="text-sm block text-gray-400 mb-2">Abbreviation</label>
      <FBTextInput
        type="text"
        name={props.name}
        // defaultValue={props.driver?.name}
        className="text-sm w-full bg-[#262931] text-white rounded-sm p-1.5 border border-gray-700 focus:border-red-500 focus:outline-none"
        placeholder="HAM"
      />
      <Button onClick={() => console.log('Button clicked!')} className="mt-2" />
    </>
  );
};
