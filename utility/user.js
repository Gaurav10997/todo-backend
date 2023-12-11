const users = [
    {
      "username": "Gaurav Mandal",
      "email": "avdhika@gmail.com",
      "password": "123456"
    },
    {
      "username": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    },
    {
      "username": "Alice Smith",
      "email": "alice@example.com",
      "password": "securePassword"
    },
    {
      "username": "Bob Johnson",
      "email": "bob@example.com",
      "password": "test123"
    }
  ]


  async function registerUser(userData) {
    try {
      const response = await fetch('http://localhost:200/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const data = await response.json();
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('There was a problem registering the user:', error);
    }
  }

  
  users.forEach(user => {
    registerUser(user);
  });