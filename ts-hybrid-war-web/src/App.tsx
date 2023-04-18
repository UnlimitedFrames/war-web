import { useEffect, useState } from 'react'
import './App.css'
import { TextField } from '@mui/material';
import Web from './Web';

function App() {
  const [apikey, setApikey] = useState<string | undefined>(undefined);
  const [selectedNat, setselectedNat] = useState<string | undefined>(undefined);

  useEffect(() => {
    apikey
  }, [])
  return (
    <>

      <Web apikey={apikey} selected_nat={selectedNat} />
      <TextField focused color='success' className='apikeyinput' id="outlined-basic" label="Input API key" variant="filled" onChange={(event: any) => setApikey(event.target.value)} />
      <TextField focused color='success' id="outlined-basic" label="(Optional)Input A nation ID" variant="filled" onChange={(event: any) => setselectedNat(event.target.value)} />
    </>
  )
}

export default App
