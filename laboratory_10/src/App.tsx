import React, { useState } from 'react';
import './App.scss';
import avatar from './images/default_female.jpg';
import avatar2 from './images/default_male.jpg';
import _ from 'lodash';
import { format } from 'date-fns';

const defaultList = [
  {
    rpid: 3,
    user: {
      uid: '13258165',
      avatar: avatar2,
      uname: 'Jay Zhou',
    },
    content: 'Nice, well done',
    ctime: '10-18-2023 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: avatar,
      uname: 'Song Xu',
    },
    content: 'I search for you thousands of times, from dawn till dusk.',
    ctime: '11-13-2023 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar: avatar2,
      uname: 'John Doe',
    },
    content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
    ctime: '10-19-2023 09:00',
    like: 66,
  },
];

const user = {
  uid: '30009257',
  avatar: avatar2,
  uname: 'John Doe',
};

const tabs = [
  { type: 'hot', text: 'Top' },
  { type: 'newest', text: 'Newest' },
];

const App = () => {
  const [comments, setComments] = useState(defaultList);
  const [activeTab, setActiveTab] = useState('hot');
  const [newComment, setNewComment] = useState('');

  const handleTabClick = (type: string) => {
    setActiveTab(type);
  };

  const sortedComments = () => {
    if (activeTab === 'hot') {
      return _.orderBy(comments, ['like'], ['desc']);
    } else if (activeTab === 'newest') {
      return _.orderBy(
          comments,
          [(comment) => new Date(comment.ctime)],
          ['desc']
      );
    }
    return comments;
  };


  const handleDelete = (rpid: number) => {
    const updatedComments = comments.filter((comment) => comment.rpid !== rpid);
    setComments(updatedComments);
  };

  const handlePostComment = () => {
    if (newComment.trim() === '') return;

    const newRpid = comments.length ? comments[0].rpid + 1 : 1;
    const currentTime = format(new Date(), 'MM-dd-yyyy HH:mm');

    const newCommentObj = {
      rpid: newRpid,
      user: { ...user },
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
                <img className="bili-avatar-img" src={user.avatar} alt="Profile" />
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
            {sortedComments().map((comment) => (
                <div className="reply-item" key={comment.rpid}>
                  <div className="root-reply-avatar">
                    <div className="bili-avatar">
                      <img
                          className="bili-avatar-img"
                          src={comment.user.avatar}
                          alt={`${comment.user.uname} avatar`}
                      />
                    </div>
                  </div>

                  <div className="content-wrap">
                    <div className="user-info">
                      <div className="user-name">{comment.user.uname}</div>
                    </div>
                    <div className="root-reply">
                      <span className="reply-content">{comment.content}</span>
                      <div className="reply-info">
                        <span className="reply-time">{comment.ctime}</span>
                        <span className="reply-time">Like: {comment.like}</span>
                        <span className="delete-btn" onClick={ () => handleDelete(comment.rpid)}>Delete</span>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default App;
