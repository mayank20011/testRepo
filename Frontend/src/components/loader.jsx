import React from 'react'

const loader = ({color}) => {
  return (
    <div className="p-2 border rounded-full animate-spin" style={{color:color}}>loader</div>
  )
}

export default loader