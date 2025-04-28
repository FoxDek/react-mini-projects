import React from 'react'
import { cva } from 'class-variance-authority';

const ImageCollectionSettingsContent = cva("ImageCollectionSettingsContent flex flex-col gap-10 lg:flex-row items-center");

const ImageCollectionSettingsList = cva(
  "ImageCollectionSettingsList flex gap-x-3 gap-y-2 items-center justify-center flex-wrap md:flex-nowrap"
);

const ImageCollectionSettingsListItem = cva(
  "ImageCollectionSettingsListItem py-2 px-4 border font-bold border-gray-300 rounded-2xl shadow-sm cursor-pointer hover:bg-blue-100 active:translate-y-1 duration-75 transition-all ease-in-out",
  {
    variants: {
      active: {
        true: 'bg-blue-300 text-white hover:bg-blue-400',
        false: 'bg-white'
      }
    }
  }
);

const ImageCollectionSettingsSearch = cva(
  "usersSearch flex items-center justify-center gap-4 p-2 border-1 border-gray-300 rounded-2xl focus-within:border-blue-300 focus-within:shadow-md focus-within:scale-101 transition-all duration-300 ease-in-out"
);

const ImageCollectionSettingsSearchInput = cva(
  "usersSearchInput outline-none w-full text-sm"
);

const ImageCollectionSettingsSearchIcon = cva(
  "userSearchIcon w-6 h-6 text-gray-400"
);

const categories = [
  { name: "All" },
  { name: "Sea" },
  { name: "Mountains" },
  { name: "Architecture" },
  { name: "Cities" },
];

function ImageCollectionSettings({activeCategory, setActiveCategory, isLoading, searchValue, setSearchValue}) {
  return (
    <div className={ImageCollectionSettingsContent()} hidden={isLoading}>
      <ul className={ImageCollectionSettingsList()}>
        {categories.map((category, index) => (
          <li key={index} className={ImageCollectionSettingsListItem({ active: activeCategory === index })} onClick={() => setActiveCategory(index)}>{category.name}</li>
        ))}
      </ul>

      <div className={ImageCollectionSettingsSearch()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={ImageCollectionSettingsSearchIcon()}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
        <input
          className={ImageCollectionSettingsSearchInput()}
          name='search'
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          maxLength={30}
          placeholder='Search'
        />
      </div>
    </div>
  )
}

export default ImageCollectionSettings