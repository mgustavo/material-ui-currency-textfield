import React from "react"
import CurrencyTextField from "@mgustavo/material-ui-currency-textfield"
import { Button, TextField } from "@mui/material"
import { useForm, Controller } from "react-hook-form"

const defaultValues = {
  amount: 0,
  lastName: "",
}

export default function App() {
  const { handleSubmit, reset, control } = useForm({
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log('data', data))} className="form">
      <Controller
        control={control}
        rules={{
          min: {
            value: 100,
            message: "Minimum number is 100"
          }
        }}
        name="amount"
        render={({ field, fieldState }) => {
          return <CurrencyTextField
            label="Amount"
            value={field.value}
            currencySymbol="$"
            maximumValue={"100000000000000000"}
            autoFocus
            onChange={(e, value) => field.onChange(value)}
            error={!!fieldState.error}
            helperText={fieldState?.error?.message}
            decimalCharacter="."
            digitGroupSeparator=","
            inputRef={(ref) => {
              field.ref({
                focus: () => {
                  ref.domElement.focus();
                }
              });
            }}
          />
        }}
      />

      <Controller
        control={control}
        rules={{ required: 'lastName is required' }}
        name="lastName"
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <TextField
            label="Last Name"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            inputRef={ref}
          />
        )
        }
      />

      <Button onClick={() => reset({ defaultValues })}>Reset</Button>
      <button>submit</button>
    </form>
  )
}
