import { cva } from 'class-variance-authority'
import React from 'react'

const loaderContent = cva(
  "loaderContent bg-white bg-opacity-70 flex flex-col gap-4 items-center justify-center my-auto"
)

const loaderSpinner = cva(
  "loaderSpinner w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"
)

const loaderText = cva(
  "loaderText text-gray-600 font-medium"
)

function Loader() {
  return (
    <div className={loaderContent()}>
      <div className={loaderSpinner()}></div>
      <p className={loaderText()}>Loading...</p>
    </div>
  )
}

export default Loader