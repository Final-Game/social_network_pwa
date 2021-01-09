import { NextPage } from "next";
import { withTranslation } from "@Server/i18n";
import { IAccountChat } from "@Interfaces";
import searchIcon from "@Assets/images/search-icon.png";
import avatarIcon from "@Assets/images/profile.jpeg";
import { StoryHome } from "@Components/Basic";
import NavFooter, { NavPageType } from "@Components/NavFooter";
import AuthenticatePageRequired from "@Components/Auths/AuthenticatePageRequired";
import { useRouter } from "next/router";
import { ACCOUNT_ROOM_MESSAGE_PAGE_ROUTE } from "src/Routes/contants";
import { FormatString } from "src/Commons/Strings/utils";

const absoluteCenter = {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
};

const styles = {
    footer: {
        backgroundColor: "#8000FF",
        height: "94px",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
        zIndex: "2"
    },
    iconContainer: {
        height: "100%",
        width: "25%",
        position: "relative",
    },
    icon: {
        opacity: "70%",
        textAlign: "center",
        height: "50px",
        width: "50px",
        ...absoluteCenter,
    },
    main: {
        backgroundColor: "#9597A1",
        height: "100%",
        paddingTop: "59px",
        paddingBottom: "94px",
        zIndex: "1"
    },
}

const UserStoriesSliding = (props: any) => {
    return (
        <div style={{
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            height: "100px"
        }}>
            <StoryHome name="Tuan" />
            <StoryHome name="Tuan" />
            <StoryHome name="Tuan" />
            <StoryHome name="Tuan" />
            <StoryHome name="Tuan" />
            <StoryHome name="Tuan" />
            <StoryHome name="Tuan" />
            <StoryHome name="Tuan" />
        </div>
    )
}

const avatarContainerStyle = {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    backgroundColor: "white",
    overflow: "hidden"
}
const timeCounterStyle = {
    position: "absolute",
    right: "10px",
    backgroundColor: "white",
}

interface IMessagePreviewProps {
    numNewMsgs: number;
    latestMsgTime: string;
    avatar: string;
    msgPreview: string;
    name: string;
}

const MessagePreviewComponent = (props: IMessagePreviewProps) => {
    const router = useRouter();
    const handleRouteToRoomMessage = async () => {
        await router.push(FormatString(ACCOUNT_ROOM_MESSAGE_PAGE_ROUTE, 1));
    }

    return (
        <div style={{ backgroundColor: "inherit", position: "relative", padding: "12px 15px", display: "flex" }} onClick={() => {handleRouteToRoomMessage()}} >
            <div className="avatar_user" style={avatarContainerStyle}>
                <img alt="XXX" height="100%" width="100%" src={props.avatar ? props.avatar : avatarIcon} />
            </div>
            <div className="main_content" style={{ marginLeft: "15px" }}>
                <h5 style={{ marginBottom: "0px", color: "black" }}>{props.name ? props.name : "Nguyen Minh tuan"}</h5>
                <p className="msgPreview" style={{ marginBottom: "0px", lineHeight: "25px", opacity: "20%" }}>{props.msgPreview ? props.msgPreview : "Yeah I know"}</p>
            </div>
            <div className="time_counter" style={timeCounterStyle}>
                <div style={{ height: "10px" }}>
                    <p style={{ lineHeight: "10px", marginBottom: "0px", opacity: "50%" }}>{props.latestMsgTime ? props.latestMsgTime : "11:47"}</p>
                </div>

                {
                    (!props.numNewMsgs ? null :
                        <p style={{ padding: "5px", lineHeight: "20px" }}>
                            <p style={{ backgroundColor: "#5458F7", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                                <p style={{ margin: "0px", color: "white", opacity: "80%" }}>{props.numNewMsgs ? props.numNewMsgs : 0}</p>
                            </p>
                        </p>
                    )
                }
            </div>
        </div>
    )
}


const AccountChat: NextPage<IAccountChat.IProps, IAccountChat.InitialProps> = (props: any) => {
    const searchBarStyle = {
        height: "55px",
        width: "100%",
        backgroundColor: "inherit",
        marginTop: "15px",
        border: "1px solid #747474",
        borderRadius: "27px",
        lineHeight: "50px",
    }

    return (
        <AuthenticatePageRequired>
            <div style={{ height: "100vh", position: "relative" }}>
                <div className="search_bar" style={searchBarStyle}>
                    <div style={{ display: "block" }}>
                        <img style={{ display: "inline", height: "30px", width: "30px", marginLeft: "10px", marginRight: "10px" }} alt="K" src={searchIcon} />
                        <input style={{ display: "inline", backgroundColor: "inherit", width: "80%", border: "none", outline: "none", color: "#747474" }} placeholder="Search conversation" />
                    </div>
                    <div className="moments" style={{ border: "2px solid white", marginTop: "5px", marginBottom: "10px" }}>
                        <div style={{ marginLeft: "15px" }}>
                            <div >
                                <p style={{ marginBottom: "0px" }}>Moments</p>
                            </div>
                            <div style={{}}>
                                <UserStoriesSliding />
                            </div>
                        </div>
                    </div>
                    <div
                        className="messages"
                        style={{ backgroundColor: "inherit", overflowY: "auto" }}
                    >
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                        <MessagePreviewComponent />
                    </div>
                </div>
                <NavFooter type={NavPageType.CHAT} />
            </div>
        </AuthenticatePageRequired>
    )
}

const Extended = withTranslation("common")(AccountChat);

export default Extended;