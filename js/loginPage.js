import React from 'react';
import ReactDOM from 'react-dom';
import logo from './../img/logo.png';



class LoginPage extends React.Component{
  render() {
    return (

      <div class="row ">
        <div class="span6 col-lg-6 px-5 pt-4 mycontent-left">
          <img id ="logo"src={logo} alt="Logo"/>
          <h4>Sign into your account</h4>
          <form>
            <div class="form-row">
              <div class="col-lg-7">
                <input type="email" placeholder="Email" class="form-control my-3 p-3"/>
              </div>
            </div>
            <div class="form-row">
              <div class="col-lg-7">
                <input type="password" placeholder="*********" class="form-control my-6 p-3"/>
              </div>
            </div>
             <div class="form-row">
              <div class="col-lg-7">
                <button type="button" class="button btn w-100 mt-6 my-3"><span id="loginText">LOGIN</span></button>
              </div>
            </div>
            <a href="#">Forgot password</a>
            <p>Don't have an account? <a href="#">Register here</a></p>
          </form>
        </div>



        <div class="span6 col-lg-7 px-5 pt-4 mycontent-right">
          <img id ="logo"src={logo} alt="Logo"/>
          <h4>Sign into your account</h4>
          <form>
            <div class="form-row">
              <div class="col-lg-7">
                <input type="email" placeholder="Email" class="form-control my-3 p-3"/>
              </div>
            </div>
            <div class="form-row">
              <div class="col-lg-7">
                <input type="password" placeholder="*********" class="form-control my-6 p-3"/>
              </div>
            </div>
             <div class="form-row">
              <div class="col-lg-7">
                <button type="button" class="button btn w-100 mt-6 my-3"><span id="loginText">LOGIN</span></button>
              </div>
            </div>
            <a href="#">Forgot password</a>
            <p>Don't have an account? <a href="#">Register here</a></p>
          </form>
        </div>
      </div>
  

    );
  }
  
}



export default LoginPage;