import PropTypes from "prop-types";

function Student({ name }) {
  return (
    <>
      <h1>Students List</h1>
      <h3>{name}</h3>
    </>
  );
}

Student.propTypes = {
  name: PropTypes.string,
};

export default Student;
