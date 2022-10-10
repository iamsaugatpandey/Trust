import React, { Component, useLayoutEffect, useState, useEffect, FunctionComponent } from 'react';
import { Container, Col, Row, Navbar, Button, ButtonGroup, ToggleButton, Form, InputGroup } from 'react-bootstrap';
import '../App.css';
import ProgressBar from "@ramonak/react-progress-bar";
import Countdown from 'react-countdown';
import Likert from 'react-likert-scale';
import $ from 'jquery';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";



var score_1 = 0
var num = 30


class VisQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response_likert: [
                { value: 1, text: "Strongly Disagree", checked: false },
                { value: 2, text: "Disagree", checked: false },
                { value: 3, text: "Neither Agree nor Disagree", checked: false },
                { value: 4, text: "Agree", checked: false },
                { value: 5, text: "Strongly Agree", checked: false }
            ]
        }
    }

    componentDidMount() {
        this.setState({
            session_id: this.props.location.state.data.session_id,
            current_visualization_index: 0,
            score: 0,
            responses: {},
            resize_bool: true,
            device_info: '',
            form_incomplete: false,
            demographic_questions: {
                'sex': null,
                'age': null,
                'education': null
            },
            demographics_incomplete: true,
            comment: '',
            width: 0,
            height: 0,
            image_list: null,

        }
        )


        this.get_image_list();
        //console.log(this.image_list)
        window.addEventListener('resize', this.handleWindowResize.bind(this))
    }

    handleWindowResize(e) {
        this.setState({
            resize_bool: !this.state.resize_bool
        })
    }
    handleTextChange(e) {
        this.setState({ comment: e.target.value })
    }

    handleDemographicChange(e) {
        console.log(this.state)
        var new_dq = this.state.demographic_questions
        new_dq[e.target.id] = e.target.value

        var incomplete = false
        for (var key in new_dq) {
            if (new_dq[key] == null) {
                incomplete = true
            }
        }
        if (e.value == 'oth') {
            alert('Hello')
        }

        this.setState({ demographic_questions: new_dq, demographics_incomplete: incomplete })
    }


    // clicked_answer(type, question, response, truth, time, cfig, wfig) {
    //     if (response === visualizations[this.state.current_visualization_index]['options'][truth]) {
    //         this.state.score = this.state.score + 1
    //         correct_collect.push(cfig)

    //     }
    //     else {
    //         wrong_collect.push(wfig)
    //     }

    //     this.setState({
    //         current_visualization_index: this.state.current_visualization_index + 1,
    //     })
    //     endTime = Math.abs((Date.now() - initTime) / 1000)
    //     this.state.responses[question] = { response: response, truth: truth, time: endTime }
    //     //console.log("End Time is " + endTime)
    //     this.setState({
    //         device_info: navigator.userAgent
    //     })
    //     score_1 = this.state.score
    // }


    shuffle(array) {
        //https://bost.ocks.org/mike/shuffle/
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    get_image_list() {
        fetch('./get_random_images', {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            method: 'POST',
        })
            .then(res => res.json()).then(data => {
                console.log(data.files)
                this.setState({ image_list: data.files })
            })
    }




    on_survey_click() {

        fetch('./record_responses_to_db', {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                session_id: this.state.session_id,
                responses: this.state.responses,
                score: this.state.score,
                device: this.state.device_info,
                demographic_responses: this.state.demographic_questions,
                comment: this.state.comment,
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
            .then(res => res.json()).then(data => {
                //var message = 'Warning!\n\nNavigating away from this page will delete your text if you haven\'t already saved it.';
                //e.returnValue = message;
                //return message;
            })

        var pageType = {
            pathname: '/score',
            state: {
                data: {
                    'session_id': this.state.session_id,
                }
            }
        }
        this.props.history.push(pageType)
    }

    record_ques(img, id, response_type) {
        console.log("hello" + response_type)

        //console.log(img in this.state.responses)
        if (!(img in this.state.responses)) {
            //console.log('CONDITIONAL EXECUTING')
            this.state.responses[img] = []
        }
        if (document.getElementById('1').checked) {
            var select = document.querySelector('input[type=radio][name=likert]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('2').checked) {
            var select = document.querySelector('input[type=radio][name=likert_2]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('3').checked) {
            var select = document.querySelector('input[type=radio][name=likert_3]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('4').checked) {
            var select = document.querySelector('input[type=radio][name=likert_4]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('5').checked) {
            var select = document.querySelector('input[type=radio][name=likert_5]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('6').checked) {
            var select = document.querySelector('input[type=radio][name=likert_6]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('7').checked) {
            var select = document.querySelector('input[type=radio][name=likert_7]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('8').checked) {
            var select = document.querySelector('input[type=radio][name=likert_8]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('9').checked) {
            var select = document.querySelector('input[type=radio][name=likert_9]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('10').checked) {
            var select = document.querySelector('input[type=radio][name=likert_10]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }
        else if (document.getElementById('11').checked) {
            var select = document.querySelector('input[type=radio][name=likert_2]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
        }

        //var select = document.querySelector('input[type=radio][name=likert]:checked');
        //this.state.responses[img].push({ id: id, response: select.value })
        //var select = document.querySelector('input[type=radio][name=likert]:checked');

        console.log('RESPONSES', this.state.responses)
        console.log("Which one is clicked: ")
        //console.log(id)
    }

    next_btn() {
        var radios = document.getElementsByTagName('input');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].type == 'radio' && radios[i].checked) {
                radios[i].checked = false
            }
        }
        // var elem = document.getElementById("l1-ques")
        // elem.remove()
        console.log("Next button is clicked")
        this.setState({
            current_visualization_index: this.state.current_visualization_index + 1,
        })


    }


    render() {
        //initTime = Date.now()
        //console.log("Starting Time is : " + initTime)

        if (this.props.location.state == undefined) {
            window.location.href = "/";
            return (<p>Unknown session. Please start from the <a href={'/'}> consent page</a></p>)
        }
        let ages = []
        for (var i = 18; i < 100; i++) {
            ages.push(i)
        }

        if (this.state == null || this.state.image_list == null) {
            return (<p>Loading...</p>)
        }
        if (this.state.current_visualization_index < 30) {
            console.log('render')
            console.log("Index is " + this.state.current_visualization_index)
            let src_img = this.state.current_visualization_index
            return (
                <Container className={'container-class'} fluid>
                    <Row className={'vis-quiz-row'}>
                        <Col lg={6} className={'vis-column'}>
                            <TransformWrapper initialScale={1} defaultPositionX={100} defaultPositionY={200}>
                                <TransformComponent>
                                    <img src={`./get_image?image_name=${this.state.image_list[src_img]}`} id="zoomA" className='img_rand'></img>
                                </TransformComponent>
                            </TransformWrapper>
                        </Col>
                        <Col lg={6} className={'quiz-column'}>
                            <div className='grid-ques'>
                                <p className={'q1'}>I believe the visualization shows real data.</p>
                                <div className='l1' id="l1-ques"></div>
                                <p className={'q2'}>I am familiar with the topic or data this visualization presents.</p>
                                <div className='l2' id="l1-ques"><Likert id="2" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 2, val)
                                } /></div>
                                <p className={'q3'}>I understand what this visualization is trying to tell me.</p>
                                <div className='l3' id="l1-ques"><Likert id="3" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 3, val)
                                } /></div>
                                <p className={'q4'}>I would rely on the facts in this Visualization.</p>
                                <div className='l4' id="l1-ques"><Likert id="4" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 4, val)
                                } /></div>
                                <p className={'q5'}>I would use the information for a decision.</p>
                                <div className='l5' id="l1-ques"><Likert id="5" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 5, val)
                                } /></div>
                                <p className={'q6'}>I would feel confident using the information to make a decision.</p>
                                <div className='l6' id="l1-ques"><Likert id="6" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 6, val)
                                } /></div>
                                <p className={'q7'}>This is a Narrative Visualization (Telling a story or sharing something that happened.)</p>
                                <div className='l7' id="l1-ques"><Likert id="7" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 7, val)
                                } /></div>
                                <p className={'q8'}>This is a Descriptive Visualization (Sharing details about people, places, or things.)</p>
                                <div className='l8' id="l1-ques"><Likert id="8" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 8, val)
                                } /></div>
                                <p className={'q9'}>This is a Persuasive Visualization (Getting a point across or trying to convince the viewer.)</p>
                                <div className='l9' id="l1-ques"><Likert id="9" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 9, val)
                                } /></div>
                                <p className={'q10'}>This is an Expository Visualization (Explaining or informing about a particular topic.)</p>
                                <div className='l10' id="l1-ques"><Likert id="10" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 10, val)
                                } /></div>
                                <p className={'q11'}>This is a Creative Visualization (An artistic expression with data.)</p>
                                <div className='l11' id="l1-ques"><Likert id="11" name="language" responses={this.state.response_likert} onChange={(val) =>
                                    this.record_ques(this.state.image_list[src_img], 11, val)
                                } /></div>
                                <div className={'sub-btn'}>
                                    <Button id={'nxt-btn'} className={'btn-1'} type={"button"} onClick={() =>
                                        this.next_btn()
                                    }>Next</Button>
                                </div> 
                                <p className={"h_1"}>Credibility</p>
                                <p className={'statement'}>I believe the visualization shows real data.</p>
                                <div className={'l1'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='1' type='radio' name='likert' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 1, val.name)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='1' type='radio' name='likert' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 1, val.name)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='1' type='radio' name='likert' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 1, val.name)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='1' type='radio' name='likert' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 1, val.name)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='1' type='radio' name='likert' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 1, val.name)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={'statement_2'}>I am familiar with the topic or data this visualization presents.</p>
                                <div className={'l2'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='2' type='radio' name='likert_2' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 2, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='2' type='radio' name='likert_2' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 2, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='2' type='radio' name='likert_2' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 2, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='2' type='radio' name='likert_2' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 2, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='2' type='radio' name='likert_2' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 2, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={"h_2"}>Understand</p>
                                <p className={'statement_3'}>I understand what this visualization is trying to tell me.</p>
                                <div className={'l3'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='3' type='radio' name='likert_3' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='3' type='radio' name='likert_3' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='3' type='radio' name='likert_3' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='3' type='radio' name='likert_3' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='3' type='radio' name='likert_3' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={"h_3"}>Future action</p>
                                <p className={'statement_4'}>I would rely on the facts in this Visualization.</p>
                                <div className={'l4'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='4' type='radio' name='likert_4' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 4, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='4' type='radio' name='likert_4' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 4, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='4' type='radio' name='likert_4' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 4, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='4' type='radio' name='likert_4' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 4, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='4' type='radio' name='likert_4' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 4, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={'statement_5'}>I would feel confident using the information to make a decision.</p>
                                <div className={'l5'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='5' type='radio' name='likert_5' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 5, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='5' type='radio' name='likert_5' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 5, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='5' type='radio' name='likert_5' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 5, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='5' type='radio' name='likert_5' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 5, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='5' type='radio' name='likert_5' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 5, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={"h_4"}>Motive (Genre)</p>
                                <p className={'statement_6'}>This is a Narrative Visualization (Telling a story or sharing something that happened.)</p>
                                <div className={'l6'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='6' type='radio' name='likert_6' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 6, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='6' type='radio' name='likert_6' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 6, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='6' type='radio' name='likert_6' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 6, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='6' type='radio' name='likert_6' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 6, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='6' type='radio' name='likert_6' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 6, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={'statement_7'}>This is a Descriptive Visualization (Sharing details about people, places, or things.)</p>
                                <div className={'l7'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='7' type='radio' name='likert_7' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 7, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='7' type='radio' name='likert_7' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 7, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='7' type='radio' name='likert_7' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 7, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='7' type='radio' name='likert_7' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 7, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='7' type='radio' name='likert_7' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 7, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={'statement_8'}>This is a Persuasive Visualization (Getting a point across or trying to convince the viewer.)</p>
                                <div className={'l8'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='8' type='radio' name='likert_8' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='8' type='radio' name='likert_8' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='8' type='radio' name='likert_8' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='8' type='radio' name='likert_8' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='8' type='radio' name='likert_8' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={'statement_9'}>This is an Expository Visualization (Explaining or informing about a particular topic.)</p>
                                <div className={'l9'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='9' type='radio' name='likert_9' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='9' type='radio' name='likert_9' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='9' type='radio' name='likert_9' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='9' type='radio' name='likert_9' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='9' type='radio' name='likert_9' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={'statement_10'}>This is a Creative Visualization (An artistic expression with data.)</p>
                                <div className={'l10'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='10' type='radio' name='likert_10' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='10' type='radio' name='likert_10' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='10' type='radio' name='likert_10' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='10' type='radio' name='likert_10' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='10' type='radio' name='likert_10' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <p className={'statement_11'}>This is a Technical Visualization (Presenting specialized or scientific data.)</p>
                                <div className={'l11'}>
                                    <ul className={'likert'}>
                                        <li>
                                            <input id='11' type='radio' name='likert_11' value='Strong_agree' onChange={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Agree</label>
                                        </li>
                                        <li>
                                            <input id='11' type='radio' name='likert_11' value='agree' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label> Agree</label>
                                        </li>
                                        <li>
                                            <input id='11' type='radio' name='likert_11' value='nor' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Neither Agree nor Disagree</label>
                                        </li>
                                        <li>
                                            <input id='11' type='radio' name='likert_11' value='dis' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Disagree</label>
                                        </li>
                                        <li>
                                            <input id='11' type='radio' name='likert_11' value='std' onClick={(val) =>
                                                this.record_ques(this.state.image_list[src_img], 3, val.value)
                                            } />
                                            <label>Strongly Disagree</label>
                                        </li>
                                    </ul>
                                </div>
                                <div className={'sub-btn'}>
                                    <button id={'nxt-btn'} className={'btn-1'} type={"button"} onClick={() =>
                                        this.next_btn()
                                    }>Next</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className={'progress-bar-row'}>
                        <ProgressBar completed={(parseInt(this.state.current_visualization_index)).toString()} maxCompleted={num.toString()} length={Math.min(window.innerWidth, window.innerHeight)} />
                    </Row>
                </Container>
            )
        }
        else {
            return (
                <>
                    <Row className={'justify-content-center no-margin-row'}>
                        <Col lg={6} className={'text-box text-justify'}>


                            <Form.Group className={'question'}>
                                <Form.Label>Please select your age.</Form.Label>
                                <Form.Select as="select" id={'age'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    {ages.map((d, i) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <hr />

                            <Form.Group className={'question'}>
                                <Form.Label>Please select your gender.</Form.Label>
                                <Form.Select as="select" id={'sex'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option key={'male'} value={'male'}>Male</option>
                                    <option key={'female'} value={'female'}>Female</option>
                                    <option key={'other'} value={'other'}>Other</option>
                                    <option key={'withdraw'} value={'withdraw'}>I do not wish to disclose.</option>
                                </Form.Select>
                            </Form.Group>
                            <hr />

                            <Form.Group className={'question'}>
                                <Form.Label>Please select your highest level of completed education.</Form.Label>
                                <Form.Select as="select" id={'education'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option value={'highschool'}>High School Diploma / GED</option>
                                    <option value={'associate'}>Associate Degree</option>
                                    <option value={'bachelors'}>Bachelors Degree</option>
                                    <option value={'masters'}>Masters Degree</option>
                                    <option value={'doctorate'}>Doctorate Degree</option>
                                </Form.Select>
                            </Form.Group>
                            <hr />

                            {/* <Form.Group className={'question'}>
                                <Form.Label>Please select your familiarity with visualization.</Form.Label>
                                <Form.Select as="select" id={'familiarity'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option value={'not_familiar'}>I have never created a visualization.</option>
                                    <option value={'somewhat'}>I am somewhat familiar.</option>
                                    <option value={'very_familiar'}>I have created visualization systems before. </option>
                                </Form.Select>
                            </Form.Group>
                            <hr /> */}


                            <Form.Group>
                                <Form.Label>Please include any additional comments below. (optional)</Form.Label>
                                <Form.Control as="textarea" id={'comments'} rows={3} onChange={this.handleTextChange.bind(this)}>
                                </Form.Control>
                            </Form.Group>
                            <hr />


                            <div className={'text-center'}><Button className={'btn-sm'}
                                variant={"success"}
                                onClick={this.on_survey_click.bind(this)}
                                disabled={(this.state.form_incomplete || this.state.demographics_incomplete)}
                                id={'survey_submit-btn'}>
                                Submit Responses
                            </Button></div>

                            <p className={'text-box'}></p>
                        </Col>

                    </Row>
                </>
            )
        }
    }
}



export default VisQuiz;
