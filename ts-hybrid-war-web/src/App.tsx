import { useEffect, useState } from 'react'
import './App.css'
import { TextField } from '@mui/material';
import Web from './Web';

function App() {
  const [apikey, setApikey] = useState<string | undefined>(undefined);
  useEffect(() => {
    apikey
  }, [])
  return (
    <>

      <Web apikey={apikey} />
      <TextField focused color='success' className='apikeyinput' id="outlined-basic" label="Input API key" variant="filled" onChange={(event: any) => setApikey(event.target.value)} />
    </>
  )
}

export default App
