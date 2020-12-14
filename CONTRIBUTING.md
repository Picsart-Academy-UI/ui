# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

# Committing and Pushing changes

Git hooks are configured on this project when you install dependencies. The following will be run on every commit:

Format files automatically (using prettier)
The recommended configuration will be generated (this is important for when a new rule is added)

# Rule naming conventions
Based on ESLint's Rule Naming Conventions, you must follow these rules:

Use dashes between words
Try to keep the name simple and clear

# Adding new rules
In the same way as ESLint, each rule has three files named with its identifier:
in the src/rules directory: a source file
in the tests/rules directory: a test file
in the docs/rules directory: a Markdown documentation file

Additionally, you need to do a couple of extra things:

The rule will automatically be added to the ESLINT configuration files


# Help needed
Please check the the open issues
