import { Skeleton } from '@material-ui/lab';
import { Box } from '@mui/system';
import React from 'react';

const SkeletonBase = () => {
  return (
    <Box sx={{ pt: 0.5 }}>
      <Skeleton variant="rectangular" width={260} height={200} />
      <div style={{ marginLeft: '50px', marginTop: '10px' }}>
        <Skeleton variant="rectangular" width={150} height={40} />{' '}
      </div>
    </Box>
  );
};

export default SkeletonBase;
