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

export default ProfileClass;
