import React from 'react';
import avatar from "./images/default_female.jpg";
import avatar2 from "./images/default_male.jpg";

const avatarMap: Record<string, string> = {
    avatar: avatar,
    avatar2: avatar2,
};

interface User {
    uid: string;
    avatar: string;
    uname: string;
}

interface Comment {
    rpid: number;
    user: User;
    content: string;
    ctime: string;
    like: number;
}

interface ItemProps {
    user: User,
    item: Comment,
    onDel: (rpid: number) => void,
    key?: number
}

const Item: React.FC<ItemProps> = ({user, item, onDel, key}) => {
    return (
        <div className="reply-item" key={item.rpid}>
            <div className="root-reply-avatar">
                <div className="bili-avatar">
                    <img
                        className="bili-avatar-img"
                        src={avatarMap[item.user.avatar]}
                        alt={`${item.user.uname} avatar`}
                    />

                </div>
            </div>
            <div className="content-wrap">
                <div className="user-info">
                    <div className="user-name">{item.user.uname}</div>
                </div>
                <div className="root-reply">
                    <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                        <span className="reply-time">{item.ctime}</span>
                        <span className="reply-time">Like: {item.like}</span>
                        {item.user.uid === user.uid && (
                            <span className="delete-btn" onClick={() => onDel(item.rpid)}>
                                Delete
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
