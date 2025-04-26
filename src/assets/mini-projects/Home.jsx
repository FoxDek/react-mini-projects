import React from 'react'

function Home() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl motion-preset-wiggle motion-delay-500 motion-duration-1000 text-center">Welcome</h1>
      <p className="text-md motion-opacity-in-0 motion-delay-800">My name is Tema, and I am a web developer. This project was developed for learning React.</p>
    </div>
  )
}

export default Home