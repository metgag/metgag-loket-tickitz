function AuthInput({ type, labelContent, id }) {
  return (
    <>
      <label htmlFor={id}>{labelContent}</label>
      <input type={type} id={id} />
    </>
  )
}

export default AuthInput