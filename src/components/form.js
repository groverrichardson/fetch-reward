import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React, { useEffect } from 'react';

function Form() {
    return (
        <div className="Form h-screen flex flex-col justify-center content-center">
            <Container maxWidth="sm">
                <h1 className="text-3xl font-bold mb-3">
                    Create a New Account
                </h1>
                <form
                    action="/signup"
                    method="post"
                    id="signup"
                    className="grid">
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
                        <InputLabel required id="occupation-select-label">
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
                        <InputLabel required id="state-select-label">
                            State
                        </InputLabel>
                        <Select
                            labelId="state-select-label"
                            id="state-select"
                            label="state">
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        id="submit-button"
                        className="w-full"
                        variant="contained"
                        type="submit">
                        Create Account
                    </Button>
                </form>
            </Container>
        </div>
    );
}

export default Form;
