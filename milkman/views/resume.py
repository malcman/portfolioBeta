"""
milkman projects view.

URLs include:
/
"""
import flask
import milkman


@milkman.app.route('/resume', methods=['GET'])
def view_resume():
    """View function to display webpage resume."""
    context = {}
    context['page_title'] = 'Resume'
    return flask.render_template('resume.html', **context)
