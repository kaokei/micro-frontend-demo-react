/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useHistory } from '../hooks/useHistory';

function Link(props) {
  const history = useHistory();

  const goTo = () => {
    history.push(props.to);
  };

  return <a onClick={goTo}>{props.children}</a>;
}

export default Link;
