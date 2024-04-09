import React from 'react';
import { createRoot } from 'react-dom/client';

import { Linechart } from './Linechart.tsx';

const rootElement = document.getElementById('root');
createRoot(rootElement!).render(<Linechart />);
