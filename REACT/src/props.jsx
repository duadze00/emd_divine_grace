import { Component } from "react";

// * 1. REGULAR FUNCTION COMPONENT
// Props arrive as a single object parameter. Access attributes using `props.attributeName`.
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// * 2. ARROW FUNCTION COMPONENT + DESTRUCTURING
// Modern React developers destructure props directly in the parameter list for cleaner code and default fallbacks.
const UserCard = ({ username, role = "Member", age }) => {
  return (
    <div>
      <h3>User: {username}</h3>
      <p>Role: {role}</p>
      <p>Age: {age}</p>
    </div>
  );
};

// * 3. CLASS COMPONENT & METHODS
// In class components, props are accessed via `this.props`.
// Class methods access props through `this.props` or receive data passed down as props.
class ProfileClass extends Component {
  // Method utilizing component props
  getGreeting() {
    return `Welcome back, ${this.props.user.name}`;
  }

  render() {
    return (
      <div>
        <h2>{this.getGreeting()}</h2>
        <p>Account Type: {this.props.user.tier}</p>
      </div>
    );
  }
}

// * 4. CLASS INHERITANCE (Super Constructor)
// When overriding `constructor` in a class component, you MUST pass `props` to `super(props)`
// so that `this.props` is correctly bound inside the constructor.
class CustomButton extends Component {
  constructor(props) {
    super(props); // Initializes React.Component with props
    this.state = {
      clickedCount: 0,
    };
  }

  handleClick = () => {
    this.setState((prev) => ({ clickedCount: prev.clickedCount + 1 }));
    // Invoking a callback method passed via props from a parent component
    if (this.props.onClickHandler) {
      this.props.onClickHandler();
    }
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.props.label} (Clicked {this.state.clickedCount} times)
      </button>
    );
  }
}

// * 5. THE SPECIAL "CHILDREN" PROP
// Anything placed inside the opening and closing JSX tags of a component is passed automatically as `props.children`.
const Container = ({ children, title }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px" }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

// * 6. PARENT COMPONENT PASSING DATA & FUNCTIONS DOWN
// Props allow top-down (unidirectional) data flow. Parents can pass primitives, objects, arrays, and functions down to children.
function App() {
  const handleAlert = () => {
    alert("Action triggered from child component!");
  };

  const userData = { name: "Alex", tier: "Premium" };

  return (
    <div>
      {/* Passing simple string prop */}
      <Welcome name="Sarah" />

      {/* Passing multiple props with default fallback for 'role' */}
      <UserCard username="dev_johndoe" age={26} />

      {/* Passing object to Class component */}
      <ProfileClass user={userData} />

      {/* Passing a function as a prop (Callback pattern) */}
      <CustomButton label="Click Me" onClickHandler={handleAlert} />

      {/* Using props.children to wrap nested elements */}
      <Container title="Dashboard Section">
        <p>This paragraph is passed as props.children!</p>
      </Container>
    </div>
  );
}
