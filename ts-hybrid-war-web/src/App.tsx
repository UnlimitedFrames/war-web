import { useState } from 'react'
import './App.css'
import { Button, TextField } from '@mui/material';

function App() {
  const [apikey, setApikey] = useState("");

  const handleButton = () => {
    window.location.replace("?apikey=" + apikey)
  }
  return (
    <>

      <TextField focused color='success' className='apikeyinput' id="outlined-basic" label="Input API key" variant="filled" onChange={(event: any) => setApikey(event.target.value)} />

      <Button onClick={handleButton} variant="contained">Update</Button>
    </>
  )
}

export default App
