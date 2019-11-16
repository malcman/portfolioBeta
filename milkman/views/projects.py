"""
milkman projects view.

URLs include:
/
"""
import flask
import milkman


@milkman.app.route('/projects', methods=['GET'])
def all_projects():
    """View function to display all projects."""
    context = {}
    context['page_title'] = 'Projects'
    return flask.render_template('projects.html', **context)
