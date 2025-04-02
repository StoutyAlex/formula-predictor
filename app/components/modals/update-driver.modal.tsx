'use client';

import type { DriverEntity } from '~/database/entities/driver.entity';
import { DriverSchema, type CreateDriverData, type UpdateDriverData } from '~/lib/schemas/driver-schema';
import { Modal } from '../modal.component';
import { CountrySelector } from '../country-picker/selector';
import { useCallback, useState } from 'react';
import { COUNTRIES } from '../country-picker/countries';
import type { SelectMenuOption } from '../country-picker/types';
import type { ConstructorEntity } from '~/database/entities/constructor.entity';
import { Button } from '../button.component';
interface UpdateDriverModalProps {
  open: boolean;
  driver?: DriverEntity;
  constructors: ConstructorEntity[];
  onClose: () => void;
  onCreate?: (driver: CreateDriverData) => void;
  onUpdate?: (driver: UpdateDriverData) => void;
}

export const UpdateDriverModal = (props: UpdateDriverModalProps) => {
  const [countrySelectorOpen, setCountrySelectorOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('GB');

  const confirmButtonText = props.driver ? 'Update driver' : 'Create driver';

  const onUpdate = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (!props.driver) return;
      const formData = new FormData(event.currentTarget);

      const { data, valid, errors } = DriverSchema.validateUpdate({
        id: props.driver.id,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        abbreviation: formData.get('abbreviation'),
        number: formData.get('number'),
        country: selectedCountry,
        constructorId: formData.get('team'),
      });

      if (!valid) {
        console.error('Validation errors HERE:', errors);
        return;
      }

      return props.onUpdate?.(data);
    },
    [props.driver, props.onUpdate, selectedCountry]
  );

  const onCreate = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(event.currentTarget);

      const { data, valid, errors } = DriverSchema.validateCreate({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        abbreviation: formData.get('abbreviation'),
        number: formData.get('number'),
        country: selectedCountry,
        constructorId: formData.get('team'),
      });

      if (!valid) {
        console.error('Validation errors:', errors);
        return;
      }

      return props.onCreate?.(data);
    },
    [selectedCountry, props.onCreate]
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Submitting form...', new FormData(event.currentTarget));
      if (props.driver) {
        return onUpdate(event);
      }

      onCreate(event);
    },
    [props.driver, onCreate, onUpdate]
  );

  return (
    <Modal id="update-driver-modal" open={props.open} title="Create Driver" onClose={props.onClose}>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-4 gap-4">
          {/* First Name */}
          <div className="col-span-2">
            <label className="text-sm block text-gray-400 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              // defaultValue={props.driver?.name}
              className="text-sm w-full bg-[#262931] text-white rounded-lg p-1.5 border border-gray-700 focus:border-red-500 focus:outline-none"
              placeholder="Lewis"
            />
          </div>
          {/* Last Name */}
          <div className="col-span-2">
            <label className="text-sm block text-gray-400 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              // defaultValue={props.driver?.name}
              className="text-sm w-full bg-[#262931] text-white rounded-lg p-1.5 border border-gray-700 focus:border-red-500 focus:outline-none"
              placeholder="Hamilton"
            />
          </div>
          {/* Abbreviation */}
          <div className="col-span-1">
            <label className="text-sm block text-gray-400 mb-2">Abbreviation</label>
            <input
              type="text"
              name="abbreviation"
              // defaultValue={props.driver?.name}
              className="text-sm w-full bg-[#262931] text-white rounded-sm p-1.5 border border-gray-700 focus:border-red-500 focus:outline-none"
              placeholder="HAM"
            />
          </div>
          {/* Number */}
          <div className="col-span-1">
            <label className="text-sm block text-gray-400 mb-2">Number</label>
            <input
              type="text"
              name="number"
              // defaultValue={props.driver?.name}
              className="text-sm w-full bg-[#262931] text-white rounded-lg p-1.5 border border-gray-700 focus:border-red-500 focus:outline-none"
              placeholder="44"
            />
          </div>
          {/* Country */}
          <div className="col-span-2">
            <label className="text-sm block text-gray-400 mb-2">Country</label>
            <CountrySelector
              id="driver-country"
              open={countrySelectorOpen}
              selectedValue={COUNTRIES.find((country) => country.value === selectedCountry) as SelectMenuOption}
              onToggle={() => setCountrySelectorOpen(!countrySelectorOpen)}
              onChange={(country) => setSelectedCountry(country)}
            />
          </div>
          {/* Team */}
          <div className="col-span-2">
            <label className="text-sm block text-gray-400 mb-2">Constructor</label>
            <select
              className="text-sm w-full bg-[#262931] text-white rounded-lg p-1.5 border border-gray-700 focus:border-red-500 focus:outline-none"
              name="team"
            >
              <option value="">Select Constructor</option>
              {props.constructors.map((constructor) => (
                <option key={constructor.id} value={constructor.id}>
                  {constructor.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button value="Cancel" onClick={props.onClose} />
          <Button type="submit" variant="submit" value={confirmButtonText} />
        </div>
      </form>
    </Modal>
  );
};
