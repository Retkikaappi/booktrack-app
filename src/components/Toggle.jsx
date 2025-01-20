import { forwardRef, useImperativeHandle, useState } from 'react'

const Toggle = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const display = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { display }
  })

  return (
    <>
      <div style={{ display: visible ? 'none' : '' }}>
        <button onClick={display}>{props.label}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <button onClick={display}>Cancel</button>
      </div>
    </>
  )
})

Toggle.displayName = 'Toggle'

export default Toggle
