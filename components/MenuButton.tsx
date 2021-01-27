import React from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  MenuButton as ChakraMenuButton,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

export default function MenuButton({ handleClick }) {
  return (
    <Menu placement="bottom-end">
      <ChakraMenuButton
        as={IconButton}
        mr="1rem"
        minW="4rem"
        aria-label="Open menu"
        display={['flex', null, null, 'none']}
        icon={<HamburgerIcon />}
      />
      <MenuList>
        <MenuItem onClick={() => handleClick('top_rated')}>TOP RATED</MenuItem>
        <MenuItem onClick={() => handleClick('now_playing')}>NOW PLAYING</MenuItem>
      </MenuList>
    </Menu>
  )
}
