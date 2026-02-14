import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');

  const sendOtp = async () => {
    // Reset error
    setError('');

    // Validate email
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      // Simulating API call to send OTP
      const response = await fetch('https://api.example.com/send-otp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP.');
      }

      setIsOtpSent(true);
      Alert.alert('OTP sent successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = () => {
    // Validate OTP
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    // Handle OTP verification
    Alert.alert('OTP Verified!');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        keyboardType='email-address'
      />

      {isOtpSent && (
        <>
          <Text>Enter OTP:</Text>
          <TextInput
            value={otp}
            onChangeText={setOtp}
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
            keyboardType='numeric'
          />
          <Button title='Verify OTP' onPress={verifyOtp} />
        </>
      )}

      {!isOtpSent && <Button title='Send OTP' onPress={sendOtp} />}

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;