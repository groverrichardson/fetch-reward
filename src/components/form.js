import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React, { useEffect } from 'react';

function Form() {
    return (
        <main className="Form">
            <form action="/signup" method="post" id="signup">
                <TextField
                    required
                    id="outlined-name"
                    label="Name"
                    variant="outlined"
                />
                <TextField
                    required
                    id="outlined-email"
                    label="Email"
                    variant="outlined"
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    variant="outlined"
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Verify Password"
                    type="password"
                    variant="outlined"
                />
                <FormControl fullWidth>
                    <InputLabel id="occupation-select-label">
                        Occupation
                    </InputLabel>
                    <Select
                        labelId="occupation-select-label"
                        id="occupation-select"
                        label="occupation">
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="state-select-label">State</InputLabel>
                    <Select
                        labelId="state-select-label"
                        id="state-select"
                        label="state">
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </main>
    );
}

export default Form;
