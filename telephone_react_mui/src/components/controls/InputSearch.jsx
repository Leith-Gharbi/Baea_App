import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
export default function InputSearch(props) {
  const { name, SetSearchKey, data, ...other } = props;

  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => option.fullName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={name}
            margin="normal"
            variant="outlined"
            onChange={(e) => {
              SetSearchKey(e.target.value);
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              type: 'search',
            }}
          />
        )}
      />
    </>
  );
}
