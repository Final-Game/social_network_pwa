import { useMutation, useQuery } from "@apollo/client";
import avatarIcon from "@Assets/images/profile.jpeg";
import { GET_ACCOUNT_INFO_QUERY } from "@Libs/Queries/getAccountInfoQuery";
import { useRouter } from "next/router";
import Gallery from 'react-photo-gallery';
import { useState } from "@hookstate/core";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { FormatString } from "src/Commons/Strings/utils";
import { ACCOUNT_POST_COMMENT_PAGE_ROUTE, ACCOUNT_POST_REACTION_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from "src/Routes/contants";
import { useCallback, useState as useStateReact } from "react";
import avatarReactionIcon from "@Assets/images/monster_1.png";
import { Box, Container, Image, Text } from "@chakra-ui/react";
import commentIcon from '@Assets/images/chat.png';
import laughingIcon from "@Assets/images/laughing.png";
import laughingEmptyIcon from "@Assets/images/laughing-empty.png";
import heartIcon from "@Assets/images/heart.png";
import heartEmptyIcon from "@Assets/images/heart-empty.png";
import { USER_REACT_POST_MUTATION } from "@Libs/Mutations/userReactPostMutation";

interface IPhotoData {
    src: string;
    width: number;
    height: number;
}

const boundContainer = {
    left: "0%",
    position: "absolute",
    top: "50%",
    transform: "translate(0%, -50%)",
    paddingLeft: "10px",
    display: "flex",
} as React.CSSProperties;
const iconTicketStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    overflow: "hidden",
    marginLeft: "-10px",
    border: "solid 2px white",
};


interface IAccountInfo {
    firstName: string;
    lastName: string;
    avatarUrl: string;
}
interface IMedia {
    type?: string;
    url: string;
}

interface IUserPostProp {
    id: string;
    isDetail?: boolean;
    accountId?: string;
    cnt?: string;
    medias?: Array<IMedia>
    num_reacts?: number;
    num_comments?: number;
    num_shared?: number;
    react_status?: string;
}

enum ReactType {
    NONE = -1,
    LIKE = 0,
    LOVE = 1,
    HAHA = 2
}

const mapReactType = (str_value: string | null) => {
    switch (str_value) {
        case "HAHA":
            return ReactType.HAHA
        case "LIKE":
            return ReactType.LIKE
        case "LOVE":
            return ReactType.LOVE
        default:
            return ReactType.NONE
    }
}

interface IUserReactTabFCProps {
    accountId: string;
    postId: string;
    reactStatus?: string;
}

const UserReactTabFC = (props: IUserReactTabFCProps) => {
    const router = useRouter();
    const [react, setReact] = useStateReact(mapReactType(props.reactStatus || null));
    const [userReactPostAction] = useMutation(USER_REACT_POST_MUTATION);

    const { accountId, authToken } = getAuthInfo();

    const handleRouteToPostComment = useCallback(
        async () => {
            await router.push(FormatString(ACCOUNT_POST_COMMENT_PAGE_ROUTE, `${props.accountId}`, `${props.postId}`))
        }, [],
    );

    const handleReactUserPostEvent = useCallback(
        async (reactType: ReactType) => {
            await userReactPostAction({
                variables: {
                    account_id: accountId,
                    auth_token: authToken,
                    post_id: props.postId,
                    type: ReactType[reactType]
                }
            });

            // set state visible
            setReact(reactType)
        }, [react]
    )


    return (
        <>
            <Box w="50%" className="ReactArea">
                <Container boxSize="100%" display="flex">
                    {react !== ReactType.NONE ? (
                        react === ReactType.LOVE ? (
                            <Box onClick={() => setReact(ReactType.NONE)} display="flex">
                                <Box boxSize="25px" margin="5px">
                                    <Image src={heartIcon} boxSize="100%" />
                                </Box>
                                <Text lineHeight="35px" fontWeight="bold" color="#ff0000">Love</Text>
                            </Box>
                        ) : (
                                <Box onClick={() => setReact(ReactType.NONE)} display="flex">
                                    <Box boxSize="25px" margin="5px">
                                        <Image src={laughingIcon} boxSize="100%" />
                                    </Box>
                                    <Text lineHeight="35px" fontWeight="bold" color="#c1bb04">Haha</Text>
                                </Box>
                            )
                    ) : (
                            <>
                                <Box boxSize="25px" margin="5px" onClick={() => handleReactUserPostEvent(ReactType.LOVE)}>
                                    <Image src={heartEmptyIcon} boxSize="100%" />
                                </Box>
                                <Box boxSize="25px" margin="5px" onClick={() => handleReactUserPostEvent(ReactType.HAHA)}>
                                    <Image src={laughingEmptyIcon} boxSize="100%" />
                                </Box>
                                <Text lineHeight="35px">React</Text>
                            </>
                        )}
                </Container>
            </Box>
            <Box w="50%" className="CommentArea"
                onClick={() => handleRouteToPostComment()}>
                <Container boxSize="100%" display="flex" justifyContent="end">
                    <Box boxSize="25px" margin="5px">
                        <Image src={commentIcon} boxSize="100%" />
                    </Box>
                    <Text lineHeight="35px">Comments</Text>
                </Container>
            </Box>
        </>
    )
}


export const UserPost = (props: IUserPostProp) => {
    const router = useRouter();

    const handleRouteToParnerProfile = useCallback(
        async () => {
            await router.push(FormatString(PROFILE_PAGE_ROUTE, `${props.accountId}`))
        },
        [],
    )
    const handleRouteToPostReaction = useCallback(
        async () => {
            await router.push(FormatString(ACCOUNT_POST_REACTION_PAGE_ROUTE, `${props.accountId}`, `${props.id}`));
        }, [],
    )

    const { authToken } = getAuthInfo();

    const { loading, error, data } = useQuery(GET_ACCOUNT_INFO_QUERY, {
        variables: {
            auth_token: authToken,
            account_id: props.accountId
        }
    });

    if (error) {
        return <div>Error when loading account</div>
    }
    if (loading) {
        return null;
    }


    const accountInfo: IAccountInfo = data.accountProfile

    const accountName: string = `${accountInfo.firstName} ${accountInfo.lastName}`
    const accountAvatar: string = accountInfo.avatarUrl;




    return (
        <div style={{ backgroundColor: "white", padding: "10px", margin: "1px" }}>
            <div className="header_post" style={{ height: "60px", position: "relative" }}>
                <div style={boundContainer} onClick={() => { handleRouteToParnerProfile() }}>
                    <div style={{ width: "54px", height: "54px", borderRadius: "50%", overflow: "hidden" }}>
                        <img style={{ height: "100%", width: "100%" }} alt="X" src={accountAvatar || avatarIcon} />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <p style={{ margin: "4px 0px", fontWeight: "bold" }}>{accountName}</p>
                        <p style={{ margin: "0px", fontSize: "12px", color: "#9597A1" }}>4 mins ago</p>
                    </div>
                </div>
            </div>
            <div className="main_post" style={{ margin: "0px 10px" }}>
                <p>{props.cnt ? props.cnt : "We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues."}</p>
                <Gallery photos={
                    (props.medias?.map(
                        (media, _idx) => {
                            return {
                                src: media.url ? media.url : "",
                                width: _idx + 1,
                                height: _idx + 1,
                            }
                        }) as any)
                } />

            </div>
            <div className="footer_post" style={{ height: "40px", position: "relative" }}>
                <div style={boundContainer} onClick={() => handleRouteToPostReaction()}>
                    <div style={{ display: "flex", marginRight: "5px" }}>
                        <div style={iconTicketStyle}>
                            <img style={{ height: "100%", width: "100%" }} alt="X" src={avatarReactionIcon} />
                        </div>
                        <div style={iconTicketStyle}>
                            <img style={{ height: "100%", width: "100%" }} alt="X" src={avatarReactionIcon} />
                        </div>
                        <div style={iconTicketStyle}>
                            <img style={{ height: "100%", width: "100%" }} alt="X" src={avatarReactionIcon} />
                        </div>
                    </div>

                    <p style={{ margin: "0px", lineHeight: "30px", color: "#9597A1" }}>{`${props.num_reacts} likes`} </p>
                </div>

                <div style={{ right: "0%", position: "absolute", top: "50%", transform: "translate(0%, -50%)", display: "flex" }}>
                    <p style={{ margin: "0px", marginRight: "5px", color: "#9597A1" }}>{`${props.num_comments} comments`}</p>
                </div>

            </div>
            <Box
                className="action"
                w="100%"
                display="flex">
                <UserReactTabFC postId={props.id || "1"} accountId={props.accountId || "1"} reactStatus={props.react_status} />
            </Box>
        </div>
    )
}
