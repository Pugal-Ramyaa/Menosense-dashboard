import React from 'react';
import { createRoot } from 'react-dom/client';

import { Symptoms } from './Symptoms.tsx';

const rootElement = document.getElementById('root');
createRoot(rootElement!).render(<Symptoms/>);
