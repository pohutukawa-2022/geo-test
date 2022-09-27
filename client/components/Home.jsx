import React, { useEffect, useState } from 'react'
import Cords from './Cords'
import Message from './Message'
import Form from './Form'
import Nav from './Nav'
import Logo from './Logo'
import ReactLoading from 'react-loading'
import { getMessages } from '../api'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [radius, setRadius] = useState(0.05)
  const [done, setDone] = useState(false)

  function handleChange(event) {
    setRadius(event.target.value)
  }

  async function handleClick(e) {
    e.preventDefault()
    await navigator.geolocation.getCurrentPosition((position) => {
      loadMessages(position.coords)
    })
  }

  // it retrieves the current users locations, side effect function

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      loadMessages(position.coords)
    })

    // call the current number of the radius
  }, [])

  // calls the api function, passes through the coordinates then sets the states of the retrived messages
  async function loadMessages(crd) {
    const retrievedMessages = await getMessages({
      long: crd.longitude,
      lat: crd.latitude,
      r: radius,
    })

    setMessages(retrievedMessages)
  }

  // SetTimeout after things have loaded, Loader finishes at 2 seconds.

  // useEffect(() => {
  //   setTimeout(() => {
  //     setDone(true)
  //   }, 2500)
  // }, [])

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {!done ? (
        <div className="flex flex-col items-center h-screen justify-center drop-shadow-2xl">
          <section className="">
            <img src="images/12.png" alt="" />
          </section>
          <section>
            <ReactLoading
              type={'bubbles'}
              color={'gray'}
              height={200}
              width={100}
            />
          </section>
          <section className="text-gray-200">
            <p>Copyright © 2022 · GeoMessenger</p>
          </section>
        </div>
      ) : (
        <div className="w-screen\">
          <Cords />
          <Logo />
          <Message messages={messages} />
          <p className="mr-px flex justify-center ">Radius: {radius}</p>
          <div className="px-6">
            <div className="flex justify-center ">
              <input
                className=" h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                min="0.005"
                max="0.05"
                step="0.001"
                type="range"
                value={radius}
                onChange={handleChange}
              />
            </div>
            <div className=" w-full p-3 my-3 rounded-md border-2 drop-shadow-xl border-blue   text-center">
              <button className="text-center  " onClick={handleClick}>
                Search Area
              </button>
            </div>
          </div>
          <Form loadMessages={loadMessages} />
          <Nav />
        </div>
      )}
    </>
  )
}
