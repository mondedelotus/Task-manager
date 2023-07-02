import PropTypes from 'prop-types';
import style from '../styles/modules/title.module.scss'

function PageTitle( {children} ) {
    return <p className={style.title}>{children}</p>;
}

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTitle;
