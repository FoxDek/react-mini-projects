import { cva } from 'class-variance-authority'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { routes } from '../data'

const demoContainer = cva(
  'demoContainer w-full'
)

const burger = cva(
  'burger absolute flex flex-col gap-1 items-center cursor-pointer z-20 p-2 rounded-xl  opacity-70 right-7 top-7 md:hidden', {
    variants: {
      menuIsOpen: {
        true: 'bg-slate-600 shadow-[0_4px_0_rgba(0,0,0,0.2)]',
        false: 'bg-white shadow-[0_4px_0_rgba(0,0,0,0.3)]',
      }
    }
  }
)

const burgerLine = cva(
  'burgerLine w-8 h-1 bg-slate-600 rounded-2xl', {
    variants: {
      menuIsOpen: {
        true: 'bg-white',
        false: '',
      }
    }
  }
)

const demoContent = cva(
  "demoContent flex h-full w-full items-center justify-center border-2 border-slate-400 rounded-2xl p-5 shadow-[0_4px_0_rgba(0,0,0,0.2)] motion-opacity-in-0 motion-translate-y-in-50",
)





function Demo({ menuIsOpen, handleBurgerClick }) {

  const { pathname } = useLocation();
  // const title = routes.find((route) => route.path === pathname)?.title;
  const routeConfig = routes.find(route => route.path === pathname) || {};


  React.useEffect(() => {
    if (menuIsOpen) {
      handleBurgerClick();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  return (
    <div className={demoContainer()}>

      <button onClick={handleBurgerClick} className={burger({ menuIsOpen: menuIsOpen })}>
        <div className={burgerLine({ menuIsOpen: menuIsOpen })}></div>
        <div className={burgerLine({ menuIsOpen: menuIsOpen })}></div>
        <div className={burgerLine({ menuIsOpen: menuIsOpen })}></div>
      </button>

      <div className={demoContent({
        className: `${routeConfig.bgColor}`
      })} key={pathname}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

        </Routes>
      </div>

    </div>
  )
}

export default Demo