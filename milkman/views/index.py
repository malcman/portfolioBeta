"""
milkman index view.

URLs include:
/
"""
import flask
import milkman


@milkman.app.route('/', methods=['GET'])
def index():
    """Index view for milkman portfolio."""
    context = {}
    context['page_title'] = 'Home'
    context['body_id'] = 'homeBody'
    return flask.render_template('index.html', **context)
