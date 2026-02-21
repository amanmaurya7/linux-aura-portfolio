
import React from 'react';
import { useOS } from '@/context/OSContext';
import BootScreen from './os/BootScreen';
import Desktop from './os/Desktop';
import LoginScreen from './os/LoginScreen';

const System = () => {
    const { isBooting, isLoggedIn, isLocked } = useOS();

    if (isBooting) return <BootScreen />;
    if (!isLoggedIn || isLocked) return <LoginScreen />;
    return <Desktop />;
};

export default System;
