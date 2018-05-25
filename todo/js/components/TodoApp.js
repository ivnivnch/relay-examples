/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import TodoList from './TodoList';

import React from 'react';
import {
  createRefetchContainer,
  graphql,
} from 'react-relay';

class TodoApp extends React.Component {
  render() {
    const {viewer: {todos: {edges, pageInfo}}} = this.props;

    console.dir(edges);

    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>
              todos
            </h1>
          </header>
          <TodoList
            todos={edges}/>
        </section>
        <footer>
          {pageInfo.hasNextPage &&
            <button
              className="clear-completed"
              title="Load More"
              onClick={this.onLoadMore}>
              Load More
            </button>
          }
        </footer>
      </div>
    );
  }

  onLoadMore = () => this.props.relay.refetch(fragmentVariables => {
    const {viewer: {todos: {pageInfo}}} = this.props;

    return {
      first: fragmentVariables.first,
      after: pageInfo.endCursor,
      //orderBy: fragmentVariables.orderBy === 'desc' ? 'asc' : 'desc'
    };
  });
}

export default createRefetchContainer(
  TodoApp,
  graphql`
    fragment TodoApp_viewer on Viewer
    @argumentDefinitions(first: {type: "Int"}, after: {type: "String"}, orderBy: {type: "OrderBy"}) {
      id
      todos(first: $first, after: $after, orderBy: $orderBy) @connection(key: "TodoApp_todos", filters: []) {
        edges {
          cursor
          ...TodoList_todos
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
  graphql`
    query TodoAppRefetchQuery($first: Int, $after: String, $orderBy: OrderBy) {
      viewer {
        ...TodoApp_viewer @arguments(first: $first, after: $after, orderBy: $orderBy)
      }
    }
  `
);
