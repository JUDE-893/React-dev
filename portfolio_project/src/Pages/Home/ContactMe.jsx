import {PureComponent,memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';


export default class ContactMe extends PureComponent {


  // shouldComponentUpdate(nextProps, nextState) {
  //   // Add your comparison logic here
  //   return true; // or false based on your condition
  // }

  state = {
    data : {
      firstName:'',
      lastName:'',
      email:'',
      phoneNumber:'',
      topic:'',
      message:'',
      agree : ''},

    errors : {
      firstName:'',
      lastName:'',
      email:'',
      phoneNumber:'',
      topic:'',
      message:'',
      agree : ''},
  }

  validateField = (fldName, value) => {
    const nameRe = /^[A-z]{3,}/;
    switch (fldName) {
      case 'firstName':
        if (value.length == 0) return 'first name is required!';
        if (!nameRe.test(value)) return 'Invalid Value For The First Name!';
        break;
      case 'lastName' :
        if (value.length == 0) return 'last name is required!';
        if (!nameRe.test(value)) return 'Invalid Value For The Last Name!';
        break;
      case 'email' :
        const emailRe =  /^[^\s@#]{4,}@[^\s@#]+\.[^\s@#]+/;
        if (value.length == 0) return 'email address is required!';
        if (!emailRe.test(value)) return 'Invalid Email Address!';
        break;
      case 'phoneNumber' :
        const telRe =  /^\d{3,}/;
        if (value.length == 0) return 'Phone Number is required!';
        if (!telRe.test(value)) return 'Invalid Phone Number!';
        break;
      case 'topic' :
        if (value.length == 0) return 'Message Topic is required!';
        break;
      case 'message' :
        if (value.length == 0) return 'Message Field is required!';
        break;
      case 'agree' :
        if (!value) return 'Term Agreement is required!';
        break;
    }
  }


  handleInput = (e) => {
    const { type : t,name: name } = e.target,
    val = (t === "checkbox" ? e.target.checked : e.target.value);

    this.setState( (prevState) => ({
      data : {...prevState.data, [name] : val},
      errors : {...prevState.errors, [name] : this.validateField(name,val)},

    }) )
  }

  catchErrors = (field,PD,PH) => {
    let pd=false, val = "",ph;
    if(!PD) {
      val = this.state.errors[field];
      pd = true;
    }
    else if (!PH) {
       pd = true
     }
    ph = this.state.errors[field] ?? "" === "" ? true : false ;
    return [
     <p className='errorsMessage'>{val}</p>,
     pd,ph
   ]
  }

  onSubmit = function() {
    let data = this.state.data;

    for (let key in data) {
      if (data[key] === "" || data[key] === false) {
        return false;
      }
    }
    return true
  }

  filterErrors = function(obj) {
    for (let key in obj) {
      if (typeof(obj[key]) === "string" && obj[key] !== undefined && obj[key] !== "" ) {
        return {[key] : obj[key]}
      }
    }
    return {}
  }

  render() {

    console.log("ContactMe");
    var filErrors = this.filterErrors(this.state.errors);
    return (
      <div className="contact-section" id="Contact">

        <p className="Section-title">Get In Touch</p>
        <p className="Section-big-title">Contact Me</p>
        <p className="small-para">Lorem ipsum dolor sit amet, consectetur adipisicing elit!</p>

        <div className="">

          <div className="inp-container">

            <div className="entry-box inp-box">
              <label >First name</label>
              <input type="text" name="firstName" value={this.state.data.firstName} onChange={this.handleInput} />
              <p className='errorsMessage'>{filErrors.firstName ?? ""}</p>
            </div>

            <div className="entry-box inp-box">
              <label >Last name</label>
              <input type="text" name="lastName" value={this.state.data.lastName} onChange={this.handleInput} />
              <p className='errorsMessage'>{filErrors.lastName ?? ""}</p>
            </div>

            <div className="entry-box inp-box">
              <label >Email</label>
              <input type="email" name="email" value={this.state.data.email} onChange={this.handleInput} />
              <p className='errorsMessage'>{filErrors.email ?? ""}</p>
            </div>

            <div className="entry-box inp-box">
              <label >Phone Number</label>
              <input type="tel" name="phoneNumber" value={this.state.data.phoneNumber} onChange={this.handleInput} />
              <p className='errorsMessage'>{filErrors.phoneNumber ?? ""}</p>
            </div>

            <div className="entry-box">
              <label >Choose a topic</label>
              <select className="" name="topic" value={this.state.data.topic} onChange={this.handleInput}>
                <option value="" disabled defaultValue>  ---Topic</option>
                <option value="Job Interview">Job Interview</option>
                <option value="Internship">Internship</option>
                <option value="Freelance Partnership">Freelance Partnership</option>
                <option value="Business PartnerShip">Business PartnerShip</option>
                <option value="Other..">Other..</option>
              </select>
              <p className='errorsMessage'>{filErrors.topic ?? ""}</p>
            </div>

            <div className="entry-box message-inp">
              <label >Message</label>
              <textarea type="text" name="message" value="" style={{height:500}} value={this.state.data.message} onChange={this.handleInput}/>
              <p className='errorsMessage'>{filErrors.message ?? ""}</p>
            </div>

            <div className="entry-box check-inp">
              <input type="checkbox" name="agree" value={this.state.data.agree} onChange={this.handleInput} />
              <label > I accept The Term</label>
              <p className='errorsMessage'>{filErrors.agree ?? ""}</p>
            </div>
          </div>
          <button  className='btn btn-primary' type="submit" name="button" disabled={!this.onSubmit()}>Submit</button>
        </div></div>
    )}

}
