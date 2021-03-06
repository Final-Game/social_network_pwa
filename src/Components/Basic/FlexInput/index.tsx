import { useState } from "@hookstate/core"

interface IFlexInput {
    name: string,
    iconUrl: string,
    iconExpand?: string | undefined,
    placeHolder?: string | undefined,
    hideContent?: boolean | null,

    onChange?: (target: any) => any,
}

const headerDetailStyle = {
    color: "#8F8F8F",
}
const InputMeasure = {
    display: "flex",
    borderBottom: "solid 2px #9C9C9C",
    paddingBottom: "5px"
}
const InputAreaStyle = {
    width: "96%",
    margin: "2%",
}
const InputStyle = {
    width: "100%",
    height: "100%",
    margin: "0px 0px 0px 10px",
    border: "none",
    outline: "none"
}
const iconStyle = {
    height: "35px",
    width: "35px",
}

function FlexInput(props: IFlexInput) {
    const isPassword = useState(props.hideContent === true);
    const hideContentStatus = useState(props.hideContent);

    return (
        <div style={{ margin: "30px 0px" }}>
            <p style={headerDetailStyle}>{props.name}</p>
            <div style={InputAreaStyle}>
                <div style={InputMeasure}>
                    {props.iconUrl && (
                        <div>
                            <img style={iconStyle} src={props.iconUrl} />
                        </div>
                    )}
                    <div style={{ flex: "1" }}>
                        <input placeholder={props.placeHolder} style={InputStyle} onChange={props.onChange} type={isPassword.value && hideContentStatus.value ? "password" : "text"} />
                    </div>
                    {props.iconExpand && (
                        <div onClick={() => isPassword.value && hideContentStatus.set(!hideContentStatus.value)}>
                            <img style={iconStyle} src={props.iconExpand} />
                        </div>
                    )}

                </div>
                {/* <div style={barInputStyle} /> */}
            </div>
        </div>
    );
}


export default FlexInput;
