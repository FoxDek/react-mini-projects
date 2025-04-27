// import { cva } from "class-variance-authority";
import Sidebar from "./assets/components/Sidebar";
import Demo from "./assets/components/Demo";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleBurgerClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <BrowserRouter>
      <div className='md:container mx-auto p-2 relative flex h-screen gap-5'>
        {/*motion-opacity-in-0 motion-translate-y-in-50 motion-duration-2000 */}
        <Sidebar menuIsOpen={menuIsOpen} />
        <Demo menuIsOpen={menuIsOpen} handleBurgerClick={handleBurgerClick} />
      </div>
    </BrowserRouter>
  );
}

export default App;
