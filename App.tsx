import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Schema de validação com Yup para form
const validationSchema = yup.object().shape({
  username: yup.string().required("Username é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória")
});

// Componente personalizado para input com validação
const FormInput = ({ control, name, rules, placeholder, secureTextEntry }) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <>
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
        />
        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </>
    )}
  />
);

export default function CustomApp() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = data => console.log(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a)</Text>
      <FormInput control={control} name="username" placeholder="Nome de usuário" />
      <FormInput control={control} name="email" placeholder="Email" />
      <FormInput control={control} name="password" placeholder="Senha" secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLogin)}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    alignSelf: 'flex-start',
    color: '#E53935',
  },
});