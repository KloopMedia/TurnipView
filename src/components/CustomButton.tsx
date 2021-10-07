import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import { green } from '@mui/material/colors';

const CustomButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[300]),
    backgroundColor: green[300],
    '&:hover': {
      backgroundColor: green[400],
    }
  }));


export default CustomButton