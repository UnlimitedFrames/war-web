import { useEffect, useState } from 'react'
import './App.css'
import { Alert, Button, CircularProgress, Switch, TextField } from '@mui/material';
import web from './Web';

function App() {
  const [apikey, setApikey] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [natOrAA, setNatOrAA] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    apikey
    id
  }, [])
  return (
    <>
      <Alert severity='info'>Simply put your API key & hit enter in and the web of the current tracked conflict will be built, takes less than 10s, Any questions please on the discord</Alert>
      <Button href="https://discord.gg/bnPQvGX" target="_blank" variant="contained" color="success" size="large">Join the Discord</Button>
      <div id='network' style={{ width: "1200px", height: "700px", position: "sticky", left: "0px", top: "5px", backgroundColor: "#6da177" }}></div >
      {isLoading && <CircularProgress color="secondary" />}
      <TextField focused color='success' className='apikeyinput' id="outlined-basic" label="Input API key" variant="filled" onChange={(event: any) => setApikey(event.target.value)} />
      <Switch checked={natOrAA} onChange={(event) => setNatOrAA(event.target.checked)} color="secondary" />
      <TextField focused color='success' id="outlined-basic" label={natOrAA ? "Input a nation ID" : "Input an alliance ID"} variant="filled" value={id} onChange={(event: any) => setId(event.target.value)} />
      <Button onClick={() => web({ apikey, id, natOrAA, setisLoading, setError })} variant='contained' > Update </Button>
      {error && <Alert severity='error'>{error}</Alert>}
    </>
  )
}

export default App
