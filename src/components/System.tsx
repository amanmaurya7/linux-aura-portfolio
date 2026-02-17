
import React from 'react';
import { useOS } from '@/context/OSContext';
import BootScreen from './os/BootScreen';
import Desktop from './os/Desktop';
import LoginScreen from './os/LoginScreen';

const System = () => {
    const { isBooting, isLoggedIn } = useOS();

    if (isBooting) return <BootScreen />;
    if (!isLoggedIn) return <LoginScreen />;
    return <Desktop />;
};

export default System;
