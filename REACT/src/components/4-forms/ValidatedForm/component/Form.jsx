const Form = ({
  user,
  errors,
  successMessage,
  onChangeHandler,
  submitHandler,
}) => {
  return (
    <>
      <h1>Register Here</h1>

      <form onSubmit={submitHandler} noValidate>
        {/* NAME */}
        <div>
          <label htmlFor="userName">Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Lucas Graham"
            value={user.userName}
            onChange={onChangeHandler}
            autoComplete="name"
            aria-invalid={!!errors.userName}
            aria-describedby={errors.userName ? "userName-error" : undefined}
          />

          {errors.userName && <p id="userName-error">{errors.userName}</p>}
        </div>

        {/* EMAIL */}
        <div>
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            placeholder="example@gmail.com"
            value={user.userEmail}
            onChange={onChangeHandler}
            autoComplete="email"
            aria-invalid={!!errors.userEmail}
            aria-describedby={errors.userEmail ? "userEmail-error" : undefined}
          />

          {errors.userEmail && <p id="userEmail-error">{errors.userEmail}</p>}
        </div>

        {/* PASSWORD */}
        <div>
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder="Enter password"
            value={user.userPassword}
            onChange={onChangeHandler}
            autoComplete="new-password"
            aria-invalid={!!errors.userPassword}
            aria-describedby={
              errors.userPassword ? "userPassword-error" : undefined
            }
          />

          {errors.userPassword && (
            <p id="userPassword-error">{errors.userPassword}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label htmlFor="userConfirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="userConfirmPassword"
            name="userConfirmPassword"
            placeholder="Confirm password"
            value={user.userConfirmPassword}
            onChange={onChangeHandler}
            autoComplete="new-password"
            aria-invalid={!!errors.userConfirmPassword}
            aria-describedby={
              errors.userConfirmPassword
                ? "userConfirmPassword-error"
                : undefined
            }
          />

          {errors.userConfirmPassword && (
            <p id="userConfirmPassword-error">{errors.userConfirmPassword}</p>
          )}
        </div>

        <button type="submit">Create Account</button>

        {successMessage && <p>{successMessage}</p>}
      </form>
    </>
  );
};

export default Form;
