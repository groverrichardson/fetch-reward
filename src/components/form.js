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
import Confirmation from './confirmation';
import validator from 'validator';
import { LoadingButton } from '@mui/lab';

function Form() {
    const [occupationList, setOccupationList] = useState([]);
    const [occupationIndex, setOccupationIndex] = useState('');
    const [stateList, setStateList] = useState([[]]);
    const [stateIndex, setStateIndex] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [occupation, setOccupation] = useState('');
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`https://frontend-take-home.fetchrewards.com/form`)
            .then((response) => {
                setOccupationList(response.data.occupations);
                setStateList(response.data.states);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
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
        if (type === 'email') setEmail(e.target.value);
        if (type === 'password') setPassword(e.target.value);
    };

    function validated() {
        let validEmail = validator.isEmail(email) ? true : false;
        let validPassword = validator.isStrongPassword(password) ? true : false;

        validEmail ? setEmailError(false) : setEmailError(true);
        validPassword ? setPasswordError(false) : setPasswordError(true);

        if (validEmail && validPassword) return true;
        return false;
    }

    function submitData() {
        if (validated()) {
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
                if (response.status !== 200) {
                    setError(true);
                    return;
                }
                setSubmitted(true);
            });
        }
        setLoading(false);
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            submitData();
        }, 500);
    };

    if (submitted === true) {
        return <Confirmation />;
    } else {
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
                            error={emailError}
                            onChange={(e) => {
                                handleChange(e, 'email');
                            }}
                        />
                        {emailError ? (
                            <p className="email-error-message text-sm text-red-500">
                                Please enter a valid email address.
                            </p>
                        ) : (
                            ''
                        )}
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange={(e) => {
                                handleChange(e, 'password');
                            }}
                        />
                        {passwordError ? (
                            <div className="password-helpers">
                                <p className="password-error-message text-sm text-red-500">
                                    Please enter a valid password.
                                </p>
                                <p className="password-error-message text-xs">
                                    Password should contain at least eight
                                    characters, one lowercase, one uppercase,
                                    one number, and one symbol.
                                </p>
                            </div>
                        ) : (
                            <p className="password-error-message text-xs">
                                Password should contain at least eight
                                characters, one lowercase, one uppercase, one
                                number, and one symbol.
                            </p>
                        )}
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
                        <LoadingButton
                            loading={loading}
                            id="submit-button"
                            className="w-full"
                            variant="contained"
                            type="submit">
                            Create Account
                        </LoadingButton>
                    </form>
                </Container>
            </div>
        );
    }
}

export default Form;
