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
        <div className="card my-sign-card">
          <div className="card-body my-sign-card-body">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="mb-3 my-sign-div">
                <label htmlFor="exampleInputEmail1" className="form-label my-sign-label" >
                  Name
                </label>
                <input
                  className="form-control my-sign-input"
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
                <label htmlFor="exampleInputEmail1" className="form-label my-sign-label">
                  Email address
                </label>
                <input
                  className="form-control my-sign-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <br></br>
              <div className="mb-3 my-sign-div">
                <label htmlFor="exampleInputEmail1" className="form-label my-sign-label">
                  Profile Image
                </label>
                <input
                  className="form-control my-sign-input"
                  id="exampleInputEmail1"
                  type="text"
                  name="userProfileImg"
                  value={this.state.userProfileImg}
                  onChange={this.handleChange}
                />
              </div>
              <br></br>
              <div className="mb-3 my-sign-div">
                <label htmlFor="exampleInputPassword1" className="form-label my-sign-label">
                  Password
                </label>
                <input
                  className="form-control my-sign-input"
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
                <label htmlFor="exampleInputPassword1" className="form-label my-sign-label">
                  Confirm
                </label>
                <input
                  className="form-control my-sign-input"
                  id="exampleInputPassword1"
                  type="password"
                  name="confirm"
                  value={this.state.confirm}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={disable}
              >
                SIGN UP
              </button>
            </form>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        </div>
      </div>
    );
  }
}
