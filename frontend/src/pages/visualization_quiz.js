import React, { Component} from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import '../App.css';
import ProgressBar from "@ramonak/react-progress-bar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import $ from 'jquery';
var num = 30
var radioCounter = 0;

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
        if (e.value === 'oth') {
            alert('Hello')
        }

        this.setState({ demographic_questions: new_dq, demographics_incomplete: incomplete })
    }

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

        //get element 1 or 2 or 3 or 4 or 5
        //def counter 
        //for loop her
        //for(radioCounter = 0; radioCounter >=11; radioCounter++){
        if (document.getElementById('1').checked || document.getElementById('2').checked || document.getElementById('3').checked || document.getElementById('4').checked || document.getElementById('5').checked) {
            var select = document.querySelector('input[type=radio][name=likert]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            radioCounter = 1;
            //radioCounter++;
            console.log('radio value', radioCounter);
            
        }
        else if (document.getElementById('6').checked || document.getElementById('7').checked || document.getElementById('8').checked || document.getElementById('9').checked || document.getElementById('10').checked) {
            var select = document.querySelector('input[type=radio][name=likert_2]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            //radioCounter = 2;
            radioCounter++;
            console.log('radio value', radioCounter);
            
        }
        else if (document.getElementById('11').checked || document.getElementById('12').checked || document.getElementById('13').checked || document.getElementById('14').checked || document.getElementById('15').checked) {
            var select = document.querySelector('input[type=radio][name=likert_3]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            //radioCounter = 3;
            radioCounter++;
            console.log('radio value', radioCounter); 
            
        }
        else if (document.getElementById('16').checked || document.getElementById('17').checked || document.getElementById('18').checked || document.getElementById('19').checked || document.getElementById('20').checked) {
            var select = document.querySelector('input[type=radio][name=likert_4]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            radioCounter++;
            //radioCounter = 4;
            
        }
        else if (document.getElementById('21').checked || document.getElementById('22').checked || document.getElementById('23').checked || document.getElementById('24').checked || document.getElementById('25').checked) {
            var select = document.querySelector('input[type=radio][name=likert_5]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            //radioCounter = 5;
            radioCounter++;
            
        }
        else if (document.getElementById('26').checked || document.getElementById('27').checked || document.getElementById('28').checked || document.getElementById('29').checked || document.getElementById('30').checked) {
            var select = document.querySelector('input[type=radio][name=likert_6]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            //radioCounter = 6;
            radioCounter++;
            
        }
        else if (document.getElementById('31').checked || document.getElementById('32').checked || document.getElementById('33').checked || document.getElementById('34').checked || document.getElementById('35').checked) {
            var select = document.querySelector('input[type=radio][name=likert_7]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            //radioCounter = 7;
            radioCounter++;
           
        }
        else if (document.getElementById('36').checked || document.getElementById('37').checked || document.getElementById('38').checked || document.getElementById('39').checked || document.getElementById('40').checked) {
            var select = document.querySelector('input[type=radio][name=likert_8]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            //radioCounter = 8;
            radioCounter++;
           
        }
        else if (document.getElementById('41').checked || document.getElementById('42').checked || document.getElementById('43').checked || document.getElementById('44').checked || document.getElementById('45').checked) {
            var select = document.querySelector('input[type=radio][name=likert_9]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            //radioCounter = 9;
            radioCounter++;
           
        }
        else if (document.getElementById('46').checked || document.getElementById('47').checked || document.getElementById('48').checked || document.getElementById('49').checked || document.getElementById('50').checked) {
            var select = document.querySelector('input[type=radio][name=likert_10]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            //radioCounter = 10;
            radioCounter++;
            
        }
        else if (document.getElementById('51').checked || document.getElementById('52').checked || document.getElementById('53').checked || document.getElementById('54').checked || document.getElementById('55').checked) {
            var select = document.querySelector('input[type=radio][name=likert_11]:checked');
            this.state.responses[img].push({ id: id, response: select.value })
            //radioCounter = 11;
            console.log('radio value', radioCounter);
          
            radioCounter++;
        }
    //}

        console.log('RESPONSES', this.state.responses)
        console.log("Which one is clicked: ")
    }

    next_btn() {

        //try for loop
        if(radioCounter === 1){
            alert('All questions answered. Proceeding to next question.');
            var radios = document.getElementsByTagName('input');
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type === 'radio' && radios[i].checked) {
                        radios[i].checked = false
                 }
            }
            
            console.log("Next button is clicked")
            this.setState({
              current_visualization_index: this.state.current_visualization_index + 1,
            })
            
            var images1 = document.getElementById("zoomA");
            images1.style.transform = "scale(0.5)";

            //reset radio counter
            //radioCounter = 0;
        }

        else {
            alert('Not all questions have been answered, yet.');
        }
    } 
        /*var radioCounter = 0;

        for(i=0;i>=11;i++){
            if(){
                radioCounter++;
            }        
        }*/
        
        

    
    // next_btn() {
    //      var radios = document.getElementsByTagName('input');
    //         for (var i = 0; i < radios.length; i++) {
    //           if (radios[i].type === 'radio' && radios[i].checked) {
    //               radios[i].checked = false
    //           }
    //         } 
  
    //         console.log("Next button is clicked")
    //         this.setState({
    //           current_visualization_index: this.state.current_visualization_index + 1,
    //       })
    // } 


    
    render() {
        if (this.props.location.state === undefined) {
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
                            {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
                                <React.Fragment>
                                    <div className="tools">
                                        <button className="icon-btn" onClick={() => zoomIn()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="zoom-glass" id="magnigfying-glass" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                                <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/>
                                                <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                        </button>
                                        <button className="icon-btn" onClick={() => zoomOut()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="zoom-out-glass" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                                <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/>
                                                <path fill-rule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                                            </svg>
                                        </button>
                                        <button className="icon-btn" onClick={() => resetTransform()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="reset" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                            </svg>
                                        </button>
                                        <button className="icon-btn" onClick={() => centerView()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="center-icon" viewBox="0 0 16 16">
                                                <path d="M8 1a.5.5 0 0 1 .5.5V6h-1V1.5A.5.5 0 0 1 8 1zm0 14a.5.5 0 0 1-.5-.5V10h1v4.5a.5.5 0 0 1-.5.5zM2 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z"/>
                                            </svg>
                                        </button>            
                                    </div>

                                    {/*contentStyle={{ width: 700, height: 700}}*/}
                                    <TransformComponent contentStyle={{ width: 600, height: 600}} >
                                        <img src={`./get_image?image_name=${this.state.image_list[src_img]}`} id="zoomA" className='img_rand' alt="data visualization"></img>
                                    </TransformComponent>
                                   
                                </React.Fragment>
                            )}
                            </TransformWrapper>
                        </Col>
                        <Col lg={6} className={'quiz-column'}>
                            <div className='grid-ques'>
                                {/*CREDIBILITY*/}
                               
                                    <p className={"h_1"}>CREDIBILITY</p>
                                    <p className={'statement'}>I believe the visualization shows real data.</p>
                                    <div className={'l1'}>
                                        <ul className={'likert'}>
                                            <li>
                                                <input id ='1' type='radio' className = "l1s" name='likert' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 1, val.name)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id ='2' type='radio' className = "l1s" name='likert' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 1, val.name)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='3' type='radio' className = "l1s" name='likert' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 1, val.name)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id ='4' type='radio' className = "l1s" name='likert' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 1, val.name)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id ='5' className = "l1s" type='radio' name='likert' value='std' onClick={(val) =>
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
                                                <input id='6' type='radio' className = "l2s" name='likert_2' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 2, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='7' type='radio' className = "l2s" name='likert_2' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 2, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='8' type='radio' className = "l2s" name='likert_2' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 2, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='9' type='radio' className = "l2s" name='likert_2' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 2, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='10' type='radio' className = "l2s" name='likert_2' value='std' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 2, val.value)
                                                } />
                                                <label>Strongly Disagree</label>
                                            </li>
                                        </ul>
                                    </div>
            

                                {/*UNDERSTAND*/}
                               
                                    <p className={"h_2"}>UNDERSTAND</p>
                                    <p className={'statement_3'}>I understand what this visualization is trying to tell me.</p>
                                    <div className={'l3'}>
                                        <ul className={'likert'}>
                                            <li>
                                                <input id='11' type='radio' name='likert_3' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='12' type='radio' name='likert_3' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='13' type='radio' name='likert_3' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='14' type='radio' name='likert_3' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='15' type='radio' name='likert_3' value='std' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Strongly Disagree</label>
                                            </li>
                                        </ul>
                                    </div>
                                

                                {/*FUTURE ACTION*/}
                                    <p className={"h_3"}>FUTURE ACTION</p>
                                    <p className={'statement_4'}>I would rely on the facts in this Visualization.</p>
                                    <div className={'l4'}>
                                        <ul className={'likert'}>
                                            <li>
                                                <input id='16' type='radio' name='likert_4' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 4, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='17' type='radio' name='likert_4' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 4, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='18' type='radio' name='likert_4' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 4, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='19' type='radio' name='likert_4' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 4, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='20' type='radio' name='likert_4' value='std' onClick={(val) =>
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
                                                <input id='21' type='radio' name='likert_5' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 5, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='22' type='radio' name='likert_5' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 5, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='23' type='radio' name='likert_5' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 5, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='24' type='radio' name='likert_5' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 5, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='25' type='radio' name='likert_5' value='std' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 5, val.value)
                                                } />
                                                <label>Strongly Disagree</label>
                                            </li>
                                        </ul>
                                    </div>
                                

                                {/*MOTIVE*/}             
                                    <p className={"h_4"}>MOTIVE (GENRE)</p>
                                    <p className={'statement_6'}>This is a Narrative Visualization (Telling a story or sharing something that happened)</p>
                                    <div className={'l6'}>
                                        <ul className={'likert'}>
                                            <li>
                                                <input id='26' type='radio' name='likert_6' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 6, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='27' type='radio' name='likert_6' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 6, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='28' type='radio' name='likert_6' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 6, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='29' type='radio' name='likert_6' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 6, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='30' type='radio' name='likert_6' value='std' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 6, val.value)
                                                } />
                                                <label>Strongly Disagree</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <p className={'statement_7'}>This is a Descriptive Visualization (Sharing details about people, places, or things)</p>
                                    <div className={'l7'}>
                                        <ul className={'likert'}>
                                            <li>
                                                <input id='31' type='radio' name='likert_7' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 7, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='32' type='radio' name='likert_7' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 7, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='33' type='radio' name='likert_7' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 7, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='34' type='radio' name='likert_7' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 7, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='35' type='radio' name='likert_7' value='std' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 7, val.value)
                                                } />
                                                <label>Strongly Disagree</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <p className={'statement_8'}>This is a Persuasive Visualization (Getting a point across or trying to convince the viewer)</p>
                                    <div className={'l8'}>
                                        <ul className={'likert'}>
                                            <li>
                                                <input id='36' type='radio' name='likert_8' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='37' type='radio' name='likert_8' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='38' type='radio' name='likert_8' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='39' type='radio' name='likert_8' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='40' type='radio' name='likert_8' value='std' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Strongly Disagree</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <p className={'statement_9'}>This is an Expository Visualization (Explaining or informing about a particular topic)</p>
                                    <div className={'l9'}>
                                        <ul className={'likert'}>
                                            <li>
                                                <input id='41' type='radio' name='likert_9' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='42' type='radio' name='likert_9' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='43' type='radio' name='likert_9' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='44' type='radio' name='likert_9' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='45' type='radio' name='likert_9' value='std' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Strongly Disagree</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <p className={'statement_10'}>This is a Creative Visualization (An artistic expression with data)</p>
                                    <div className={'l10'}>
                                        <ul className={'likert'}>
                                            <li>
                                                <input id='46' type='radio' name='likert_10' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='47' type='radio' name='likert_10' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='48' type='radio' name='likert_10' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='49' type='radio' name='likert_10' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='50' type='radio' name='likert_10' value='std' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Strongly Disagree</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <p className={'statement_11'}>This is a Technical Visualization (Presenting specialized or scientific data)</p>
                                    <div className={'l11'}>
                                        <ul className={'likert'}>
                                            <li>
                                                <input id='51' type='radio' name='likert_11' value='Strong_agree' onChange={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Strongly Agree</label>
                                            </li>
                                            <li>
                                                <input id='52' type='radio' name='likert_11' value='agree' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label> Agree</label>
                                            </li>
                                            <li>
                                                <input id='53' type='radio' name='likert_11' value='nor' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Neither</label>
                                            </li>
                                            <li>
                                                <input id='54' type='radio' name='likert_11' value='dis' onClick={(val) =>
                                                    this.record_ques(this.state.image_list[src_img], 3, val.value)
                                                } />
                                                <label>Disagree</label>
                                            </li>
                                            <li>
                                                <input id='55' type='radio' name='likert_11' value='std' onClick={(val) =>
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