import supabase from './supabaseClient';

export async function signUp(email, password) {
    debugger;
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.error('Error signing up:', error);
    } else {
        console.log('User signed up:', user);
    }
}

export async function signIn(email, password) {
    const { user, session, error } = await supabase.auth.signIn({ email, password });

    if (error) {
        console.error('Error signing in:', error);
    } else {
        console.log('User signed in:', user);
        console.log('Session:', session);
    }
}

export function onAuthStateChange(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}
