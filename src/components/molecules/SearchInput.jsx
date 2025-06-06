import React from 'react'
      import Input from '@/components/atoms/Input'
      import Icon from '@/components/atoms/Icon'

      const SearchInput = ({ value, onChange, placeholder = "Search...", ...props }) => {
        return (
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            icon={Icon}
            iconName="Search"
            {...props}
          />
        )
      }

      export default SearchInput