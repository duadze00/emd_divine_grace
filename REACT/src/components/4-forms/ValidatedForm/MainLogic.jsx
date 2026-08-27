import { useState } from "react";

import Form from "./component/Form";

const initialUser = {
  userName: "",
  userEmail: "",
  userPassword: "",
  userConfirmPassword: "",
};

const MainLogic = () => {
  const [user, setUser] = useState(initialUser);

  const [users, setUsers] = useState(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
      console.error("Could not read users from localStorage:", error);
      return [];
    }
  });

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");

  // ----------------------------------------
  // HANDLE INPUT CHANGES
  // ----------------------------------------

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Remove the error for this field
    // when the user starts correcting it.
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // Remove success message when user edits again.
    setSuccessMessage("");
  };

  // ----------------------------------------
  // VALIDATE FORM
  // ----------------------------------------

  const validateForm = () => {
    const newErrors = {};

    // ----------------------------------------
    // CLEAN VALUES
    // ----------------------------------------

    const name = user.userName.trim();
    const email = user.userEmail.trim().toLowerCase();
    const password = user.userPassword;
    const confirmPassword = user.userConfirmPassword;

    // ----------------------------------------
    // NAME VALIDATION
    // ----------------------------------------

    if (!name) {
      newErrors.userName = "Name is required.";
    } else if (name.length < 2) {
      newErrors.userName = "Name must be at least 2 characters.";
    } else if (name.length > 50) {
      newErrors.userName = "Name must not exceed 50 characters.";
    } else if (!/^[A-Za-z\s'-]+$/.test(name)) {
      newErrors.userName =
        "Name can only contain letters, spaces, apostrophes and hyphens.";
    }

    // ----------------------------------------
    // EMAIL VALIDATION
    // ----------------------------------------

    if (!email) {
      newErrors.userEmail = "Email is required.";
    } else if (email.length > 254) {
      newErrors.userEmail = "Email is too long.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.userEmail = "Please enter a valid email address.";
    }

    // ----------------------------------------
    // DUPLICATE EMAIL
    // ----------------------------------------

    const emailExists = users.some(
      (existingUser) => existingUser.userEmail?.trim().toLowerCase() === email,
    );

    if (email && emailExists) {
      newErrors.userEmail = "An account with this email already exists.";
    }

    // ----------------------------------------
    // PASSWORD VALIDATION
    // ----------------------------------------

    if (!password) {
      newErrors.userPassword = "Password is required.";
    } else if (password.length < 8) {
      newErrors.userPassword = "Password must be at least 8 characters.";
    } else if (password.length > 128) {
      newErrors.userPassword = "Password must not exceed 128 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.userPassword =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      newErrors.userPassword =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.userPassword = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=;'`~]/.test(password)) {
      newErrors.userPassword =
        "Password must contain at least one special character.";
    }

    // ----------------------------------------
    // CONFIRM PASSWORD VALIDATION
    // ----------------------------------------

    if (!confirmPassword) {
      newErrors.userConfirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.userConfirmPassword = "Passwords do not match.";
    }

    // ----------------------------------------
    // SAVE ERRORS
    // ----------------------------------------

    setErrors(newErrors);

    // true = no errors
    // false = errors exist

    return Object.keys(newErrors).length === 0;
  };

  // ----------------------------------------
  // SUBMIT FORM
  // ----------------------------------------

  const submitHandler = (e) => {
    e.preventDefault();

    setSuccessMessage("");

    // Run all validation.
    const isValid = validateForm();

    // Stop here if validation fails.
    if (!isValid) {
      return;
    }

    // ----------------------------------------
    // NORMALIZE DATA BEFORE SAVING
    // ----------------------------------------

    const newUser = {
      userName: user.userName.trim(),
      userEmail: user.userEmail.trim().toLowerCase(),
      userPassword: user.userPassword,
      userConfirmPassword: user.userConfirmPassword,
    };

    // ----------------------------------------
    // ADD USER
    // ----------------------------------------

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    // ----------------------------------------
    // SAVE TO LOCAL STORAGE
    // ----------------------------------------

    try {
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Could not save users to localStorage:", error);

      setErrors({
        form: "Could not save your account. Please try again.",
      });

      return;
    }

    // ----------------------------------------
    // RESET FORM
    // ----------------------------------------

    setUser(initialUser);
    setErrors({});
    setSuccessMessage("Account created successfully!");
  };

  return (
    <>
      <Form
        user={user}
        errors={errors}
        successMessage={successMessage}
        onChangeHandler={onChangeHandler}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default MainLogic;
