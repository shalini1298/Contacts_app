import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';

export class CreatePopup extends Component {
    render() {
        let {
            isOpen = true,
            toggle,
            handleChange,
            formafields,
            handleSubmit,
            validator,
        } = this.props;


        return (
            <>
                <Modal isOpen={isOpen} toggle={toggle} className='modal-dialog-centered' size="md">
                    <ModalBody className='p-3'>
                        <div className="">
                            <p className=" font-weight-bold text-center" style={{ paddingTop: '2rem' }}>Fill user details</p>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-4">
                                        <label>Contact Name</label>
                                    </div>
                                    <div className="col-8">
                                        <input className="mr-3 w-100"
                                            value={formafields.contactName}
                                            name="contactName"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8 ml-auto">
                                        {validator.message(
                                            'user name',
                                            formafields.contactName,
                                            'required|max:100'
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">

                                <div className="row">
                                    <div className="col-4">

                                        <label>Email</label>
                                    </div>
                                    <div className="col-8">

                                        <input className="mr-3 w-100"
                                            value={formafields.email}
                                            name="email"
                                            onChange={handleChange}
                                        />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8 ml-auto">
                                        {validator.message(
                                            'email id',
                                            formafields.email,
                                            'required|email'
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-4">
                                        <label>Company</label>
                                    </div>
                                    <div className="col-8">
                                        <input className="mr-3 w-100"
                                            value={formafields.company}
                                            name="company"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8 ml-auto">
                                        {validator.message(
                                            'company name',
                                            formafields.company,
                                            'required|max:100'
                                        )}
                                    </div>
                                </div>
                            </div>
                        
                            <div className="d-flex justify-content-center w-100">
                                <button className="btn btn-primary"
                                    onClick={() => handleSubmit()}
                                >Submit</button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal >
            </>
        );
    }
}

