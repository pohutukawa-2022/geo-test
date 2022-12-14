import React, { useEffect, useState } from 'react'

import { getMessages } from '../api'

export default function Message(props) {
  const [location, setLocation] = useState({
    lat: null,
    long: null,
  })

  const [loader, setLoader] = useState(true)
  const [button, setButton] = useState(true)

  function handleClick(e) {
    e.preventDefault()
    setButton(!button)
  }

  // const accuracyOptions = {
  //   enableHighAccuracy: true,
  //   timeout: 5000,
  //   maximumAge: 0,
  // }

  // useEffect(() => {
  //   setLoader(true)
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const crd = position.coords
  //     console.log(`Recorded latitude: ${crd.latitude}`)
  //     console.log(`Recorded longitude: ${crd.longitude}`)
  //     console.log(`More or less: ${crd.accuracy} meters`)
  //     setLocation({
  //       long: crd.longitude,
  //       lat: crd.latitude,
  //     })
  // }, [button])

  return (
    <>
      <div className="p-6 hover:drop-shadow-xl ">
        {loader ? (
          <div className="overflow-scroll max-h-60 h-64 text-lg p-6 rounded-md border-2 border-blue bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
            <ul>
              {props.messages.map((messages) => (
                <li
                  className="bg-green-400 my-3 p-2 text-white drop-shadow-xl rounded-lg"
                  key={messages.id}
                >{`${messages.name} says ${messages.msg}`}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Searching for messages...</p>
        )}
      </div>
    </>
  )
}
