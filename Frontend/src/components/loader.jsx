import React from 'react'

const Loader = ({color}) => {
  return (
    <div className="p-2 border rounded-full animate-spin w-fit border-t-0 border-r-0 mx-auto" style={{color:color}}></div>
  )
}

export default Loader