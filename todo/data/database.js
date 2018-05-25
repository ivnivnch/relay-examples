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

let nextViewerId = 0;

export class Viewer {
  constructor() {
    this.id = `${nextViewerId++}`;
  }
}

const viewer = new Viewer();

export const getViewer = () => viewer;

let nextTodoId = 0;

export class Todo {
  constructor(text) {
    this.id = `${nextTodoId++}`;
    this.text = text;
  }
}

const TODOS = Array.from(new Array(30), (i, k) => new Todo(`Todo #${k + 1}`));

export const getTodo = id => TODOS.find(todo => todo.id === id);

export const getTodos = ({orderBy}) => {
  const todos = Array.from(TODOS);

  switch (orderBy) {
    case 'asc': todos.sort((a, b) => parseInt(a.id) - parseInt(b.id)); break;
    case 'desc': todos.sort((a, b) => parseInt(b.id) - parseInt(a.id)); break;
  }

  return todos;
};
