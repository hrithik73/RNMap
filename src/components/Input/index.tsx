import { Controller, ControllerProps } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { AppTheme, useAppTheme } from '~/theme/theme';

type InputProps = {
  name: string;
  placeholder: string;
  control: any;
} & TextInputProps &
  Omit<ControllerProps, 'render'>;

const Input = ({ name, placeholder, control, ...rest }: InputProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <Controller
      {...rest}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, isDirty, isTouched },
      }) => {
        return (
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              value={value}
              mode="outlined"
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              {...rest}
            />
            {error?.message && (
              <HelperText style={styles.errorText} type="error">
                {error?.message}
              </HelperText>
            )}
          </View>
        );
      }}
      name={name}
      control={control}
    />
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 90,
    },
    errorText: {
      color: 'red',
    },
    textInput: {
      height: 55,
    },
  });

export default Input;
