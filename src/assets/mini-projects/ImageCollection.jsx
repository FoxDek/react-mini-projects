import { cva } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import ImageCollectionSettings from "../components/ImageCollectionSettings";
import ImageCollectionCardsContainer from "../components/ImageCollectionCardsContainer";
import Loader from '../components/Loader'

const ImageCollectionContent = cva("ImageCollectionContent flex flex-col w-full h-full gap-10 overflow-auto p-1 pt-5 lg:p-10 justify-between");

const ImageCollectionTitle = cva("ImageCollectionTitle text-3xl pb-10 font-bold");

const ImageCollectionPagination = cva(
  "ImageCollectionPagination flex gap-3 justify-center lg:justify-start"
)

const ImageCollectionPaginationItem = cva(
  "ImageCollectionPaginationItem py-1 px-3 border border-gray-300 rounded-xl transition-all duration-300 ease-in-out cursor-pointer",
  {
    variants: {
      active: {
        true: 'bg-gray-700 text-white',
        false: 'bg-white hover:bg-gray-200'
      }
    }
  }
)


function ImageCollection() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setIsLoading(true);

    const category = activeCategory ? `category=${activeCategory}` : '';

    fetch(`https://680e4ea7c47cb8074d92b493.mockapi.io/photos-collection?page=${activePage}&limit=3&${category}`)
      .then((response) => response.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((error) => {
        console.log(error);
        alert("Some problems with fetch images");
      })
      .finally(() => setIsLoading(false));
  }, [activeCategory, activePage]);

  return (
    <>
      <div className={ImageCollectionContent()}>
        <div className="w-full">
          <h2 className={ImageCollectionTitle()}>Image Collection 📷</h2>
          <ImageCollectionSettings activeCategory={activeCategory} setActiveCategory={setActiveCategory} isLoading={isLoading} searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>

        { isLoading ? <Loader spinnerColor='border-blue-300'/> : <ImageCollectionCardsContainer items={collections} searchValue={searchValue} />}

        <ul className={ImageCollectionPagination()}>
          {
            [...Array(5)].map((_, index) => <li onClick={() => setActivePage(index + 1)} className={ImageCollectionPaginationItem({ active: activePage === index + 1 })} key={index}>{index + 1}</li>)
          }
        </ul>

      </div>
    </>
  );
}

export default ImageCollection;

// {
//   [...Array(5)].map((_, index) => <li key={index}> {index + 1}</li>);
// }
