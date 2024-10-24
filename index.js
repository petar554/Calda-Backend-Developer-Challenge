import { signUp, signIn, onAuthStateChange } from './auth';

const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    await signUp(email, password);
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    await signIn(email, password);
});

onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event, session);
    if (session) {
        console.log('User is logged in:', session.user)
    } else {
        console.log('User is logged out');
    }
});
