import { memo, useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    width: 500,
  },
}));

interface ISearchBarProps {
  keys: string[];
  onSearch: (key: string) => void;
  onChange: (term: string) => void;
}

export const SearchBar = memo(
  ({ keys, onChange, onSearch }: ISearchBarProps) => {
    const classes = useStyles();
    const [secret, setSecret] = useState('');
    const [key, setKey] = useState<string | null>(null);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setKey(event.target.value);
      onChange(event.target.value);
    };

    const enterKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        onSearch(secret);
      }
    };
    return (
      <Paper className={classes.root}>
        <Autocomplete
          options={keys}
          getOptionLabel={(option: string) => option}
          className={classes.searchInput}
          onChange={(event, newValue) => setSecret(newValue as string)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              onChange={changeHandler}
              onKeyDown={enterKeyHandler}
            />
          )}
        />
        <IconButton
          color="primary"
          component="span"
          disabled={!key}
          onClick={() => onSearch(secret)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
);
