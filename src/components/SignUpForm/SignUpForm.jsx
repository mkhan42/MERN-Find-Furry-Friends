import { Component } from "react";
import React from "react";
import { signUp } from "../../utilities/users-service.js";
import "./SignUpForm.css";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    userProfileImg: "",
    password: "",
    confirm: "",
    error: "",
  };

  // The object passed to setState is merged with the current state object
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // If an error occurred
      this.setState({ error: "Sign Up Failed - Try again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="my-sign-back-div">
        <div className="card my-sign-card mb-3">
          <div className="row g-0 my-sign-row">
            <div className="col-md-6 my-img-col" id="adding-opacity">
              <div className="my-auth-p">
              <h5 className="site-description">Lost a furry friend? Found a lost friend? <br/> <br/>Find-Furry-Friends is dedicated to helping pet owners reunite with their missing friends. <br/> <br/>Just Sign Up or Log in!</h5>
              </div>
            </div>
            <div className="col-md-6 my-sign-col">
          <div className="card-body my-sign-card-body">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="mb-3 my-sign-div">
              <h5 className="card-title my-sign-card-title">Sign Up</h5>
                <label htmlFor="exampleInputEmail1" className="form-label my-sign-label card-text" >
                  Name *
                </label>
                <input
                  className="form-control my-sign-input card-text"
                  id="exampleInputEmail1"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Ex: John Doe"
                  required
                />
              </div>
              <br></br>
              <div className="mb-3 my-sign-div">
                <label htmlFor="exampleInputEmail1" className="form-label my-sign-label card-text">
                  Email address *
                </label>
                <input
                  className="form-control my-sign-input card-text"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Ex: email@email.com"
                  required
                />
              </div>
              <br></br>
              <div className="mb-3 my-sign-div">
                <label htmlFor="exampleInputEmail1" className="form-label my-sign-label card-text">
                  Profile Image
                </label>
                <input
                  className="form-control my-sign-input card-text"
                  id="exampleInputEmail1"
                  type="text"
                  name="userProfileImg"
                  value={this.state.userProfileImg}
                  onChange={this.handleChange}
                />
              </div>
              <br></br>
              <div className="mb-3 my-sign-div">
                <label htmlFor="exampleInputPassword1" className="form-label my-sign-label card-text">
                  Password *
                </label>
                <input
                  className="form-control my-sign-input card-text"
                  id="exampleInputPassword1"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <br></br>
              <div className="mb-3 my-sign-div">
                <label htmlFor="exampleInputPassword1" className="form-label my-sign-label card-text">
                  Confirm *
                </label>
                <input
                  className="form-control my-sign-input card-text"
                  id="exampleInputPassword1"
                  type="password"
                  name="confirm"
                  value={this.state.confirm}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="my-btn-sign">
              <button
                type="submit"
                className="my-btn btn btn-primary"
                disabled={disable}
              >
                SIGN UP
              </button>
              </div>
            </form>
            <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
