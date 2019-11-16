"""milkman portfolio python package configuration."""

from setuptools import setup

setup(
    name='milkman',
    version='0.1.0',
    packages=['milkman'],
    include_package_data=True,
    install_requires=[
        'flask',
        'html5validator',
        'pycodestyle',
        'pydocstyle',
        'pylint',
        'nodeenv',
        'sh',
        'Flask-Testing',
        'selenium',
        'requests',
        'arrow'
    ],
)
