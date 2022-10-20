import React, { Component} from 'react';
import { Col, Row, Button} from 'react-bootstrap';
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

                        <p className='head_1'>This test aims at understanding how visualization designs regulate the perception of trust.</p>
                        <ul>
                            <li className='int_1'>There will be total of 30 different images. For every image, you will be given 11 statements.</li>
                            <li className='int_1'>For each statement, you will be asked to rate your level of agreement with each statement.</li>
                            <li className='int_1'>You will have the option of zooming in and out of the images using both pinch in and out gestures on the mousepad. You can also use mouse scroll for zooming in and out.</li>
                            <li className='int_1'>For a better exprience, use your desktop/laptop/Mac to attempt this quiz.</li>
                            <li className='int_1'>Participants with color blindness may have difficulty taking this quiz.  </li>
                            <li className='int_1'>There will be no time limit for each question.</li>
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
