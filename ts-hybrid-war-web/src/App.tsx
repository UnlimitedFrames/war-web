import { useEffect, useState } from 'react'
import './App.css'
import { Alert, Box, Button, CircularProgress, Grid, Modal, Paper, Slider, Switch, TextField, Typography, styled } from '@mui/material';
import web from './Web';

function App() {
  const [apikey, setApikey] = useState(localStorage.getItem("apikey"));
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [natOrAA, setNatOrAA] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [level, setLevel] = useState(1)
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (event: Event, newValue: number | number[]) => {

    (typeof newValue == "number" && [1, 2, 3].includes(newValue)) && setLevel(newValue);
  };

  useEffect(() => {
    apikey
    id
  }, [])
  return (
    <>
      <Alert severity='info'>Simply put your API key & a nation or alliance ID & hit update. Any questions please go to the discord!</Alert>
      <Box className="box">
        <Grid container spacing={4} className="box">
          <Grid item >
            <Button href="https://discord.gg/bnPQvGX" target="_blank" variant="contained" color="success" size="large">Join the Discord</Button>
          </Grid>
          <Grid item >
            <Button onClick={handleOpen} color='warning' variant='contained'>Open Settings</Button>
          </Grid>
          <Grid item >
            <Button onClick={() => apikey && web({ apikey, id, natOrAA, setisLoading, setError, level })} variant='contained' > Update </Button>
          </Grid>
          <Grid item >
            {error && <Alert severity='error'>{error}</Alert>}
          </Grid>
          <Grid item >

          </Grid>
          <Grid item >
            {isLoading && <CircularProgress color="secondary" />}
            <div id='network' style={{ width: "100%", height: "700px", position: "sticky", left: "0px", top: "5px", backgroundColor: "#6da177" }} />
          </Grid>
        </Grid>

      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2} >
            <Grid item>
              <TextField value={apikey} type={'password'} focused color='success' className='apikeyinput' id="outlined-basic" label="Input API key" variant="filled" onChange={(event: any) => { setApikey(event.target.value); localStorage.setItem("apikey", event.target.value) }} />
            </Grid>
            <Grid item>
              <Paper>
                <Switch checked={natOrAA} onChange={(event) => setNatOrAA(event.target.checked)} color="secondary" />
                <TextField focused color='success' id="outlined-basic" label={natOrAA ? "Input a nation ID" : "Input an alliance ID"} variant="filled" value={id} onChange={(event: any) => setId(event.target.value)} />
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Typography>
                  Set The war Depth (More levels = More wars)
                </Typography>
                <Slider value={level} marks min={1} max={3} valueLabelDisplay="on" onChange={handleChange} />
              </Paper>
            </Grid>
            <Grid item>
              <Button onClick={handleClose}>Close</Button>
            </Grid>
            <Grid item>
              <Button onClick={() => {
                apikey && web({ apikey, id, natOrAA, setisLoading, setError, level })
                handleClose()
              }} variant='contained' > Update </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default App
