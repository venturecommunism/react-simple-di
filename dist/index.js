'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.injectDeps = injectDeps;
exports.useDeps = useDeps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDisplayName = function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
};

function injectDeps(context, _actions) {
  var actions = {};
  for (var key in _actions) {
    if (_actions.hasOwnProperty(key)) {
      var actionMap = _actions[key];
      var newActionMap = {};
      for (var actionName in actionMap) {
        if (actionMap.hasOwnProperty(actionName)) {
          newActionMap[actionName] = actionMap[actionName].bind(null, context);
        }
      }
      actions[key] = newActionMap;
    }
  }

  return function (Component) {
    var ComponentWithDeps = function (_React$Component) {
      (0, _inherits3.default)(ComponentWithDeps, _React$Component);

      function ComponentWithDeps() {
        (0, _classCallCheck3.default)(this, ComponentWithDeps);
        return (0, _possibleConstructorReturn3.default)(this, (ComponentWithDeps.__proto__ || (0, _getPrototypeOf2.default)(ComponentWithDeps)).apply(this, arguments));
      }

      (0, _createClass3.default)(ComponentWithDeps, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(Component, this.props);
        }
      }]);
      return ComponentWithDeps;
    }(_react2.default.Component);

    ComponentWithDeps.childContextTypes = {
      context: _propTypes2.default.object,
      actions: _propTypes2.default.object
    };

    ComponentWithDeps.getChildContext = function () {
      return {
        context: context,
        actions: actions
      };
    };

    ;

    ComponentWithDeps.displayName = 'WithDeps(' + getDisplayName(Component) + ')';
    return (0, _hoistNonReactStatics2.default)(ComponentWithDeps, Component);
  };
}

var defaultMapper = function defaultMapper(_context, _actions2) {
  return {
    context: function context() {
      return _context;
    },
    actions: function actions() {
      return _actions2;
    }
  };
};

function useDeps() {
  var mapper = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMapper;

  return function (Component) {
    var ComponentUseDeps = function (_React$Component2) {
      (0, _inherits3.default)(ComponentUseDeps, _React$Component2);

      function ComponentUseDeps() {
        (0, _classCallCheck3.default)(this, ComponentUseDeps);
        return (0, _possibleConstructorReturn3.default)(this, (ComponentUseDeps.__proto__ || (0, _getPrototypeOf2.default)(ComponentUseDeps)).apply(this, arguments));
      }

      (0, _createClass3.default)(ComponentUseDeps, [{
        key: 'render',
        value: function render() {
          var _context2 = this.context,
              context = _context2.context,
              actions = _context2.actions;

          var mappedProps = mapper(context, actions);

          var newProps = (0, _extends3.default)({}, this.props, mappedProps);

          return _react2.default.createElement(Component, newProps);
        }
      }]);
      return ComponentUseDeps;
    }(_react2.default.Component);

    ComponentUseDeps.contextTypes = {
      context: _propTypes2.default.object,
      actions: _propTypes2.default.object
    };
    ;

    ComponentUseDeps.displayName = 'UseDeps(' + getDisplayName(Component) + ')';
    return (0, _hoistNonReactStatics2.default)(ComponentUseDeps, Component);
  };
}