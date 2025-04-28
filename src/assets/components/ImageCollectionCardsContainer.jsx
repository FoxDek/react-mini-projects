import React from 'react'
import { cva } from 'class-variance-authority'

const ImageCollectionCardsContent = cva(
  "ImageCollectionCardsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
)

const ImageCollectionCard = cva(
  "ImageCollectionCard flex flex-col gap-5 p-3 border border-gray-300 rounded-2xl shadow-sm h-full hover:scale-102 transition-all ease-in-out cursor-pointer"
)

const ImageCollectionImage = cva(
  "rounded-2xl object-cover ",
  {
    variants: {
      size: {
        mini: 'h-[80px] w-[31%]',
        big: 'h-[250px] w-full md:h-[200px]'
      }
    }
  }
)

function ImageCollectionCardsContainer({items, searchValue}) {
  return (
    <div className={ImageCollectionCardsContent()}>

      {items
      .filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase())
      })
      .map((item, index) => (
        <div key={index} className={ImageCollectionCard()}>
          <img src={item.photos[0]} alt="" className={ImageCollectionImage({size: 'big'})} />
          <div className="flex justify-between">
            <img src={item.photos[1]} alt="" className={ImageCollectionImage({size: 'mini'})} />
            <img src={item.photos[2]} alt="" className={ImageCollectionImage({size: 'mini'})} />
            <img src={item.photos[3]} alt="" className={ImageCollectionImage({size: 'mini'})} />
          </div>
          <h3 className="text-lg font-medium">{item.name}</h3>
        </div>
      ))}

    </div>
  )
}

export default ImageCollectionCardsContainer