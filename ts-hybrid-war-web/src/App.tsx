import { useEffect, useState } from 'react'
import './App.css'
import { Alert, Button, TextField } from '@mui/material';
import Web from './Web';

function App() {
  const [apikey, setApikey] = useState<string | undefined>(undefined);
  const [selectedNat, setselectedNat] = useState<string | undefined>(undefined);

  useEffect(() => {
    apikey
    selectedNat
  }, [])
  return (
    <>
      <Alert severity='info'>Simply put your API key & hit enter in and the web of the current tracked conflict will be built, takes less than 10s, Any questions please on the discord</Alert>
      <Button href="https://discord.gg/bnPQvGX" target="_blank" variant="contained" color="success" size="large">Join the Discord</Button>
      <Web apikey={apikey} selected_nat={selectedNat} />
      <TextField focused color='success' type='password' className='apikeyinput' id="outlined-basic" label="Input API key" variant="filled" onChange={(event: any) => setApikey(event.target.value)} />
      <TextField focused color='success' id="outlined-basic" label="(Optional)Input A nation ID" variant="filled" onChange={(event: any) => setselectedNat(event.target.value)} />
    </>
  )
}

export default App
