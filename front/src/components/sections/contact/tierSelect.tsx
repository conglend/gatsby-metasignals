import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { css } from '@emotion/css'
import { useTheme } from '@mui/system'
import { FieldValues, UseFormRegister } from 'react-hook-form/dist/types'
import { Strapi__Component_Contact_Tiers_List } from 'gatsby-graphql'

interface ITierSelectProps {
  registerFunction: UseFormRegister<FieldValues>
  tiers: Strapi__Component_Contact_Tiers_List[]
}
export default function TierSelect({ registerFunction: register, tiers }: ITierSelectProps) {
  const theme = useTheme()
  return (
    <Autocomplete
      className={css`
        height: 56px;
        background-color: ${theme.palette.grey[100]};
        width: 100%;
        padding: 10px;
        font-size: 18px;
        ::placeholder {
          color: ${theme.palette.background.default};
        }
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-color: transparent;
        border-bottom: 1px solid white;
        color: ${theme.palette.background.default};
      `}
      id="tier-select"
      options={tiers}
      autoHighlight
      getOptionLabel={(option) => option?.Tier}
      renderOption={(props, option) => (
        <Box
          {...props}
          component="li"
          className={css`
            color: ${theme.palette.background.default};
          `}
        >
          {option.Tier}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...register('membershipTier')}
          sx={{
            '& *': {
              height: '35px',
              padding: '0',
              color: `${theme.palette.background.default} !important`,
              borderColor: 'transparent !important',
            },
            '& div': { paddingY: '0 !important' }, //align input with form
          }}
          {...params}
          inputProps={{
            ...params.inputProps,
            className: css`
              height: 35px;
              padding: 0;
            `,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}
