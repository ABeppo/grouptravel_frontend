'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styles from './signup.module.css';
import { addUserToStore } from '../reducers/user';
import { lexend } from '../app/fonts';
import InputLabel from './InputLabel';

export default function SignUp({ handleRegister }) {
    const dispatch = useDispatch();
//import user data from reducer to verify if is connected
    const user = useSelector((state) => state.user.value);
    const router = useRouter();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//if is connected rout => Profil
    if (user.token) {
        router.push('/profile');
    }

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordNotMatch, setPasswordNotMatch] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

    const urlBackend = process.env.NEXT_PUBLIC_URL_BACKEND 

    const handleSubmit = () => {
//step to verify that email have email format        
if (emailRegex.test(email)){
    setEmailError(false);
    if (password === password2) {
        setPasswordNotMatch(false);
        fetch(`${urlBackend}users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password }),
        }).then(response => response.json())
        .then(data => {
            if (data.result) {
                const { token, myTrips, userPicture } = data; 
                dispatch(addUserToStore({ token, username: data.username, userPicture, email: data.email, myTrips }));
                setSubmitError(false);
                handleRegister();
                router.push('/profile'); // Move redirection here
            } else {
                setSubmitError(true);
            }
        })
    } else {
        setPasswordNotMatch(true)
    }
} else {
    setEmailError(true)
}
}

    return (
        <div className={styles.container}>
            <h3 className={`${styles.title} ${lexend.className}`}>On se rencontre ? Inscris-toi !</h3>
            <InputLabel type="text" onChange={(e) => setEmail(e.target.value)} value={email} label="Email" placeholder="Entre ton email ici !" />
            <InputLabel type="text" onChange={(e) => setUsername(e.target.value)} value={username} label="Nom d'utilisateur(trice)*" placeholder="Choisi ton nom !" />
            <InputLabel type="password" onChange={(e) => setPassword(e.target.value)} value={password} label="Mot de passe*" placeholder="Ecris ton mot de passe ... " />
            <InputLabel type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} label="Confirmation*" placeholder="Confirme ton mot de passe ! " />
            {passwordNotMatch && <p style={styles.error}>Les mots de passe sont différents</p>}
            {emailError && <p style={styles.error}>Entre une adresse email valide !</p>}
            {submitError && <p style={styles.error}>Il semble y avoir une erreur, vérifie les champs saisis !</p>}
            <button className={styles.button} onClick={() => handleSubmit()}>C'est parti !</button>
        </div>
    )



};