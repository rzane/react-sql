import React, { Component } from "react";
import { withActions, Query } from "../../src";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const INSERT_USER = `
INSERT INTO example.users (id, name)
VALUES (:id, :name)
`;

const INSERT_POST = `
INSERT INTO example.posts (id, title, body, userId)
VALUES (:id, :title, :body, :userId)
`;

const COUNT_POSTS = "SELECT VALUE COUNT(*) FROM example.posts";

const SELECT_POSTS = `
SELECT posts.id, posts.title, posts.body, users.id as userId, users.name as userName
FROM example.posts
JOIN example.users ON users.id = posts.userId
`;

const actions = {
  async loadPosts(store) {
    window.store = store;
    const [_d1, _d2, users, posts] = await Promise.all([
      store.execute("DELETE FROM example.posts"),
      store.execute("DELETE FROM example.users"),
      await fetch(USERS_URL).then(r => r.json()),
      await fetch(POSTS_URL).then(r => r.json())
    ]);

    const userInserts = users.map(user => store.mutate(INSERT_USER, user));
    const postInserts = posts.map(post => store.mutate(INSERT_POST, post));
    return Promise.all(userInserts.concat(postInserts));
  }
};

class Blog extends Component {
  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    return (
      <div className="Blog">
        <Query sql={COUNT_POSTS}>{count => <h2>{count.data} posts</h2>}</Query>

        <Query sql={SELECT_POSTS}>
          {posts => (
            <ul>
              {posts.data.map(post => (
                <li key={post.id}>
                  <h4>{post.title}</h4>
                  <div>{post.body}</div>
                  <small>&mdash; {post.userName}</small>
                </li>
              ))}
            </ul>
          )}
        </Query>
      </div>
    );
  }
}

export default withActions(actions)(Blog);
