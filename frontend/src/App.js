import React from "react";
import Routes from "./Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Social from "./components/Social/Social"
const axios = require('axios')

class App extends React.Component {
  state = {
    allQuotes: null,
    authentication: false
  };

  componentDidMount = async () => {
    try {
      const token = localStorage.getItem("token");
      const authentication = await axios.get(
        `http://localhost:5000/user/current-user`,
        { headers: { token: token } }
      );
      this.setState({
        authentication: true,
        currentUser: authentication.data
      });
    } catch (err) {
      this.setState({
        authentication: false
      });
    }
  };

  // WE DECIDED NOT TO IMPLEMENT SIGN UP FUNCTIONALITY BASED ON THE CLIENT REQUEST
  // register = async userInfo => {
  //   const url = process.env.REACT_APP_API_URL;
  //   try {
  //     const response = await axios.post(`${url}/auth/register`, userInfo);
  //     const token = response.data.token;
  //     localStorage.setItem("token", token);
  //     this.setState({
  //       authentication: true
  //     });
  //   } catch (err) {
  //     this.setState({
  //       authentication: false,
  //       errorMessage: `Error => ${err.message}`
  //     });
  //   }
  // };

  createNewQuote = async quoteInfo => {
    const url = "http://localhost:5000";
    try {
      const data = await axios.post(`${url}/quote/newQuote`, quoteInfo);
      if (data) {
        return 'data posted'
      }
    } catch (err) {
      this.setState({
        errorMessage: 'Please fill in all the fields!'
      });
    }
  };

  login = async userCredentials => {
    const url = "http://localhost:5000";
    try {
      const response = await axios.post(`${url}/auth/login`, userCredentials);
      const token = response.data.token;
      localStorage.setItem("token", token);
      this.setState({
        authentication: true
      });
    } catch (err) {
      this.setState({
        authentication: false,
        errorMessage: 'Your credentials is invalid. Please try again.'
      });
    }
  };
  logout = () => {
    localStorage.removeItem("token")
    this.setState({
      authentication: false
    })
  }

  render() {
    const { authentication, errorMessage } = this.state;
    return (
      <div>
        <Navbar 
          authentication={authentication} 
          logout={this.logout} 
        />
        <Social />
        <Routes 
          authentication={authentication} 
          // WE DECIDED NOT TO IMPLEMENT SIGN UP FUNCTIONALITY BASED ON THE CLIENT REQUEST
          // register={this.register} 
          login={this.login} 
          errorMessage={errorMessage}
          createNewQuote={this.createNewQuote}
        />
        <Footer />
      </div>
    )
  }
}

export default App;
