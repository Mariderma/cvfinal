// React code converted from JSX to plain JavaScript (no Babel needed)
// Requires React and ReactDOM loaded in the page (via CDN or bundler)

/* Password component */
class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const show = this.state.show;
    return React.createElement(
      'div',
      { className: 'password' },
      show
        ? React.createElement('input', { placeholder: 'Password', type: 'text' })
        : React.createElement('input', { placeholder: 'Password', type: 'password' }),
      React.createElement(
        'div',
        { className: 'password-icon', onClick: this.handleClick },
        show
          ? React.createElement('span', { className: 'fa fa-fw fa-eye-slash' })
          : React.createElement('span', { className: 'fa fa-fw fa-eye' })
      )
    );
  }
}

/* Registration functional component */
function Registration(props) {
  var onClick = props.onClick;
  return React.createElement(
    'div',
    { className: 'card registration' },
    React.createElement(
      'div',
      { className: 'card__side left' },
      React.createElement('h1', { className: 'logo-text' }, 'web', React.createElement('br', null), 'addict')
    ),
    React.createElement(
      'div',
      { className: 'card__side right' },
      React.createElement('h2', { className: 'glitch', 'data-text': 'Welcome' }, 'Welcome'),
      React.createElement('img', { src: 'https://github.com/OlgaKoplik/CodePen/blob/master/logo.png?raw=true', alt: 'logo' }),
      React.createElement(
        'form',
        null,
        React.createElement('input', { placeholder: 'Name' }),
        React.createElement('input', { placeholder: 'Email' }),
        React.createElement(Password, null),
        React.createElement('button', { type: 'button' }, 'Registration')
      ),
      React.createElement('p', null, 'Already a member ', React.createElement('a', { onClick: onClick, href: '#' }, 'Sign in'))
    )
  );
}

/* SignIn functional component */
function SignIn(props) {
  var onClick = props.onClick;
  return React.createElement(
    'div',
    { className: 'card signin' },
    React.createElement(
      'div',
      { className: 'card__side left' },
      React.createElement('h1', { className: 'logo-text' }, 'web', React.createElement('br', null), 'addict')
    ),
    React.createElement(
      'div',
      { className: 'card__side right' },
      React.createElement('h2', { className: 'glitch black', 'data-text': 'Welcome' }, 'Welcome'),
      React.createElement('img', { src: 'https://github.com/OlgaKoplik/CodePen/blob/master/logo-white.png?raw=true', alt: 'logo-white' }),
      React.createElement(
        'form',
        null,
        React.createElement('input', { placeholder: 'Email' }),
        React.createElement(Password, null),
        React.createElement('button', { type: 'button' }, 'Sign In')
      ),
      React.createElement('p', null, 'No account yet? ', React.createElement('a', { onClick: onClick, href: '#' }, ' Registration'))
    )
  );
}

/* Form wrapper component */
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: 'registration' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var newActive = this.state.active === 'registration' ? 'signIn' : 'registration';
    this.setState({ active: newActive });
  }

  render() {
    var active = this.state.active;
    return React.createElement(
      'div',
      { className: 'wrap' },
      active === 'registration'
        ? React.createElement(Registration, { onClick: this.handleClick })
        : React.createElement(SignIn, { onClick: this.handleClick })
    );
  }
}

/* Render into #root if present */
document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('root');
  if (root && window.React && window.ReactDOM) {
    ReactDOM.render(React.createElement(Form, null), root);
  } else if (!root) {
    // No root node found; do nothing. The template must include <div id="root"></div>
    // You can also call ReactDOM.render yourself where you want.
    console.warn('React form: no #root element found. Add <div id="root"></div> to your template.');
  }
});
