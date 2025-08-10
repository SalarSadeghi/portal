
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import {  ThemeProvider as MuiThemeProvider, type Theme } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    theme: Theme;
    direction: 'rtl' | 'ltr';
}

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
    key: 'muiltr',
    stylisPlugins: [prefixer],
});

export const ThemeProvider: FC<Props> = (props) => {
    return (
        <CacheProvider value={props.direction === 'ltr' ? cacheLtr : cacheRtl}>
            <MuiThemeProvider theme={props.theme}>{props.children}</MuiThemeProvider>
        </CacheProvider>
    );
};