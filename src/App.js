import React, {useState, useEffect} from 'react';
import Form from './components/Form';



function App() {
  const [email, getEmail] = useState("");
   
  return (
      <Form />
  );
}

export default App;
