import { Box } from '@mui/material';
import ControlPanel from 'features/controlPanel/ui/ControlPanel';
import { Search } from 'features/search/ui/Search';

export const LeftHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <ControlPanel />
      <Search />
    </Box>
  );
};
