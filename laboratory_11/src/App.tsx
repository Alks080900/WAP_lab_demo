import React, { useState, useEffect } from 'react';
import './App.scss';
import avatar from './images/default_female.jpg';
import avatar2 from './images/default_male.jpg';
import _ from 'lodash';
import { format } from 'date-fns';
import Item from './Item';

const user: User = {
  uid: '36080105',
  avatar: avatar,
  uname: 'Song Xu',
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

const tabs = [
  { type: 'hot', text: 'Top' },
  { type: 'newest', text: 'Newest' },
];

const App = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState('hot');
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState<User>(user);

  useEffect(() => {
    async function getList() {
      try {
        const res = await fetch('http://localhost:3004/list');
        const data = await res.json();
        setComments(_.orderBy(data, ['like'], ['desc']));
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    }
    getList();
  }, []);

  const handleTabClick = (type: string) => {
    setActiveTab(type);
  };

  const sortedComments = () => {
    if (activeTab === 'hot') {
      return _.orderBy(comments, ['like'], ['desc']);
    } else if (activeTab === 'newest') {
      return _.orderBy(comments, [(comment) => new Date(comment.ctime)], ['desc']);
    }
    return comments;
  };

  const handleDelete = (rpid: number) => {
    const updatedComments = comments.filter((comment) => comment.rpid !== rpid);
    setComments(updatedComments);
  };

  const handlePostComment = async () => {
    if (newComment.trim() === '') return;
    let currentUser: User | null = null;
    try {
      const res = await fetch('http://localhost:3004/users');
      const users = await res.json();
      currentUser = users.find((u: User) => u.uid === user.uid);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
    const newRpid = comments.length ? comments[0].rpid + 1 : 1;
    const currentTime = format(new Date(), 'MM-dd-yyyy HH:mm');

    const newCommentObj: Comment = {
      rpid: newRpid,
      user: currentUser || { ...user },
      content: newComment,
      ctime: currentTime,
      like: 0,
    };
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };


  return (
      <div className="app">
        <div className="reply-navigation">
          <ul className="nav-bar">
            <li className="nav-title">
              <span className="nav-title-text">Comments</span>
              <span className="total-reply">{comments.length}</span>
            </li>
            <li className="nav-sort">
            <span
                className={`nav-item ${activeTab === 'hot' ? 'active' : ''}`}
                onClick={() => handleTabClick('hot')}
            >
              Top
            </span>
              <span
                  className={`nav-item ${activeTab === 'newest' ? 'active' : ''}`}
                  onClick={() => handleTabClick('newest')}
              >
              Newest
            </span>
            </li>
          </ul>
        </div>

        <div className="reply-wrap">
          <div className="box-normal">
            <div className="reply-box-avatar">
              <div className="bili-avatar">
                <img className="bili-avatar-img" src={currentUser.avatar} alt="Profile" />
              </div>
            </div>
            <div className="reply-box-wrap">
            <textarea
                className="reply-box-textarea"
                placeholder="tell something..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
              <div className="reply-box-send" onClick={handlePostComment}>
                <div className="send-text">Post</div>
              </div>
            </div>
          </div>

          <div className="reply-list">
            {sortedComments().map(item => (
                <Item key={item.rpid} user={user} item={item} onDel={handleDelete} />
            ))}
          </div>
        </div>
      </div>
  );
};

export default App;
