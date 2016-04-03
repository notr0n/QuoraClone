var React = require('react');
var SessionStore = require('../stores/session_store');
var ApiUtil = require('../util/api_util');

var RightBar = require('./main/rightbar');
var NavBar = require('./main/navbar');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      currentUser: {name: ""}
    };
  },

  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);
    this.handleChange();
  },

  componentWillUnmount: function() {
    this.sessionStoreToken.remove();
  },

  render: function () {
    var button, welcomeMessage;

    if (this.state.currentUser) {
      button = <button onClick={ApiUtil.logout}>Logout</button>;
      welcomeMessage = <h2>Shmora welcomes you, {this.state.currentUser.username}</h2>;
    }

    return (
      <div>
        {button}
        {welcomeMessage}
				<NavBar />
				<div className="main group">
					<RightBar />
					{this.props.children}
				</div>
      </div>
    );
  },
	//
  handleChange: function() {
    if (SessionStore.isLoggedIn()) {
      this.setState({ currentUser: SessionStore.currentUser() });
    } else {
      this.context.router.push("/login");
    }
  }
});

module.exports = App;
