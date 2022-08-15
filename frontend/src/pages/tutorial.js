import React, { Component, useState, useEffect } from 'react';
import { Col, Row, Navbar, Button, Image, ButtonGroup } from 'react-bootstrap';
import '../App.css';

// uncomment if running on local backend
const backend_path_prefix = '.'

class Tutorial extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    onUnload(e) {

    }

    on_experiment_click(e) {
        var pageType = {
            pathname: '/experiment',
            state: {
                data: {
                    'session_id': this.state.session_id,
                }
            }
        }
        console.log(pageType)
        this.props.history.push(pageType)
    }

    componentDidMount() {

        fetch('./new_session_id', {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                start_time: 'TODO'
            })
        })
            .then(res => res.json()).then(data => {
                console.log(data.new_id)
                this.setState({
                    session_id: data.new_id
                })
            })

    }

    componentWillUnmount() {
        //window.removeEventListener("beforeunload", this.onUnload);
    }

    render() {

        if (this.props.location.state == null) {
            return (<p>Unknown session. Please start from the <a href={'#/'}> consent page</a></p>)
        }

        return (
            <>
                <Row className={'justify-content-center tutorial-body'}>
                    <Col lg={6} className={'text-box text-justify'}>

                        <p className='head_1'>This test measures your ability to read different visualizations.</p>
                        <ul>
                            <li className='int_1'>There will be total 53 different questions.</li>

                            <li className='int_1'>You will get +1 point for every correct answer and there is no negative point for an incorrect response.</li>
                            <li className='int_1'>For a better exprience, use your desktop/laptop/Mac to attempt this quiz.</li>
                            <li className='int_1'>Participants with color blindness may have difficulty taking this quiz.  </li>
                            <li className='int_1'>You will be given 25 seconds for every question. There will be a timer on the top right corner of the screen. Once you run out of the time, please select 'Skip' to proceed to the next question.</li>
                            {/* <li>We will store information about your mouse interaction (e.g. what you clicked) when answering the survey questions.</li> */}

                        </ul>

                        <div className={'text-center'}>
                            <Button onClick={this.on_experiment_click.bind(this)}
                                className={'btn-sm'} variant={"success"}>
                                Start the experiment.
                            </Button>
                        </div>


                        <p className={'text-box'}></p>

                    </Col>

                </Row>
            </>
        );
    }
}

export default Tutorial;
