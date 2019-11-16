"""
milkman contact view.

URLs include:
/
"""
import flask
import milkman


@milkman.app.route('/contact', methods=['GET'])
def contact_me():
    """View function to display contact page."""
    context = {}
    context['page_title'] = 'Contact'
    return flask.render_template('contact.html', **context)
