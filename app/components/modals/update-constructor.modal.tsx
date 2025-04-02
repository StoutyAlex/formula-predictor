'use client';

import { Modal } from '../modal.component';
import { ConstructorSchema, type CreateConstructorData, type UpdateConstructorData } from '~/lib/schemas/constructor-schema';
import { BasicModalForm, type BasicModalFormProps, type ModalFormField } from '../basic-modal-form.component';
import { type ConstructorEntity } from '~/database/entities/constructor.entity';

interface UpdateConstructorModalProps {
  open: boolean;
  constructor?: ConstructorEntity;
  onClose: () => void;
  onCreate?: (constructor: CreateConstructorData) => void;
  onUpdate?: (constructor: UpdateConstructorData) => void;
}

export const UpdateConstructorModal = (props: UpdateConstructorModalProps) => {
  const fields: BasicModalFormProps['fields'] = [
    [
      { name: 'name', label: 'Short Name', type: 'text', span: 2, placeholder: 'Ferrari', value: props.constructor?.name },
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        span: 2,
        placeholder: 'Scuderia Ferrari',
        value: props.constructor?.fullName,
      },
    ],
    [
      {
        name: 'principal',
        label: 'Team Principal',
        type: 'text',
        placeholder: 'Frédéric Vasseur',
        value: props.constructor?.principal,
      },
      { name: 'colour', label: 'Colour', type: 'text', placeholder: '#FF0000', value: props.constructor?.colour },
    ],
    [{ name: 'country', label: 'Country', type: 'text', span: 1, placeholder: 'Italy', value: props.constructor?.country }],
    [
      {
        name: 'location',
        label: 'Location (City/Town)',
        type: 'text',
        span: 1,
        placeholder: 'Maranello',
        value: props.constructor?.location,
      },
    ],
  ];

  const confirmButtonText = props.constructor ? 'Update Constructor' : 'Create Constructor';

  const buttons: BasicModalFormProps['buttons'] = [
    {
      type: 'button',
      onClick: () => props.onClose(),
      text: 'Cancel',
    },
    {
      type: 'submit',
      text: confirmButtonText,
    },
  ];

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (props.constructor) {
      return onUpdate(event);
    }

    onCreate(event);
  };

  const onUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    if (!props.constructor) return;
    const formData = new FormData(event.currentTarget);

    const { data, valid, errors } = ConstructorSchema.validateUpdate({
      id: props.constructor.id,
      name: formData.get('name'),
      country: formData.get('country'),
      principal: formData.get('principal'),
      colour: formData.get('colour'),
      location: formData.get('location'),
      fullName: formData.get('fullName'),
      drivers: ['1', '2', '3'],
    });

    if (!valid) {
      console.error('Validation errors HERE:', errors);
      return;
    }

    console.log('Data:', data);

    return props.onUpdate?.(data);
  };

  const onCreate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const { data, valid, errors } = ConstructorSchema.validateCreate({
      name: formData.get('name'),
      country: formData.get('country'),
      principal: formData.get('principal'),
      colour: formData.get('colour'),
      location: formData.get('location'),
      fullName: formData.get('fullName'),
      drivers: ['4', '5', '6'],
    });

    if (!valid) {
      console.error('Validation errors:', errors);
      return;
    }

    return props.onCreate?.(data);
  };

  return (
    <Modal id="update-constructor-modal" open={props.open} title="Create Constructor" onClose={props.onClose}>
      <BasicModalForm fields={fields} buttons={buttons} onSubmit={onSubmit} />
    </Modal>
  );
};
