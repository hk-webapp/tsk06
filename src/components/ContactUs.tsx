import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ChangeDescAction, ChangeEmailAction, ChangeNameAction } from 'src/actions/contactusAction';
import { getDesc, getEmail, getName } from 'src/reducers/ContacUsReducer';
import { IContacUsState } from 'src/Store/AllStates';
import { IAppState } from 'src/Store/store';
import '../styles/ContactUs.scss'


interface IContacUsProps {
    Name: string,
    Email: string,
    Desc: string,
    ChangeName: (name: string) => void;
    ChangeEmail: (email: string) => void;
    ChangeDesc: (desc: string) => void;
}

class ContactUs extends React.Component<IContacUsProps, IContacUsState> {

    constructor(props: IContacUsProps) {
        super(props);

        this.Send = this.Send.bind(this);
        this.blurHandlingForEmail = this.blurHandlingForEmail.bind(this);
        this.blurHandlingForName = this.blurHandlingForName.bind(this);
        this.changeHanhleing = this.changeHanhleing.bind(this);
        this.blurHandlingForDesc = this.blurHandlingForDesc.bind(this);
    }

    // tslint:disable-next-line: no-empty
    public changeHanhleing(event: React.ChangeEvent<HTMLInputElement>) {

    }
    public blurHandlingForName(event: React.FocusEvent<HTMLInputElement>) {
        this.props.ChangeName(event.target.value);
    }

    public blurHandlingForEmail(event: React.FocusEvent<HTMLInputElement>) {
        this.props.ChangeEmail(event.target.value);
    }

    public blurHandlingForDesc(event: React.FocusEvent<HTMLTextAreaElement>) {
        this.props.ChangeDesc(event.target.value);
    }

    public Send() {
        // tslint:disable-next-line: no-console
        alert(this.props.Name);
    }

    public render() {
        document.title = "Countact us";

        return (
            <div className="contactus-container ">
                <div className="contactus-view">
                    <div className="view-col">
                        <img alt="contact us img" src={process.env.PUBLIC_URL + "/Images/contact.gif"} className="contact_us_img" />
                        <h4>?????? ??????????</h4>
                        <p>
                            ???????????? ???????????? ........
                        </p>
                        <p>
                            ???????? : 021 - 00000000
                        </p>
                        <p>
                            WebSite : www.........com
                        </p>
                    </div>
                    <div className="view-col">
                        <div className="contact-info">
                            <div className="desc-top">???????? ???? ???????? ?????? ?????? ?????????? ?? ?????????????????? ?????? ???? ???????? ???? ?????????? ????????????</div>
                            <div className="form-group">
                                <label>?????? ?? ?????? ????????????????

                <input className="form-control" onChange={this.changeHanhleing}
                                        onBlur={this.blurHandlingForName} type="text" placeholder="?????? ?? ?????? ???????????????? ???? ???????? ????????????." />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>??????????
                <input className="form-control" type="email" onBlur={this.blurHandlingForEmail}
                                        onChange={this.changeHanhleing} placeholder="?????????? ?????? ???? ???????? ????????????" />

                                </label>
                            </div>
                            <div className="form-group">
                                <label>??????????????
                <textarea className="form-control" rows={5} onBlur={this.blurHandlingForDesc}
                                        placeholder="?????????????? ?????? ???? ???????? ????????????" />

                                </label>
                            </div>
                            <div className="form-group">
                                <input type="button" id="sendBtn" value="??????????" onClick={this.Send} />   </div>                    </div>

                    </div>

                </div>

            </div>)
    }
}
const mapStateToProps = (state: IAppState) => {
    return {
        Desc: getDesc(state.contactusState),
        Email: getEmail(state.contactusState),
        Name: getName(state.contactusState),
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ChangeDesc: ChangeDescAction,
    ChangeEmail: ChangeEmailAction,
    ChangeName: ChangeNameAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);