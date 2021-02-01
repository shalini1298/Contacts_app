import React, { Component } from 'react';
import { addUserData } from "./actionFile"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CreatePopup } from "./CreatePopup"
import SimpleReactValidator from 'simple-react-validator';
import "./App.css"
export class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      userList: [
        { userName: 'xyz', mailId: 's@gmail.com', companyName: 'sample' },
        { userName: 'xyz', mailId: 's@gmail.com', companyName: 'sample' }
      ],
      searchValue: '',
      formafields: {
        contactName: '',
        email: '',
        company: '',
      },
      viewDetails: {
        contactName: '',
        email: '',
        company: '',
      },
      isCreatePopup: false,
      isEditIndex: null,
      isView: false
    }
  }

  componentWillMount() {
    this.validator = new SimpleReactValidator({
      element: (message) => (
        <span className='error-message text-danger fs-14'>{message}</span>
      ),
      autoForceUpdate: this,
    });
  }
  componentDidMount = () => {
    this.setState({ userList: this.props.contacts })
  }

  handleChange({ target: { name, value } }) {
    let { formafields } = this.state
    formafields[name] = value
    this.setState({
      formafields
    }, () => {
      console.log(this.state.formafields, "formafields")
    })
  }

  handleInput = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }

  handleSubmit = (editedIndex) => {
    if (this.validator.allValid()) {
      let { formafields, userList, isEditIndex } = this.state
      if (isEditIndex !== null) {
        let body = {
          userName: formafields.contactName,
          emailId: formafields.email,
          companyName: formafields.company,
        }
        userList[isEditIndex] = body
        this.setState({ userList }, () => {
          this.props.addUserData(userList)
          this.validator.hideMessages()
          this.toggle('isCreatePopup')
          this.setState({
            formafields: {
              contactName: '',
              email: '',
              company: ''
            },
            isEditIndex: null
          })
        })
      } else {

        let body = {
          userName: formafields.contactName,
          emailId: formafields.email,
          companyName: formafields.company,

        }
        userList.push(body)
        this.setState({ userList }, () => {
          this.validator.hideMessages()
          this.props.addUserData(userList)
          this.toggle('isCreatePopup')
          this.setState({
            formafields: {
              contactName: '',
              email: '',
              company: '',
            }
          })
        })
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  toggle = (name) => {
    this.setState((prevState) => ({
      [name]: !prevState[name]
    }));
  };

  handleDelete = (index) => {
    let { userList } = this.state
    userList.splice(index, 1)
    this.setState({ userList })
  }
  handleView = (index) => {
    let { userList } = this.state
    this.setState({
      viewDetails: {
        contactName: userList[index].userName,
        email: userList[index].emailId,
        company: userList[index].companyName,
      },
      isView: true
    })
  }

  handleEdit = (index) => {
    let { userList } = this.state
    this.setState({
      formafields: {
        contactName: userList[index].userName,
        email: userList[index].emailId,
        company: userList[index].companyName,
      },
      isEditIndex: index
    }, () => {
      this.toggle('isCreatePopup')
    })
  }

  render() {
    let { searchValue, userList, isCreatePopup, formafields, isEditIndex, isView, viewDetails } = this.state
    return (
      <div className="container">
        <h2 className="mt-5 mb-3 ml-4" style={{ color: 'grey' }}>Contacts</h2>
        <div className="col-md-12">
          <div className="row">
            <div className=" col-md-6 col-12" >
              <div className="row mb-4">
                <div className="col-md-8 col-12 d-flex align-items-center">
                  <input type="text" placeholder="  Search contacts" aria-label="Search"
                    onChange={this.handleInput}
                    className="mr-3 w-100"
                    style={{ backgroundColor: '#edebec', borderRadius: '25px', border: '1px solid transparent' }}
                  />
                </div>
                <div className="col-md-4 col-8 mt-md-0 mt-3 mx-auto">
                  <button className="btn btn-primary w-100" style={{ backgroundColor: "#ff8172", borderColor: "#ff8172" }} onClick={() => this.toggle('isCreatePopup')} > <i class="fa fa-plus" aria-hidden="true"></i> Add contact</button>
                </div>
              </div>

              {userList && userList.length !== 0 ?
                <table className="table " >
                  <thead>
                    <tr>
                      <th scope="col"style={{ color: 'grey' }}>Basic Info</th>
                      <th scope="col"style={{ color: 'grey' }}>Company Name</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList && userList.filter((data) => {
                      if (searchValue === "") {
                        return data;
                      } else if (data.userName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                      ) {
                        return data;
                      }
                    }).map((list, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className='d-flex align-items-center justify-content-center letter-area mr-2'>
                              <p className="letter mb-0">{list.userName.charAt(0)}</p>

                            </div>
                            {list.userName}
                          </div>
                        </td>
                        <td className="d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            {list.companyName}
                          </div>
                        </td>
                        <td className="">
                          <div className="d-flex align-items-center">
                            <span className="pr-3 cursor-pointer"
                              onClick={() => this.handleDelete(index)}><i class="fa fa-trash" aria-hidden="true"></i>
                            </span>
                            <span className="pr-3 cursor-pointer"
                              onClick={() => this.handleEdit(index)}><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            </span>
                            <span className="pr-3 cursor-pointer"
                              onClick={() => this.handleView(index)}><i class="fa fa-eye" aria-hidden="true"></i>
                            </span>
                          </div>


                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                :
                <div className="text-center">
                  No data found
               </div>
              }
            </div>

            <div className="col-md-6 col-12 w-100" >
              {isView ?
                <div class="card p-md-3 p-1" style={{backgroundColor:'#edebec'}} >
                  <div class="card-body">
                    <div className="row mb-4">
                      <div className="col-md-6 col-8 mx-auto">
                        <div className='d-flex align-items-center justify-content-center pick-letter-card-area mr-2'>
                          <p className="pick-letter-card mb-0">{viewDetails.contactName.charAt(0)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-12 mx-auto">
                        <h5 class="card-title text-center">{viewDetails.contactName}</h5>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-4 col-12">
                        <p className="font-weight-bold" style={{ color: 'grey' }}>User name :</p>
                      </div>
                      <div className="col-md-8 col-12">
                        <p>{viewDetails.contactName}</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-4 col-12">
                        <p className="font-weight-bold"style={{ color: 'grey' }}>Email :</p>
                      </div>
                      <div className="col-md-8 col-12">
                        <p>{viewDetails.email}</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-4 col-12">
                        <p className="font-weight-bold"style={{ color: 'grey' }}>Company name :</p>
                      </div>
                      <div className="col-md-8 col-12">
                        <p>{viewDetails.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
                : null}
            </div>
          </div>
        </div>
        <CreatePopup
          isOpen={isCreatePopup}
          validator={this.validator}
          toggle={() => this.toggle('isCreatePopup')}
          handleChange={this.handleChange}
          formafields={formafields}
          handleSubmit={() => this.handleSubmit()}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    contacts: state.createContact.personList
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addUserData
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);