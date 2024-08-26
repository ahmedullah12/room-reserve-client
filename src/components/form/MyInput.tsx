import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const MyInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Label>{label}</Label>
      <Controller
        name={name}
        rules={{required: `${label} is required`}}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              className="max-w-[300px] focus:outline-none"
              {...field}
              type={type}
              id={name}
              disabled={disabled}
              value={field.value || ""}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default MyInput;
