import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import type { Driver } from '~/server/static-data/static.types';

interface DriverListProps {
  values: Driver[];
  selected?: Driver;
  placeholder?: string;
  onChange: (value: Driver) => void;
}

export const DriverSelectList = (props: DriverListProps) => {
  const { values, selected, placeholder } = props;
  return (
    <Listbox value={props.selected} onChange={props.onChange}>
      <div className="relative mt-2">
        <ListboxButton className="h-12 grid w-full cursor-default grid-cols-1 rounded-md bg-[#1A1D23] text-white py-1.5 pr-2 pl-3 text-left sm:text-md/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{selected ? `${selected.firstName} ${selected.lastName}` : placeholder}</span>
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {values.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {person.firstName} {person.lastName}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
