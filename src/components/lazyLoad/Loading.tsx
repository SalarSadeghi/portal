// import { CircularProgress, Grid } from '@repo/ui/base';
import { CircularProgress, Grid } from '@mui/material';
import { FC } from 'react';

interface LoadingProps {
    isFullHeight?: boolean;
    size?: number;
}

const Loading: FC<LoadingProps> = ({ isFullHeight, size }) => (
  <Grid
    display="flex"
    justifyContent="center"
    alignItems="center"
    height={isFullHeight ? '100%' : undefined}
    container
    direction="column"
  >
    <CircularProgress size={size || 35} />
  </Grid>
);

export default Loading;
