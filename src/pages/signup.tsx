import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Call the signup API
      const response = await axios.post('/api/signup', formData);

      // Save the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard after successful signup
      router.push('/');
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || 'Signup failed';
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h1>Sign Up</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSignup}>
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '10px' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
