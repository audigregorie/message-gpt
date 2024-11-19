import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { InputForm } from '../../interface/common.interface';

const FormInput: React.FC<InputForm> = ({ name, label, type }: InputForm) => {
  return (
    <>
      <FormControl className="!my-2">
        <InputLabel htmlFor={name} className="!text-white">
          {label}
        </InputLabel>
        <OutlinedInput type={type} id={name} name={name} label={label} className="!text-white w-96 h-14" />
      </FormControl>
    </>
  );
};

export default FormInput;
