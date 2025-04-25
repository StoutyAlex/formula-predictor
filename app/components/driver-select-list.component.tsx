import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import type { CSSProperties, MouseEventHandler } from 'react';
import { FaXmark } from 'react-icons/fa6';
import type { Constructor, Driver } from '~/server/static-data/static.types';

interface DriverListProps {
  values: Driver[];
  constructors: Constructor[];
  selected?: Driver;
  placeholder?: string;
  onChange: (value: Driver | undefined) => void;
}

export const DriverSelectList = (props: DriverListProps) => {
  const { values, selected, placeholder } = props;

  const listOptions = values.map((person) => {
    const constructor = props.constructors.find((c) => c.drivers.includes(person));
    return (
      <ListboxOption
        key={person.id}
        value={person}
        style={{ '--hoverColour': constructor?.hexColor } as CSSProperties}
        className="group relative cursor-default pr-2 pl-3 text-whtite select-none py-1.5 data-focus:bg-[var(--hoverColour)]/10 data-focus:text-white data-focus:outline-hidden"
      >
        <div className="flex items-center">
          <span className="truncate font-normal group-data-selected:font-semibold flex flex-row text-center gap-4">
            <img
              src={person.imageUrl}
              className="w-10 h-10"
              style={{
                borderColor: constructor!.hexColor,
                borderWidth: '1.5px',
                borderStyle: 'solid',
                borderRadius: '10rem',
                aspectRatio: '1/1',
              }}
            />
            <div className="flex flex-col">
              <div className="w-full text-left font-semibold">
                {person.firstName} {person.lastName}
              </div>
              <div className="w-full text-left text-gray-400">{constructor?.name}</div>
            </div>
          </span>
        </div>
      </ListboxOption>
    );
  });

  const onClear: MouseEventHandler<SVGAElement> = (event) => {
    event.stopPropagation();
    props.onChange(undefined);
  };

  const selectedConstructor = props.constructors.find((c) => c.drivers.includes(selected!));

  return (
    <Listbox value={props.selected} onChange={props.onChange}>
      <div className="relative mt-2">
        <ListboxButton
          className="grid w-full cursor-default grid-cols-1 rounded-md bg-[#1A1D23] text-white py-1.5 pr-2 pl-3 text-left sm:text-md/6"
          onClick={() => console.log('clicked')}
        >
          {!selected && !selectedConstructor && (
            <span className="h-12 py-1.5 col-start-1 row-start-1 flex items-center gap-3 pr-6">
              <span className="block truncate">{placeholder}</span>
            </span>
          )}
          {selected && selectedConstructor && (
            <div className="flex items-center">
              <span className="truncate font-normal group-data-selected:font-semibold flex flex-row text-center gap-4 items-center">
                <img
                  src={selected.imageUrl}
                  className="w-10 h-10 hidden xs:block"
                  style={{
                    borderColor: selectedConstructor.hexColor,
                    borderWidth: '1.5px',
                    borderStyle: 'solid',
                    borderRadius: '10rem',
                    aspectRatio: '1/1',
                  }}
                />
                <div className="flex flex-col">
                  <div className="w-full text-left font-semibold">
                    {selected.firstName} {selected.lastName}
                  </div>
                  <div className="w-full text-left text-gray-400">{selectedConstructor.name}</div>
                </div>
                <div className="absolute right-0 pr-4 text-gray-500 text-lg z-10">
                  <FaXmark className="cursor-pointer z-50" onClick={onClear} />
                </div>
              </span>
            </div>
          )}
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-md bg-[#1A1D23] py-1 text-white shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {listOptions}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
