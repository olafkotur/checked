import React from 'react';
import { MemberService } from '../../api/MemberService';
import { RouteComponentProps } from '@reach/router';
import {IMember} from '../../types';
import CommentBox from '../../components/MemberManager/comments/commentBox';

interface IState {
    members: Array<IMember>;
    loaded: boolean;
}

interface IProps extends RouteComponentProps {
    userID: number;
}

export class DevPage extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {members: [], loaded: false};
    }

    componentDidMount(): void {
        MemberService.getAllMembersByUser(this.props.userID).then((res) => {
            this.setState({members: res.result, loaded: true });
        });
    }


    render(): JSX.Element {
        return (
           <CommentBox/>
        );
    }
}

export default DevPage;