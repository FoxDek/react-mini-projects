import { cva } from "class-variance-authority";
import { NavLink } from "react-router-dom";
import { routes } from '../data'

const sidebar = cva(
  "sidebar fixed top-5 left-5 flex flex-col z-20 w-[210px] sm:w-[250px] h-[95vh] md:h-full bg-white ransition-transform duration-300 ease-in-out md:border-2 md:border-slate-400 rounded-2xl md:static shadow-[0_4px_0_rgba(0,0,0,0.2)]",
  {
    variants: {
      open: {
        true: "translate-x-0",
        false: "-translate-x-[calc(100%+20px)] md:translate-x-0",
      },
    },
  }
);

const sidebarTitle = cva(
  "text-center text-3xl font-bold p-4 text-slate-600"
)

const sidebarBackblur = cva(
  "sidebarBackblur absolute bg-black/50 inset-0 w-full h-full transition-opacity duration-300 ease-in-out backdrop-blur-md md:hidden z-10",
  {
    variants: {
      visible: {
        true: "opacity-100",
        false: "opacity-0 hidden",
      },
    },
  }
);

const sidebarNav = cva(
  "sidebarNav flex flex-col items-center gap-4 mt-8"
);

const sidebarNavLink = cva(
  "sidebarNavLink border border-gray-800 rounded-2xl py-2 px-5 text-slate-600 text-sm font-bold text-center cursor-pointer mx-[10px] transition-all duration-75 ease-in-out shadow-[0_4px_0_rgba(0,0,0,0.2)] hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      active: {
        true: "bg-slate-600 text-white",
        false: "bg-white",
      },
    },
  }
)

function Sidebar({ menuIsOpen }) {

  return (
    <>
      <div className={sidebar({ open: menuIsOpen })}>
        <h2 className={sidebarTitle()}>TRMP</h2>

        <nav className={sidebarNav()}>
        {routes
          .filter(route => route.path !== '*')
          .map(({ path, title }) => (
            <NavLink 
              key={path} 
              className={({ isActive }) => sidebarNavLink({ active: isActive })} 
              to={path}
            >
              {title}
            </NavLink>
          ))}

          {/* <NavLink className={({ isActive }) => sidebarNavLink({ active: isActive })} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => sidebarNavLink({ active: isActive })} to="/counter">Counter</NavLink>
          <NavLink className={({ isActive }) => sidebarNavLink({ active: isActive })} to="/modal-window">Modal</NavLink>
          <NavLink className={({ isActive }) => sidebarNavLink({ active: isActive })} to="/users-inviter">UsersInviter</NavLink> */}
        </nav>

      </div>
      <div className={sidebarBackblur({ visible: menuIsOpen })}></div>
    </>
  );
}

export default Sidebar;