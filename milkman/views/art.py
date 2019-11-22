"""
milkman art view.

URLs include:
/
"""
import flask
import milkman


@milkman.app.route('/art', methods=['GET'])
def all_art():
    """View function to display contact page."""
    context = {}
    context['page_title'] = 'Art'
    return flask.render_template('art.html', **context)
