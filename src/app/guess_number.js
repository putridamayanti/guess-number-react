import React from "react";
import './guess_number.css';
import {Card, Col, Container, Row, Alert} from "react-bootstrap";

export default class GuessNumber extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            secret: '1134',
            number: '',
            clue: {},
            history: [],
            success: '',
            failed: ''
        };

        this.input1 = React.createRef();
        this.input2 = React.createRef();
        this.input3 = React.createRef();
        this.input4 = React.createRef();
    }

    submitNumber(event) {
        event.preventDefault();
        const { number, secret, history} = this.state;
        let numberRight = 0; let positionRight = 0;
        var countsNumber = [];
        var countsSecret = [];
        if (number !== secret) {
            number.split('').forEach((item, i) => {
                if (countsNumber.indexOf(item) === -1) {
                    countsNumber.push(item);
                }
            });
            secret.split('').forEach((item, i) => {
                if (countsSecret.indexOf(item) === -1) {
                    countsSecret.push(item);
                }
            });
            countsNumber.forEach((item) => {
               if (countsSecret.indexOf(item) !== -1) {
                   numberRight++;
                   if (number.indexOf(item) === secret.indexOf(item)) {
                       positionRight++;
                   }
               }
            });
            var historyState = [];
            history.forEach((item) => {
                historyState.push(item);
            });
            historyState.push({
               number: number,
               numberRight: numberRight,
               positionRight: positionRight
            });
            this.setState((state) => {
                return {
                    clue: {
                        numberRight: numberRight,
                        positionRight: positionRight
                    },
                    history: historyState,
                    number: '',
                    failed: historyState.length === 2 ? 'Failed to guess!' : ''
                }
            });
            this.input1.current.focus();
        } else {
            this.setState((state) => {
                return {
                    success: 'Successfully guess the number'
                }
            })
        }
    }

    handleChange(event) {
        const index = event.currentTarget.dataset.index;
        const value = event.target.value;
        let currNumber = this.state.number;
        currNumber += value;
        this.setState((state) => {
            return {
                number: currNumber
            }
        });
        if (value.length === 1) {
            switch (index) {
                case '1':
                    this.input2.current.focus();
                    break;
                case '2':
                    this.input3.current.focus();
                    break;
                case '3':
                    this.input4.current.focus();
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        return (
            <Container>
                { this.state.success !== '' ? (
                    <Alert variant="success">
                        { this.state.success }
                    </Alert>
                ) : <></> }

                { this.state.failed !== '' ? (
                    <Alert variant="danger">
                        { this.state.failed }
                    </Alert>
                ) : <></> }

                { this.state.clue['numberRight'] ? (
                    <Card style={{ marginBottom: 20 }}>
                        <h3>Clue :</h3>
                        <p>- Number Right : { this.state.clue['numberRight'] }</p>
                        <p>- Position Right : { this.state.clue['positionRight'] }</p>
                    </Card>
                ) : <></>}

                { this.state.failed === '' ? (
                    <form onSubmit={(event) => this.submitNumber(event)}>
                        <input type="text" value={this.state.number.charAt(0)} ref={this.input1} data-index={1} autoFocus={true}
                               onChange={(event) => this.handleChange(event)} maxLength={1}/>
                        <input type="text" value={this.state.number.charAt(1)} ref={this.input2} data-index={2}
                               onChange={(event) => this.handleChange(event)} />
                        <input type="text" value={this.state.number.charAt(2)} ref={this.input3} data-index={3}
                               onChange={(event) => this.handleChange(event)} />
                        <input type="text" value={this.state.number.charAt(3)} ref={this.input4} data-index={4}
                               onChange={(event) => this.handleChange(event)} maxLength={1} />

                        <br/>
                        <button type="submit">Submit</button>
                    </form>
                ) : <></>}

                { this.state.history.length !== 0 ? (
                    <div style={{ marginTop: 30 }}>
                        { this.state.history.map((item, i) => {
                            return (
                                <Card key={i} style={{ marginTop: 10, marginBottom: 10 }}>
                                    <Row>
                                        <Col>
                                            <h1 style={{ margin: 0 }}>
                                                { item.number }
                                            </h1>
                                        </Col>
                                        <Col>
                                            <p style={{ margin: 0 }}>Number : { item.numberRight }</p>
                                            <p style={{ margin: 0 }}>Position : { item.positionRight }</p>
                                        </Col>
                                    </Row>
                                </Card>
                            );
                        })}
                    </div>
                ) : <></>}
            </Container>
        );
    }
}