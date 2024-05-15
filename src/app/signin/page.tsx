import React from 'react';
import { type Metadata } from 'next';

import SignIn from '@/components/sign-in/sign-in';

export const metadata: Metadata = {
	title: 'Sign In'
};

const SignInOptions = [
	{ name: 'Github', id: 'github', icon: '/static/github.svg' },
	{ name: 'Google', id: 'google', icon: '/static/google.png' }
];

const SignInPage = () => <SignIn options={SignInOptions} />;

export default SignInPage;
