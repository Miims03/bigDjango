import React from 'react'
import classNames from 'classnames';
// ${color}
function Flash({message , color}) {

  const flashClass = classNames(`border w-full h-12 rounded-lg flex justify-center items-center `,
  {
    [`bg-${color}-300/50`]: color,
    [`border-${color}-300`]: color,
    [`text-${color}-950`]: color,
  })

  return (
    <div className={flashClass}>
        <p>{message}</p>
    </div>
  )
}

export default Flash