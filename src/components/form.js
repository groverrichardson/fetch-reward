import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Form() {
    const [occupationList, setOccupationList] = useState([]);
    const [occupationIndex, setOccupationIndex] = useState('');
    const [stateList, setStateList] = useState([[]]);
    const [stateIndex, setStateIndex] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [occupation, setOccupation] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const searchOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            redirect: 'follow',
        };

        fetch(`https://frontend-take-home.fetchrewards.com/form`, searchOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Unable to fetch data');
            })
            .then((data) => {
                setOccupationList(data.occupations);
                setStateList(data.states);
            })
            .catch((err) => setError(err.message));
    }, []);

    let handleSelectChange = (e, type) => {
        let index = e.target.value;

        if (type === 'occupation') {
            setOccupationIndex(index);
            setOccupation(occupationList[index]);
        }

        if (type === 'state') {
            setStateIndex(e.target.value);
            setState(stateList[index]);
        }
    };

    let handleChange = (e, type) => {
        if (type === 'name') setUserName(e.target.value);
        if (type === 'email') setUserName(e.target.value);
        if (type === 'password') setUserName(e.target.value);
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'https://frontend-take-home.fetchrewards.com/form',
            data: {
                name: `${userName}`,
                email: `${email}`,
                password: `${password}`,
                occupation: `${occupation}`,
                state: `${state}`,
            },
        }).then(function (response) {
            console.log(response);
        });
    };

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
                    className="grid"
                    onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="outlined-name"
                        label="Name"
                        variant="outlined"
                        onChange={(e) => {
                            handleChange(e, 'name');
                        }}
                    />
                    <TextField
                        required
                        id="outlined-email"
                        label="Email"
                        variant="outlined"
                        onChange={(e) => {
                            handleChange(e, 'name');
                        }}
                    />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                        onChange={(e) => {
                            handleChange(e, 'name');
                        }}
                    />
                    <FormControl fullWidth>
                        <InputLabel required id="occupation-select-label">
                            Occupation
                        </InputLabel>
                        <Select
                            labelId="occupation-select-label"
                            id="occupation-select"
                            value={occupationIndex}
                            label="occupation"
                            onChange={(e) => {
                                handleSelectChange(e, 'occupation');
                            }}>
                            {occupationList.map((occupation, i) => {
                                return (
                                    <MenuItem key={i} value={i}>
                                        {occupation}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel required id="state-select-label">
                            State
                        </InputLabel>
                        <Select
                            labelId="state-select-label"
                            id="state-select"
                            value={stateIndex}
                            label="state"
                            onChange={(e) => {
                                handleSelectChange(e, 'state');
                            }}>
                            {stateList.map((state, i) => {
                                return (
                                    <MenuItem key={i} value={i}>
                                        {state.abbreviation}
                                    </MenuItem>
                                );
                            })}
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
