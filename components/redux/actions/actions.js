import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_LIKES_STATE_CHANGE,
  CLEAR_DATA,
} from '../constants/constants';
import {store} from '../../../App';

export const clearData = () => async (dispatch) => {
  dispatch({type: CLEAR_DATA});
};
export const fetchUser = () => async (dispatch) => {
  await firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
      } else {
        console.log('does not exist');
      }
    });
};

export const fetchUserPosts = (uid) => (dispatch) => {
  firestore()
    .collection('posts')
    .doc(uid)
    .collection('userPosts')
    .orderBy('created', 'asc')
    .get()
    .then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data};
      });
      dispatch({type: USER_POSTS_STATE_CHANGE, posts: posts});
    });
};

export const fetchUserFollowing = () => async (dispatch) => {
  await firestore()
    .collection('following')
    .doc(auth().currentUser.uid)
    .collection('userFollowing')
    .onSnapshot((snapshot) => {
      let following = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      dispatch({type: USER_FOLLOWING_STATE_CHANGE, following});
      for (let i = 0; i < following.length; i++) {
        dispatch(fetchUsersData(following[i], true));
      }
    });
};

export const fetchUsersData = (uid, getPosts) => async (dispatch) => {
  const {usersState} = store.getState();
  const found = usersState.users.some((el) => el.uid === uid);
  if (!found) {
    await firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.data();
          user.uid = snapshot.id;
          dispatch({type: USERS_DATA_STATE_CHANGE, user});
        } else {
          console.log('does not exist');
        }
      });
    if (getPosts) {
      dispatch(fetchUsersFollowingPosts(uid));
    }
  }
};

export const fetchUsersFollowingPosts = (uid) => async (dispatch) => {
  const {usersState} = store.getState();
  await firestore()
    .collection('posts')
    .doc(uid)
    .collection('userPosts')
    .orderBy('created', 'asc')
    .get()
    .then((snapshot) => {
      const searchedId = snapshot._query._collectionPath._parts[1];
      const user = usersState.users.find((el) => el.uid === searchedId);
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data, user};
      });

      for (let i = 0; i < posts.length; i++) {
        dispatch(fetchUsersFollowingLikes(uid, posts[i].id));
      }

      dispatch({type: USERS_POSTS_STATE_CHANGE, posts, uid});
    });
};

export const fetchUsersFollowingLikes = (uid, postId) => async (dispatch) => {
  firestore()
    .collection('posts')
    .doc(uid)
    .collection('userPosts')
    .doc(postId)
    .collection('likes')
    .doc(auth().currentUser.uid)
    .onSnapshot((snapshot) => {
      console.log(snapshot._ref._documentPath._parts[3], 'snapshot');
      const postID = snapshot._ref._documentPath._parts[3];
      let currentUserLike = false;
      if (snapshot.exists) {
        currentUserLike = true;
      }

      dispatch({type: USERS_LIKES_STATE_CHANGE, postID, currentUserLike});
    });
};
