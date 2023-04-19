import { useEffect, useState } from 'react'
import './App.css'
import { TextField } from '@mui/material';
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

      <Web apikey={apikey} selected_nat={selectedNat} />
      <TextField focused color='success' className='apikeyinput' id="outlined-basic" label="Input API key" variant="filled" onChange={(event: any) => setApikey(event.target.value)} />
      <TextField focused color='success' id="outlined-basic" label="(Optional)Input A nation ID" variant="filled" onChange={(event: any) => setselectedNat(event.target.value)} />
      <p>
        What is this?
        <br />
        Simply put your api key in, hit enter, and wait up to 10s, a map of wars of the conflict this is tracking (currently coven) will be displayed, you can put your nation ID in to see 2 levels of your wars. flag size is related to city count, Theres alot more to come, please suggest feedback to limi on discord,
      </p>
    </>
  )
}

export default App
