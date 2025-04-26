import React from 'react'
import { createPortal } from 'react-dom'

function ModalWindow({children}) {
  return createPortal(
    <div>{children}</div>,
    document.getElementById('modal-root')
  )
}

export default ModalWindow