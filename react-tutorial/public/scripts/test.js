/*Inherited properties are passed via this.props
and nested views via this.props.children used in CommentList.
*/

// We use props.children so we can build different types of Lists.
// In the example is not shown, but we can pass sth else than comment.text
// and thus create another type of List.
// props.children points where in the children, the passed prop should be put or used
var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		);
	},
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author} key={comment.id} >
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.refs.author.value.trim();
		var text = this.refs.text.value.trim();
		if (!text || !author) {
		  return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.refs.author.value = '';
		this.refs.text.value = '';
	},
	render: function() {
		return (
		<form className="commentForm" onSubmit={this.handleSubmit}>
			<input type="text" placeholder="Your name" ref="author" />
			<input type="text" placeholder="Say something..." ref="text" />
			<input type="submit" value="Post" />
		</form>
		);
	},
});

var CommentBox = React.createClass({
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});
	},
	getInitialState: function() {
		return {data: [
						{id: 1, author: 'Pete Hunt', text: 'This is one comment'},
						{id: 2, author: 'Jordan Walke', text: 'This is another comment'},
					]};
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
		);
	},
});

ReactDOM.render(
	<CommentBox/>,
	document.getElementById('content')
);