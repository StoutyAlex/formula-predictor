import { Button } from './button.component';

export interface BasicModalFormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  buttons: ModalFormButton[];
  fields: ModalFormField[][];
}

export interface ModalFormButton {
  type: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  className?: string;
}

export interface ModalFormField {
  name: string;
  label: string;
  type: string;
  value?: string;
  placeholder?: string;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

const getFieldGroup = (group: ModalFormField[], row: number) => {
  let nextColStart = 1;

  // TODO: Show input errors
  return group.map((field, index) => {
    const colSpan = field.span || 1;

    const colStart = nextColStart;
    nextColStart += colSpan;

    return (
      <div key={index} style={{ gridRow: row, gridColumn: `${colStart} / span ${colStart + colSpan}` }}>
        <label className="text-sm block text-gray-400 mb-2">{field.label}</label>
        <input
          type={field.type}
          name={field.name}
          defaultValue={field.value}
          className="text-sm w-full bg-[#262931] text-white rounded-lg p-1.5 border border-gray-700 focus:border-red-500 focus:outline-none"
          placeholder={field.placeholder || field.label}
        />
      </div>
    );
  });
};

export const BasicModalForm = (props: BasicModalFormProps) => {
  const { fields } = props;

  const formFields = (
    <div className="grid grid-cols-4 gap-4">
      {fields.map(
        (group, index) =>
          // <div style={{ gridRow: index + 1 }}>
          getFieldGroup(group, index + 1)
        // </div>
      )}
    </div>
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit?.(event);
  };

  return (
    <form onSubmit={onSubmit}>
      {formFields}

      {props.children}

      <div className="flex justify-end gap-3 mt-6">
        {props.buttons.map((button, index) => (
          <Button
            key={index}
            type={button.type}
            variant={button.type === 'submit' ? 'accent' : undefined}
            value={button.text}
            onClick={button.onClick}
          />
        ))}
      </div>
    </form>
  );
};
